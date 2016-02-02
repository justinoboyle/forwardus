#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

echo "Fetching dependencies..."
mkdir ../temp
mkdir ../bin
rm -rf nw.zip
rm -rf ../bin/nwjs.app
wget http://dl.nwjs.io/v0.12.3/nwjs-v0.12.3-osx-x64.zip -O nw.zip
unzip nw.zip -d ../temp/
mv ../temp/nwjs-v0.12.3-osx-x64/nwjs.app ../bin/nwjs.app
cp -R ../bin/nwjs.app ../nwjs.app
rm -rf ../temp/nwjs-v0.12.3-osx-x64
rm -rf nw.zip
echo Done fetching dependencies.
