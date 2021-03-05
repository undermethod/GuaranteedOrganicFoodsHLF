#!/bin/bash

# Exit on first error
set -e

cd ../chaincode/gof/javascript
npm i
cd ../../../gof/javascript
npm i
cd ..
./startFabric.sh javascript
cd javascript
node enrollAdmin
node registerUsersGOF
node invokeGOF
node queryGOF
