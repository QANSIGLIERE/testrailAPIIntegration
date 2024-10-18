# qansigliere-testrail-api-integration

The main idea of ​​this library created in the JavaScript language is to provide a ready-made set of API methods for
integration with Testrail

## Author

https://www.youtube.com/@QANSIGLIERE/

## Installation

Using npm `npm i qansigliere-testrail-api-integration`

## How to use it

### Create a \*.env file

Create any \*.env file (like `testrail.env`) and write the following information in the created file

```
export TESTRAIL_URL="__YOUR_TESTRAIL_URL__"
export TESTRAIL_USERNAME="__YOUR_TESTRAIL_EMAIL__"
export TESTRAIL_APIKEY="__YOUR_TESTRAIL_APIKEY__"
```

### Make the \*.env file works

Just run in the terminal the following command: `source yourfile.env`

### And now You can make any API call to Your TestRail

```
var { TestRail_API } = require('qansigliere-testrail-api-integration');

(async function Demo() {
    let new_integration = new TestRail_API();
    let resp = await new_integration.get_Project(1);
    console.log(JSON.stringify(resp));
})();
```

## API Documentation

### Statuses

TestRail documentation is present [here](https://support.testrail.com/hc/en-us/articles/7077935129364-Statuses)

#### get_case_statuses

```
let new_integration = new TestRail_API();
let resp = await new_integration.get_case_statuses();
```

#### get_statuses

```
let new_integration = new TestRail_API();
let resp = await new_integration.get_statuses();
```
