#!/bin/sh
set -e

TOKEN=$1
SOURCE=$2
TARGET=$3
BRANCH=gh-pages
TMP_DIR=tmp-$BRANCH
REPO=the-lost-souls/tls-home.git

echo Source: $SOURCE
echo Target: $TARGET
echo Branch: $BRANCH
echo Repo: $REPO

# All git output below is sent to dev/null to avoid exposing anything sensitive in build logs

echo Checking out $BRANCH
mkdir $TMP_DIR
cd $TMP_DIR

git config --global user.name "CircleCI"  > /dev/null 2>&1
git init  > /dev/null 2>&1
git remote add --fetch origin https://$TOKEN@github.com/$REPO > /dev/null 2>&1

git checkout $BRANCH > /dev/null 2>&1

# Prepare for next/new version
echo Setup target folder...
mkdir -p $TARGET
cd $TARGET  > /dev/null 2>&1
rm -f *.js *.css
rm -f index.html 3rdpartylicenses.txt favico.ico 
rm -rf assets
cd -  > /dev/null 2>&1

# Copy angular app
echo Copying...
cp -a ../$SOURCE/* $TARGET

echo Adding files to git...
git add -A > /dev/null 2>&1

echo Committing...
# need 'ci skip' to ignore this branch in CircleCI
git commit --allow-empty -m "Deploy to branch '$BRANCH' [ci skip]"  > /dev/null 2>&1
git push --force --quiet origin $BRANCH > /dev/null 2>&1

echo Cleaning up...
cd ..
rm -rf $TMP_DIR