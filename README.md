<img src="./frontend/src/LandingPage/Images/Logos/logo.png" />

## Description
A simple yet powerful web application designed to help users discover, compare, keep track of and share free courses online.

## Table of contents
- [Components](#components)
- [Landing page](#landing-page)
- [Installation and setup](#installation-and-setup)
- [Tools](#tools)
- [Contributors](#contributors)

## Components
1. [Frontend](/app_front-end/) - React web application
2. [Backend](/backend/) - Web scrapper and restful api

## Landing page
Landing page

<img src="./frontend/src/image.png" />

## Installation and setup

To run the application locally, follow these steps:

Clone the repository to your local machine.
```
git clone https://github.com/ngugimuchangi/CourseFinder.git
```

#### Backend 
Run setup script
```
cd CourseFinder/backend/
./set-up.sh
```

Start scraper
```
npm run start-scraper
```

Start workers
```
npm run start-workers
```

Start server
```
npm run start-server
```

***For more details in regards to backend installation visit [backend](./backend/) directory***

#### Frontend
Install the necessary dependencies using the command.
```
cd frontend
npm install
```

Start the application.
```
npm start
```
***For more details in regards to getting started with the frontend application visit [frontend](./frontend/) directory***


## Tools

Main tools used for development:

* __MongoDB:__ A NoSQL database used to store course information and metadata.
* __ExpressJS:__ A web application framework for Node.js, used to build the server-side components of the application.
* __ReactJS:__ A JavaScript library used to build the client-side components of the application.
* __NodeJS:__ A JavaScript runtime used to build the server-side components of the application.
* __Redis:__: An in-memory data structure store used as a caching layer for frequently accessed data.
* __Bull:__ : A job queue package for handling distributed jobs and messages.
* __Puppeteer__: A package.
* __Natural__: A Natural Language Processing library.

**Note:** You will need to have __MongoDB__, __Nodejs__, and __Redis__ installed and running on your machine in order to use the application.

## Contributors
Course Finder was developed by:     
[Duncan Ngugi](https://github.com/ngugimuchangi)    
[Marving Buge](https://github.com/bugemarvin)   
[Samuel Ekati](https://github.com/Samuthe)  


