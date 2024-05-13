use clap::{arg, command};
use jsonwebtoken::{Algorithm, DecodingKey, Validation};
use serde::{Deserialize, Serialize};
use std::{env, fs};

#[derive(Debug, Clone, Serialize)]
struct Measurement<'a> {
    hostname: &'a str,
    #[serde(rename = "memTotal")]
    mem_total: usize,
    #[serde(rename = "memAvailable")]
    mem_available: usize,
}

#[derive(Debug, Clone, Deserialize)]
struct Machine {
    id: String,
}

#[derive(Debug, Clone, Deserialize)]
struct Claims {
    machine: Machine,
}

#[derive(Debug, Clone, Deserialize)]
struct JWK {
    n: String,
    e: String,
}

fn main() {
    let matches = command!()
        .arg(arg!(<host> "Required host url"))
        .arg(arg!(<token> "Required machine token"))
        .get_matches();

    let host = matches
        .get_one::<String>("host")
        .expect("`host` is required");
    let token_str = matches
        .get_one::<String>("token")
        .expect("`token` is required");

    let client = reqwest::blocking::Client::new();
    let jwk_response = client
        .get(format!("{}.well-known/jwks.json", host))
        .send()
        .unwrap();
    let jwks: Vec<JWK> = jwk_response.json().unwrap();
    let jwk = jwks.first().unwrap();

    println!("{jwk:?}");

    let token_data = jsonwebtoken::decode::<Claims>(
        &token_str,
        &DecodingKey::from_rsa_components(&jwk.n, &jwk.e).unwrap(),
        &Validation::new(Algorithm::PS256),
    )
    .unwrap();

    let machine = token_data.claims.machine;

    let hostname = fs::read_to_string("/proc/sys/kernel/hostname").unwrap();
    let hostname = hostname.trim();

    let meminfo = fs::read_to_string("/proc/meminfo").unwrap();
    let mem_lines: Vec<&str> = meminfo.split("\n").collect();

    let mem_total = mem_lines
        .iter()
        .find(|line| line.starts_with("MemTotal"))
        .unwrap();
    let mem_total: Vec<&str> = mem_total.split_ascii_whitespace().collect();
    let mem_total: usize = mem_total[1].parse().unwrap();

    let mem_available = mem_lines
        .iter()
        .find(|line| line.starts_with("MemAvailable"))
        .unwrap();
    let mem_available: Vec<&str> = mem_available.split_ascii_whitespace().collect();
    let mem_available: usize = mem_available[1].parse().unwrap();

    let measurement = Measurement {
        hostname,
        mem_total,
        mem_available,
    };

    let response = client
        .post(format!(
            "{}api/v1/machines/{}/measurements",
            host, machine.id
        ))
        .bearer_auth(token_str)
        .json(&measurement)
        .send()
        .unwrap();

    println!("{response:?}");
}
