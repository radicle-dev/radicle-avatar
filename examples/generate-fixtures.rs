use radicle_avatar::{Avatar, Usage};
use rand::Rng;
use serde::{Deserialize, Serialize};
use std::{char, fs};

#[derive(Serialize, Deserialize)]
struct Input {
    input: String,
    usage: Usage,
}

#[derive(Serialize, Deserialize)]
struct TestCase {
    input: Input,
    output: Avatar,
}

fn main() -> std::io::Result<()> {
    let mut test_cases: Vec<TestCase> = Vec::new();
    let mut rng = rand::thread_rng();

    for _ in 0..1000 {
        let random_string_size = rng.gen_range(0..=40);
        let random_string: String = (0..random_string_size)
            .map(|_| rng.gen_range('\u{0000}'..char::MAX))
            .collect();

        let input_any = Input {
            input: random_string.clone(),
            usage: Usage::Any,
        };
        test_cases.push(TestCase {
            input: input_any,
            output: Avatar::from(&random_string, Usage::Any),
        });

        let input_identity = Input {
            input: random_string.clone(),
            usage: Usage::Identity,
        };
        test_cases.push(TestCase {
            input: input_identity,
            output: Avatar::from(&random_string, Usage::Identity),
        });
    }

    let json = serde_json::to_string_pretty(&test_cases)?;
    fs::write("./fixtures.json", json)?;

    Ok(())
}
