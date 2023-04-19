#!/usr/bin/env bash
# Load categories and subcategories to database and train classfier
npm run load-data &
npm run train-classifier
