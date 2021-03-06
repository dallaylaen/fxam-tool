#!/bin/sh

set -ex

SRC=./lib/index.js
DST=docs/js
MODULE=fxam

webpack-cli "$SRC" --mode development -o "$DST"
mv "$DST"/main.js "$DST"/"$MODULE".js

webpack-cli "$SRC" --mode production -o "$DST"
mv "$DST"/main.js "$DST"/"$MODULE".min.js

