use std::fs;

use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
struct Measurement<'a> {
    hostname: &'a str,
    mem_total: usize,
    mem_available: usize,
}

fn main() {
    let hostname = fs::read_to_string("/proc/sys/kernel/hostname").unwrap();
    let hostname = hostname.trim();
    
    let meminfo = fs::read_to_string("/proc/meminfo").unwrap();
    let mem_lines: Vec<&str> = meminfo.split("\n").collect();
    
    let mem_total = mem_lines.iter().find(|line| line.starts_with("MemTotal")).unwrap();
    let mem_total: Vec<&str> = mem_total.split_ascii_whitespace().collect();
    let mem_total: usize = mem_total[1].parse().unwrap();
    
    let mem_available = mem_lines.iter().find(|line| line.starts_with("MemAvailable")).unwrap();
    let mem_available: Vec<&str> = mem_available.split_ascii_whitespace().collect();
    let mem_available: usize = mem_available[1].parse().unwrap();
    
    let measurement = Measurement {
        hostname,
        mem_total,
        mem_available
    };

    println!("{measurement:?}");
}
