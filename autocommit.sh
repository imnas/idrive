#!/bin/bash
# AutoCommit to GitHub

commitMessage = ''

echo "Commit Message:"
read commitMessage

git add .
git commit -m commitMessage
git push

echo 'You have succesfully pushed to GitHub!'