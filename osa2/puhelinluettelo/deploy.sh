#!/bin/sh
npm run build
rm -rf ../../../fs19-puhelinluettelo/build
cp -r build ../../../fs19-puhelinluettelo/