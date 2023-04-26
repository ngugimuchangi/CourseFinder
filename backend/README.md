# Course Finder Backend

## Components
1. [Scraper](/backend/scraper/) - simple web scrapper
2. [API](/backend/api/) - restful backend api

## Setup
Clone repo
```
git clone https://github.com/ngugimuchangi/CourseFinder.git

```


## Getting Started
#### Scraper
Run setup script
```
cd scraper
./setup.sh
```

Start scraper
```
npm run start-scraper
```

#### API
Run setup script
```
cd api
./setup.sh
```
Start workers
```
cd api
npm run start-workers
```

Start server
```
npm run start-server
```

## Logs
- Logs directories created on start up.
- Scraper logs available in `scraper/logs` directory.
- API server logs available in `api/logs` directory.

## API Documentation
API documentation available [here](/backend/api/docs/).

## More
Checkout our frontend application [here](/app_front-end/).
