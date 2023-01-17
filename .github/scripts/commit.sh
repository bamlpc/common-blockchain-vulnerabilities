#!/usr/bin/env bash
{ IFS= read -rd '' value <DENO_OUTPUT.txt;} 2>/dev/null
echo "print value"
echo $value
str=`$value`
echo "print string"
echo $str
name=`echo "${str:11-1}"`
echo "print name"
echo $name



git config --local user.email "action@github.com"
git config --local user.name "Github Action"
git add -A
git diff-index --quiet HEAD || (git commit -a -m "docs: Added $name" --allow-empty)
