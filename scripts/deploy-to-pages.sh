#!/bin/sh
set -e

TOKEN=$1
FOLDER=$2
BRANCH=gh-pages
TMP_DIR=tmp-$BRANCH
REPO=the-lost-souls/tls-home.git

# All git output below is sent to dev/null to avoid exposing anything sensitive in build logs

echo checkout $BRANCH
mkdir $TMP_DIR
cd $TMP_DIR

git config --global user.name "CircleCI"  > /dev/null 2>&1
git init  > /dev/null 2>&1
git remote add --fetch origin https://$TOKEN@github.com/$REPO > /dev/null 2>&1

git checkout $BRANCH > /dev/null 2>&1

mkdir -p $FOLDER
cd $FOLDER

# Delete old app
rm *.js *.css
rm index.html 3rdpartylicenses.txt favico.ico 
rm -rf assets
cd -

# Copy angular app
echo copy app
cp -a "../dist/." $FOLDER

echo add files
git add -A > /dev/null 2>&1

echo commit and push
# need 'ci skip' to ignore this branch in CircleCI
git commit --allow-empty -m "Deploy to branch '$BRANCH' [ci skip]"  > /dev/null 2>&1
git push --force --quiet origin $BRANCH > /dev/null 2>&1

echo cleanup
cd ..
rm -rf $TMP_DIR