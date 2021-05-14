use radicle_avatar::{Avatar, Usage};
use rand::Rng;
use serde::{Deserialize, Serialize};
use std::fs;

#[derive(Serialize, Deserialize, Debug)]
struct Input {
    input: String,
    usage: Usage,
}

#[derive(Serialize, Deserialize, Debug)]
struct TestCase {
    input: Input,
    output: Avatar,
}

const CHARSET_ETH: &[u8] = b"0123456789abcdefABCDEF";
const CHARSET_URN: &[u8] = b"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

fn random_eth_address() -> String {
    let mut rng = rand::thread_rng();

    let random_eth_address: String = (0..40)
        .map(|_| {
            let index = rng.gen_range(0..CHARSET_ETH.len());
            CHARSET_ETH[index] as char
        })
        .collect();

    String::from(format!("0x{}", random_eth_address))
}

fn random_urn() -> String {
    let mut rng = rand::thread_rng();

    let random_urn: String = (0..37)
        .map(|_| {
            let index = rng.gen_range(0..CHARSET_URN.len());
            CHARSET_URN[index] as char
        })
        .collect();

    String::from(format!("rad:git:{}", random_urn))
}

fn main() -> std::io::Result<()> {
    let mut test_cases: Vec<TestCase> = Vec::new();

    for _ in 1..100 {
        let addr = random_eth_address();
        let input_eth = Input {
            input: addr.clone(),
            usage: Usage::Identity,
        };
        test_cases.push(TestCase {
            input: input_eth,
            output: Avatar::from(&addr, Usage::Identity),
        });
    }

    for _ in 1..100 {
        let urn = random_urn();
        let input_urn = Input {
            input: urn.clone(),
            usage: Usage::Any,
        };
        test_cases.push(TestCase {
            input: input_urn,
            output: Avatar::from(&urn, Usage::Any),
        });
    }

    let json = serde_json::to_string_pretty(&test_cases)?;
    fs::write("./fixtures.json", json)?;

    Ok(())
}
