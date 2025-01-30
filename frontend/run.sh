#!/bin/sh
set -e

DIR=$(dirname "$(readlink -f "$0")")
cd $DIR
npm i
npm run start
