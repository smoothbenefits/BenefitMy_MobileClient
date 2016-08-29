#!/bin/bash

echo "Start npm install..."
sudo npm install
if [ $? -ne 0 ]; then
    echo "Failed perform npm install"
    exit 1
fi

echo "Switching to the target environment: $1"
./switch_env.sh $1
if [ $? -ne 0 ]; then
    echo "Failed to switch environment to '$1'"
    exit 1
fi

echo "Publishing to Exponent Host.."
deployed=1

# Below uses the Exponent XDE's CLI, see App's wiki page
# for installation instructions

# Login to Exponent
exp login -u wb_mobile -p 1234567890

# Start EXP server
exp start

# Publish!
exp publish

if [ $? -ne 0 ]; then
    echo "Failed to push to Exponent Host"
    deployed=0
fi

echo "Switching back to environment: dev"
./switch_env.sh dev
if [ $? -ne 0 ]; then
    echo "Failed to switch environment to 'dev'"
    exit 1
fi

if [ $deployed -ne 1 ]; then
    echo "FAILURE: Deployment failed!"
    exit 1
fi

echo "SUCCESS: The deployment has been completed!"
