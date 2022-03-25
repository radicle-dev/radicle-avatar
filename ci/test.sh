#!/usr/bin/env bash
set -eou pipefail

echo '--- cargo clippy'
cargo clippy --all --all-targets --all-features -- --deny warnings

echo '--- cargo build'
cargo build --tests --verbose --workspace

echo '--- cargo test'
cargo test --workspace

# The typescript tests have to be run _after_ the rust build step, because they
# rely on the `generate-fixtures` binary, which generates a fixtures.json. We
# use `fixtures.json` to make sure that the rust library outputs match the
# typescript implementation.
echo "--- yarn test"
env -u GITHUB_ACTIONS yarn install --immutable
env -u GITHUB_ACTIONS yarn test
