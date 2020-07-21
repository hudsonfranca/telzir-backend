## Setup and Running

-   Prerequisites

    -   Node
    -   postgres

-   Clone repository `https://github.com/hudsonfranca/telzir-backend.git`

-   **API**

    -   Info

        -   Create the test, development and build (default) databases, before configuring the `.env` file variables.

        -   Run migrations before starting the application

    -   Install the dependencies

        -   `yarn install`

    -   Configuration

        -   Create an `.env` file and modify the variables with your database connection parameters, use the `.exemple.env` file as an example.


        -   The `NODE_ENV` variable is automatically configured when you run the scripts that are in the`package.json` file.

        -   The `PORT` variable is the port that is used by localhost, if this variable is not configured the application will use port `3000` as the default.

        -   Variables that start with the word `DEVELOPMENT_` are the variables for the development connection.

        -   Variables that start with the word `TEST_` are the variables for the test connection.

        -   Variables that start with the word `DEFAULT_` are the variables for the build connection.

-   **Available Scripts**

    -   `yarn test`

        -   Launches the test runner.

    -   `yarn dev:server`

        -   Runs the app in the development mode.

    -   `yarn migration:generate`

        -   Create a new migration.

    -   `yarn migration:run`

        -   Execute all pending migrations.

    -   `yarn migration:revert`
        -   Revert the most recently executed migration.

-

## ENDPOINTS

