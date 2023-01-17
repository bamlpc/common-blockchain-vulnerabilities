#!/usr/bin/env bash
echo "----------"
echo "grep cbv code name"
echo `grep -oP "(?<=\>)\w{3}-{1}\d{2}-{1}\d{5}(?=<)" DENO_OUTPUT.txt` > name.txt
echo "----------"
echo "create name variable with cat"
name=`cat name.txt`
echo "----------"
echo "commit name variable"
echo "----------"
echo $name
echo "----------"


git config --local user.email "action@github.com"
git config --local user.name "Github Action"
git add -A
git diff-index --quiet HEAD || (git commit -a -m "docs: Added $name" --allow-empty)
