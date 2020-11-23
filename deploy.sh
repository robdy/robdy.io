#!/bin/bash

set -o errexit -o nounset

rev=$(git rev-parse --short HEAD)
TODAY=$(date +%Y%m%d)
MESSAGE="$TODAY page build"
 

cd public
rm -rf admin

git init
git config user.name "robdy"
git config user.email $EMAIL

if ! git remote | grep upstream > /dev/null; then
git remote add upstream "https://$GITHUB_TOKEN@github.com/robdy/robdy.github.io.git"
fi
git fetch upstream
git reset upstream/master

touch .

git add -A .
git commit -m "$MESSAGE"
git push -q upstream HEAD:master
