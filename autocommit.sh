#!/bin/bash
# AutoCommit to GitHub

commitMessage = ''

git add .
read commitMessage
git commit -m '{commitMessage}'
git push

echo 'You have succesfully pushed to GitHub!'