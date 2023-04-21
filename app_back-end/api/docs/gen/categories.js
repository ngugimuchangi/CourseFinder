// Categories endpoint
/**
 * @api {get} /categories Get categories
 * @apiName getCategories
 * @apiGroup Categories
 * @apiDescription Gets list of all categories.
 * @apiSuccess {Array} categories List of all categories
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * [
 *   {
 *       "id": "643e3e8aaf53d44333da597a",
 *       "title": "IT & Software",
 *       "url": "/categories/643e3e8aaf53d44333da597a"
 *   },
 *   {
 *       "id": "643e3e8aaf53d44333da5979",
 *       "title": "Business",
 *       "url": "/categories/643e3e8aaf53d44333da5979"
 *   },
 *   {
 *       "id": "643e3e8aaf53d44333da5978",
 *       "title": "Development",
 *       "url": "/categories/643e3e8aaf53d44333da5978"
 *   },
 *   {
 *       "id": "643e3e8aaf53d44333da597d",
 *       "title": "Lifestyle",
 *       "url": "/categories/643e3e8aaf53d44333da597d"
 *   },
 *   {
 *       "id": "643e3e8aaf53d44333da597e",
 *       "title": "Health & Fitness",
 *       "url": "/categories/643e3e8aaf53d44333da597e"
 *   },
 *   {
 *       "id": "643e3e8aaf53d44333da597f",
 *       "title": "Photography & Video",
 *       "url": "/categories/643e3e8aaf53d44333da597f"
 *   },
 *   {
 *       "id": "643e3e8aaf53d44333da5980",
 *       "title": "Music",
 *       "url": "/categories/643e3e8aaf53d44333da5980"
 *   }
 * ]
 */

/**
 * @api {get} /categories/:id Get a specific category
 * @apiName getCategoriesById
 * @apiGroup Categories
 * @apiDescription Gets a specific category that matches given id.
 * @apiUse NotFound
 * @apiParam {String} id Unique ID for the category to fetch
 * @apiSuccess {String} id Category's id
 * @apiSuccess {String} title Category's title
 * @apiSuccess {String} url Category's url
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": "643e3e8aaf53d44333da597a",
 *   "title": "IT & Software",
 *   "uri": "/categories/643e3e8aaf53d44333da597a"
 * }
 */

/**
 * @api {get} /categories/:id/subcategories Get subcategories by category
 * @apiName getSubcategoriesByCategory
 * @apiGroup Categories
 * @apiParam {String} id Unique ID for the category to fetch
 * @apiDescription Gets list of subcategories for a specific category
 * @apiSuccess {Number} count Count of subcategories associated with category
 * @apiSuccess {Array} categories List of all subcategories associated with the category
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "count": 5,
 *   "subcategories": [
 *       {
 *           "id": "643e3e8aaf53d44333da59aa",
 *           "title": "IT Certification",
 *           "url": "/subcategories/643e3e8aaf53d44333da59aa",
 *           "category": "/categories/643e3e8aaf53d44333da597a",
 *           "keywords": [
 *               "comptia",
 *               "cisco",
 *               "microsoft",
 *               "aws",
 *               "oracle",
 *               "red hat"
 *           ]
 *       },
 *       {
 *           "id": "643e3e8aaf53d44333da59ad",
 *           "title": "Network & Security",
 *           "url": "/subcategories/643e3e8aaf53d44333da59ad",
 *           "category": "/categories/643e3e8aaf53d44333da597a",
 *           "keywords": [
 *               "cybersecurity",
 *               "ethical hacking",
 *               "penetration testing",
 *               "firewalls",
 *               "vpns"
 *           ]
 *       },
 *       {
 *           "id": "643e3e8aaf53d44333da59b0",
 *           "title": "Operating Systems",
 *           "url": "/subcategories/643e3e8aaf53d44333da59b0",
 *           "category": "/categories/643e3e8aaf53d44333da597a",
 *           "keywords": [
 *               "windows",
 *               "linux",
 *               "macos",
 *               "unix",
 *               "shell scripting"
 *           ]
 *       },
 *       {
 *           "id": "643e3e8aaf53d44333da59b3",
 *           "title": "Hardware",
 *           "url": "/subcategories/643e3e8aaf53d44333da59b3",
 *           "category": "/categories/643e3e8aaf53d44333da597a",
 *           "keywords": [
 *               "computer building",
 *               "troubleshooting",
 *               "repair",
 *               "maintenance",
 *               "upgrades"
 *           ]
 *       },
 *       {
 *           "id": "643e3e8aaf53d44333da59b6",
 *           "title": "Software Tools",
 *           "url": "/subcategories/643e3e8aaf53d44333da59b6",
 *           "category": "/categories/643e3e8aaf53d44333da597a",
 *           "keywords": [
 *               "microsoft office",
 *               "adobe creative suite",
 *               "google suite",
 *               "trello",
 *               "asana"
 *           ]
 *       }
 *   ]
 * }
 */
