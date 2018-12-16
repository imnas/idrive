#!/bin/bash
# AutoCommit to GitHub

git add .
read -p "Commit description: " desc 
git commit -m "$desc"
git push

echo 'You have succesfully pushed to GitHub!'