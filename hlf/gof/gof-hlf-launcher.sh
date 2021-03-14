#!/bin/bash

# Exit on first error
set -e

gofd=$(pwd)
cd ~
$gofd/../hlf-bootstrap.sh 2.2.2
cd $gofd/../chaincode/gof/javascript
rm -rf node_modules package-lock.json
npm i
cd ../../../gof/javascript
rm -rf node_modules package-lock.json
npm i
cd ..
./startFabric.sh javascript
cd javascript
node enrollAdmin
node registerUsersGOF
node initLedger
node queryAllBoxes
