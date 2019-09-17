#!/bin/sh
set -e

BUILD_DATE=`date +%d%b%Y`
sed -i.bak 's/Build: local/Build: '"$BUILD_DATE"'/g' src/app/main/main.component.html