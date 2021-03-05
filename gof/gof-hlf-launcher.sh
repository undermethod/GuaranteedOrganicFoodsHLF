#!/bin/bash

# Exit on first error
set -e

./startFabric.sh javascript
cd javascript
node enrollAdmin
node registerUser
node invoke
node queryGOF
