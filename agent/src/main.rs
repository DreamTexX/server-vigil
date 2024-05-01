use std::{env, fs};
use jwt::{Header, Token};
use serde::{Deserialize, Serialize};

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
    id: String
}

#[derive(Debug, Clone, Deserialize)]
struct Claims {
    machine: Machine,
    #[serde(rename = "baseUrl")]
    base_url: String,
}

fn main() {
    let args: Vec<String> = env::args().collect();
    let token_str = &args[1];

    let token: Token<Header, Claims, _> = Token::parse_unverified(token_str).unwrap();
    let claims = token.claims();
    let machine = &claims.machine;

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

    let client = reqwest::blocking::Client::new();
    let response = client.post(format!("{}api/v1/machines/{}/measurements", claims.base_url, machine.id))
        .bearer_auth(token_str)
        .json(&measurement)
        .send()
        .unwrap();

    println!("{response:?}");
}
