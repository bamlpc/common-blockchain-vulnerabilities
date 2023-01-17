#!/usr/bin/env bash
{ IFS= read -rd '' value <DENO_OUTPUT.txt;} 2>/dev/null
echo "print value"
echo $value
echo grep -oP "(?<=\>)\w{3}-{1}\d{2}-{1}\d{5}(?=<)" $value > name.txt
name=`cat name.txt`
echo "name"
echo $name


git config --local user.email "action@github.com"
git config --local user.name "Github Action"
git add -A
git diff-index --quiet HEAD || (git commit -a -m "docs: Added $name" --allow-empty)
