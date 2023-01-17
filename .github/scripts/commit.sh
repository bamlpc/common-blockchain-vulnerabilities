#!/usr/bin/env bash
{ IFS= read -rd '' value <DENO_OUTPUT.txt;} 2>/dev/null
printf '%s' "$value"
str=`$value`
printf '%s' "$str"
name=`echo "${str:11-1}"`


git config --local user.email "action@github.com"
git config --local user.name "Github Action"
git add -A
git diff-index --quiet HEAD || (git commit -a -m "docs: Added $name" --allow-empty)
