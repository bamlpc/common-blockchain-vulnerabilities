#!/usr/bin/env bash

# https://gist.github.com/vncsna/64825d5609c146e80de8b1fd623011ca
set -euo pipefail

# Input
GITHUB_COMMIT_NAME=${1?Error: Commit name required}

git config --local user.email "action@github.com"
git config --local user.name "Github Action"
git add -A
git diff-index --quiet HEAD || (git commit -a -m "docs: Added [$GITHUB_COMMIT_NAME]" --allow-empty)
