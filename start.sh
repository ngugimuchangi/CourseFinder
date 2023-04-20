#!/usr/bin/env bash
# Start scrapper, job queue processors, and api sever
npm run start-scraper &
npm run start-workers &
npm run start-server
