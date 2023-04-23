#!/usr/bin/env bash
# Setup script for:
# 1. Installing depencies
# 2. Loading categories data
# 3. Training classifier

npm install &&
npm run load-data &&
npm run train-classifier
