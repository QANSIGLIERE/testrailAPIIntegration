var { get, download } = require('./api_utils.js');

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

    async get_case_statuses() {
        return await get(this.url, 'index.php?/api/v2/get_case_statuses', this.headers);
    }

    async get_statuses() {
        return await get(this.url, 'index.php?/api/v2/get_statuses', this.headers);
    }

    async get_templates(project_id) {
        return await get(this.url, `index.php?/api/v2/get_templates/${project_id}`, this.headers);
    }

    async get_roles() {
        return await download(this.url, 'index.php?/api/v2/get_roles', 'roles', this.headers);
    }

    async get_case_types() {
        return await get(this.url, 'index.php?/api/v2/get_case_types', this.headers);
    }

    async get_priorities() {
        return await get(this.url, 'index.php?/api/v2/get_priorities', this.headers);
    }

    async get_result_fields() {
        return await get(this.url, 'index.php?/api/v2/get_result_fields', this.headers);
    }
}

module.exports.TestRail_API = TestRail_API;
