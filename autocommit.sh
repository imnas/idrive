#!/bin/bash
read -p "Commit Message: " desc
git add . && \
git add -u && \
git commit -m "$desc" && \
git push origin master
echo "You have successfully pushed your commit to GitHub!"