-   [ Compare prices with plan and without plan](#compare-prices-with-plan-and-without-plan)
-   [Create a DDD](#create-a-ddd)
-   [Get list of DDDs](#get-list-of-ddds)
-   [Get a specific DDD](#get-a-specific-ddd)
-   [Delete a DDD](#delete-a-ddd)
-   [Update DDD data](#update-ddd-data)
-   [Create a Plan](#create-a-plan)
-   [Get list of Plans](#get-list-of-plans)
-   [Get a specific Plan](#get-a-specific-Plan)
-   [Delete a Plan](#delete-a-plan)
-   [Update Plan data](#update-plan-data)
-   [Create a Price](#create-a-price)
-   [Get list of Price](#get-list-of-price)
-   [Get a specific Price](#get-a-specific-price)
-   [Delete a Price](#delete-a-Price)
-   [Update Price data](#update-price-data)

### Compare prices with plan and without plan

#### Request

`GET /calculate-price`

    http://localhost:3333/calculate-price

`BODY`

    {
        "minutes":80,
        "priceId":1,
        "planId":1
    }

#### Response

    {
        "priceWithPlan": 37.4,
        "priceWithoutPlan": 136
    }

---

### Create a DDD

#### Request

`POST /ddd`

    http://localhost:3333/ddd

`BODY`

    {
        "code" :20
    }

#### Response

    {
        "code": 20,
        "id": 3,
        "createdAt": "2020-07-19T12:05:40.454Z",
        "updatedAt": "2020-07-19T12:05:40.454Z"
    }

---

### Get list of DDDs

#### Request

`GET /ddd`

    http://localhost:3333/ddd

#### Response

    [
        {
            "id": 1,
            "code": 12,
            "createdAt": "2020-07-19T04:23:24.291Z",
            "updatedAt": "2020-07-19T04:23:24.291Z"
        },
        {
            "id": 2,
            "code": 11,
            "createdAt": "2020-07-19T11:40:06.531Z",
            "updatedAt": "2020-07-19T11:40:06.531Z"
        }
    ]

### Get a specific DDD

#### Request

`GET /ddd/:id`

    http://localhost:3333/ddd/3

#### Response

    {
        "id": 3,
        "code": 11,
        "createdAt": "2020-07-17T21:44:50.795Z",
        "updatedAt": "2020-07-17T21:44:50.795Z"
    }

---

### Delete a DDD

#### Request

`DELETE /ddd/:id`

    http://localhost:3333/ddd/1

#### Response

     Status: 204

---

### Update DDD data

#### Request

`PUT /ddd/:id`

    http://localhost:3333/ddd/1

`BODY`

    {
        "code":"012"
    }

#### Response

    {
        "id": 1,
        "code": "012",
        "createdAt": "2020-07-19T04:23:24.291Z",
        "updatedAt": "2020-07-19T04:23:24.291Z"
    }

---

### Create a Plan

#### Request

`POST /plan`

    http://localhost:3333/plan

`BODY`

    {
        "name":"FaleMais 20",
        "minutes":"20"
    }

#### Response

    {
        "minutes": "20",
        "name": "FaleMais 20",
        "id": 3,
        "createdAt": "2020-07-19T04:35:11.805Z",
        "updatedAt": "2020-07-19T04:35:11.805Z"
    }

---

### Get list of Plans

#### Request

`GET /plan`

    http://localhost:3333/plan

#### Response

    [
        {
            "id": 2,
            "name": "FaleMais 70",
            "minutes": 70,
            "createdAt": "2020-07-19T02:23:55.166Z",
            "updatedAt": "2020-07-19T02:23:55.166Z"
        },
        {
            "id": 3,
            "name": "FaleMais 20",
            "minutes": 20,
            "createdAt": "2020-07-19T04:35:11.805Z",
            "updatedAt": "2020-07-19T04:35:11.805Z"
        }
    ]

---

### Get a specific Plan

#### Request

`GET /plan/:id`

    http://localhost:3333/plan/2

#### Response

    {
        "id": 2,
        "name": "FaleMais 60",
        "minutes": 60,
        "createdAt": "2020-07-19T02:23:55.166Z",
        "updatedAt": "2020-07-19T02:23:55.166Z"
    }

---

### Delete a Plan

#### Request

`DELETE /plan/:id`

    http://localhost:3333/plan/1

#### Response

     Status: 204

---

### Update Plan data

#### Request

`PUT /plan/:id`

    http://localhost:3333/plan/2

`BODY`

    {
        "name":"FaleMais 70",
        "minutes":"70"
    }

#### Response

    {
        "id": 2,
        "name": "FaleMais 70",
        "minutes": "70",
        "createdAt": "2020-07-19T02:23:55.166Z",
        "updatedAt": "2020-07-19T02:23:55.166Z"
    }

---

### Create a Price

    The source and destination ddd must exist in the database.

#### Request

`POST /price`

    http://localhost:3333/price

`BODY`

    {
        "price":20,
        "destinationId":1,
        "sourceId" :1
    }

#### Response

    {
        "source": {
            "id": 1,
            "code": 12,
            "createdAt": "2020-07-19T04:23:24.291Z",
            "updatedAt": "2020-07-19T04:23:24.291Z"
        },
        "destination": {
            "id": 1,
            "code": 12,
            "createdAt": "2020-07-19T04:23:24.291Z",
            "updatedAt": "2020-07-19T04:23:24.291Z"
        },
        "price": 20,
        "id": 3,
        "createdAt": "2020-07-19T19:43:08.553Z",
        "updatedAt": "2020-07-19T19:43:08.553Z"
    }

---

### Get list of Price

#### Request

`GET /price`

    http://localhost:3333/price

#### Response

    [
        {
            "id": 1,
            "price": "30.00",
            "createdAt": "2020-07-19T11:47:42.000Z",
            "updatedAt": "2020-07-19T11:47:42.000Z",
            "source": {
            "id": 2,
            "code": 11,
            "createdAt": "2020-07-19T11:40:06.531Z",
            "updatedAt": "2020-07-19T11:40:06.531Z"
            },
            "destination": {
            "id": 1,
            "code": 12,
            "createdAt": "2020-07-19T04:23:24.291Z",
            "updatedAt": "2020-07-19T04:23:24.291Z"
            }
        },
        {
            "id": 3,
            "price": "20.00",
            "createdAt": "2020-07-19T19:43:08.553Z",
            "updatedAt": "2020-07-19T19:43:08.553Z",
            "source": {
            "id": 1,
            "code": 12,
            "createdAt": "2020-07-19T04:23:24.291Z",
            "updatedAt": "2020-07-19T04:23:24.291Z"
            },
            "destination": {
            "id": 1,
            "code": 12,
            "createdAt": "2020-07-19T04:23:24.291Z",
            "updatedAt": "2020-07-19T04:23:24.291Z"
            }
        }
    ]

---

### Get a specific Price

#### Request

`GET /price/:id`

    http://localhost:3333/price/3

#### Response

    {
        "id": 3,
        "price": "20.00",
        "createdAt": "2020-07-19T19:43:08.553Z",
        "updatedAt": "2020-07-19T19:43:08.553Z",
        "source": {
            "id": 1,
            "code": 12,
            "createdAt": "2020-07-19T04:23:24.291Z",
            "updatedAt": "2020-07-19T04:23:24.291Z"
        },
        "destination": {
            "id": 1,
            "code": 12,
            "createdAt": "2020-07-19T04:23:24.291Z",
            "updatedAt": "2020-07-19T04:23:24.291Z"
        }
    }

---

### Delete a Price

#### Request

`DELETE /price/:id`

    http://localhost:3333/price/2

#### Response

     Status: 204

---

### Update Price data

#### Request

`PUT /price/:id`

    http://localhost:3333/price/1

`BODY`

    {
        "price":30
    }

#### Response

    {
        "id": 1,
        "price": 30,
        "createdAt": "2020-07-19T11:47:42.000Z",
        "updatedAt": "2020-07-19T11:47:42.000Z"
    }
