var { get } = require('./api_utils.js');

class TestRail_API {
    constructor(url, username, api_key) {
        this.url = url ? url : process.env.TESTRAIL_URL;
        this.headers = {
            'user-agent': 'QANSIGLIERE',
            'content-type': 'application/json',
            accept: 'application/json',
            authorization:
                'Basic ' +
                btoa(
                    `${username ? username : process.env.TESTRAIL_USERNAME}:${
                        api_key ? api_key : process.env.TESTRAIL_APIKEY
                    }`,
                ),
        };
    }

    async get_Project(projectID) {
        return await get(this.url, `/index.php?/api/v2/get_project/${projectID}`, this.headers);
    }
}

module.exports.TestRail_API = TestRail_API;
