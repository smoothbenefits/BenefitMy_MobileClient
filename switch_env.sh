#!/bin/bash

if [ ! -d "./env_settings/$1" ]; then
  echo "Failed to locate configurations for the specified envrionment name '$1'!"
  exit 1
fi

echo "START: Switching to environment: $1"

echo ".. Backing up current configurations..."
rm -rf ./env_switch_backup
mkdir ./env_switch_backup
mv ./exp.json ./env_switch_backup/exp.json
mv ./app_settings.json ./env_switch_backup/app_settings.json

echo ".. Deploying configurations from target environment: $1"
cp ./env_settings/$1/exp.json ./exp.json
cp ./env_settings/$1/app_settings.json ./app_settings.json

echo ".. Cleaning up the backup configurations"
rm -rf ./env_switch_backup

echo "COMPLETE: Switched to environment: $1"