/**
 * @api {get} /subcategories Get subcategories
 * @apiName getSubcategories
 * @apiGroup Categories
 * @apiDescription Gets list of all subcategories.
 * @apiSuccess {Array} subcategories List of all subcategories
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * [
 *   {
 *       "id": "643e3e8aaf53d44333da598f",
 *       "title": "Web Development",
 *       "url": "/subcategories/643e3e8aaf53d44333da598f",
 *       "category": "/categories/643e3e8aaf53d44333da5978",
 *       "keywords": [
 *           "html",
 *           "css",
 *           "javascript",
 *           "react",
 *           "angular",
 *           "vue.js",
 *           "bootstrap"
 *       ]
 *   },
 *   {
 *       "id": "643e3e8aaf53d44333da5992",
 *       "title": "Mobile App Development",
 *       "url": "/subcategories/643e3e8aaf53d44333da5992",
 *       "category": "/categories/643e3e8aaf53d44333da5978",
 *       "keywords": [
 *           "ios",
 *           "android",
 *           "react native",
 *           "swift",
 *           "kotlin"
 *       ]
 *   },
 *   {
 *       "id": "643e3e8aaf53d44333da5995",
 *       "title": "Game Development",
 *       "url": "/subcategories/643e3e8aaf53d44333da5995",
 *       "category": "/categories/643e3e8aaf53d44333da5978",
 *       "keywords": [
 *           "unity",
 *           "unreal engine",
 *           "c#",
 *           "c++",
 *           "3d modeling"
 *       ]
 *   },
 *   {
 *       "id": "643e3e8aaf53d44333da5998",
 *       "title": "Programming Languages",
 *       "url": "/subcategories/643e3e8aaf53d44333da5998",
 *       "category": "/categories/643e3e8aaf53d44333da5978",
 *       "keywords": [
 *           "python",
 *           "java",
 *           "c++",
 *           "ruby",
 *           "php",
 *           "go"
 *       ]
 *   }
 * ]
 */

/**
 * @api {get} /subcategories/:id Get a specific subcategory
 * @apiName getSubcategoriesById
 * @apiGroup Categories
 * @apiDescription Gets a specific subcategory that matches given subcategory id.
 * @apiUse NotFound
 * @apiParam {String} id Unique ID for the subcategory to fetch
 * @apiSuccess {String} id Subcategory id
 * @apiSuccess {String} title Subcategory title
 * @apiSuccess {String} url Subcategory url
 * @apiSuccess {String} category Url for category associated with the subcategory
 * @apiSuccess {Array} keywords Keywords linked to the subcategory
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "id": "643e3e8aaf53d44333da598f",
 *   "title": "Web Development",
 *   "url": "/subcategories/643e3e8aaf53d44333da598f",
 *   "category": "/categories/643e3e8aaf53d44333da5978",
 *   "keywords": [
 *       "html",
 *       "css",
 *       "javascript",
 *       "react",
 *       "angular",
 *       "vue.js",
 *       "bootstrap"
 *   ]
 * }
 */
