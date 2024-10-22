var { get, post, download } = require('./api_utils.js');

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
        this.headersFormData = {
            'user-agent': 'QANSIGLIERE',
            'content-type': 'multipart/form-data',
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

    async get_run(run_id) {
        return await get(this.url, `index.php?/api/v2/get_run/${run_id}`, this.headers);
    }

    async get_runs(project_id) {
        return await download(this.url, `index.php?/api/v2/get_runs/${project_id}`, 'runs', this.headers);
    }

    async add_run(project_id, json_body) {
        return await post(this.url, `index.php?/api/v2/add_run/${project_id}`, json_body, this.headers);
    }

    async update_run(run_id, json_body) {
        return await post(this.url, `index.php?/api/v2/update_run/${run_id}`, json_body, this.headers);
    }

    async close_run(run_id, json_body) {
        return await post(this.url, `index.php?/api/v2/close_run/${run_id}`, json_body, this.headers);
    }

    async delete_run(run_id, json_body) {
        return await post(this.url, `index.php?/api/v2/delete_run/${run_id}`, json_body, this.headers);
    }

    async get_bdd(case_id) {
        return await get(this.url, `index.php?/api/v2/get_bdd/${case_id}`, this.headers, false);
    }

    async add_bdd(section_id, body) {
        // Prepare a request body
        const formData = new FormData();
        formData.append('file', body);
        return await post(this.url, `index.php?/api/v2/add_bdd/${section_id}`, formData, this.headersFormData, false);
    }

    async get_case_fields() {
        return await get(this.url, 'index.php?/api/v2/get_case_fields', this.headers);
    }

    async add_case_field(json_body) {
        return await post(this.url, `index.php?/api/v2/add_case_field`, json_body, this.headers);
    }

    async get_reports(project_id) {
        return await get(this.url, `index.php?/api/v2/get_reports/${project_id}`, this.headers);
    }

    async run_report(report_template_id) {
        return await get(this.url, `index.php?/api/v2/run_report/${report_template_id}`, this.headers);
    }

    async get_variables(project_id) {
        return await download(this.url, `index.php?/api/v2/get_variables/${project_id}`, 'variables', this.headers);
    }

    async add_variable(project_id, json_body) {
        return await post(this.url, `index.php?/api/v2/add_variable/${project_id}`, json_body, this.headers);
    }

    async update_variable(variable_id, json_body) {
        return await post(this.url, `index.php?/api/v2/update_variable/${variable_id}`, json_body, this.headers);
    }

    async delete_variable(variable_id, json_body) {
        return await post(this.url, `index.php?/api/v2/delete_variable/${variable_id}`, json_body, this.headers, false);
    }

    async get_project(project_id) {
        return await get(this.url, `index.php?/api/v2/get_project/${project_id}`, this.headers);
    }

    async get_projects() {
        return await download(this.url, `index.php?/api/v2/get_projects`, 'projects', this.headers);
    }

    async add_project(json_body) {
        return await post(this.url, `index.php?/api/v2/add_project`, json_body, this.headers);
    }

    async update_project(project_id, json_body) {
        return await post(this.url, `index.php?/api/v2/update_project/${project_id}`, json_body, this.headers);
    }

    async delete_project(project_id, json_body) {
        return await post(this.url, `index.php?/api/v2/delete_project/${project_id}`, json_body, this.headers, false);
    }

    async get_results(test_id) {
        return await download(this.url, `index.php?/api/v2/get_results/${test_id}`, 'results', this.headers);
    }

    async get_results_for_case(run_id, case_id) {
        return await download(
            this.url,
            `index.php?/api/v2/get_results_for_case/${run_id}/${case_id}`,
            'results',
            this.headers,
        );
    }

    async get_results_for_run(run_id) {
        return await download(this.url, `index.php?/api/v2/get_results_for_run/${run_id}`, 'results', this.headers);
    }

    async add_result(test_id, json_body) {
        return await post(this.url, `index.php?/api/v2/add_result/${test_id}`, json_body, this.headers);
    }

    async add_result_for_case(run_id, case_id, json_body) {
        return await post(
            this.url,
            `index.php?/api/v2/add_result_for_case/${run_id}/${case_id}`,
            json_body,
            this.headers,
        );
    }

    async add_results(run_id, json_body) {
        return await post(this.url, `index.php?/api/v2/add_results/${run_id}`, json_body, this.headers);
    }

    async add_results_for_cases(run_id, json_body) {
        return await post(this.url, `index.php?/api/v2/add_results_for_cases/${run_id}`, json_body, this.headers);
    }

    async get_suite(suite_id) {
        return await get(this.url, `index.php?/api/v2/get_suite/${suite_id}`, this.headers);
    }

    async get_suites(project_id) {
        return await get(this.url, `index.php?/api/v2/get_suites/${project_id}`, this.headers);
    }

    async add_suite(project_id, json_body) {
        return await post(this.url, `index.php?/api/v2/add_suite/${project_id}`, json_body, this.headers);
    }

    async update_suite(suite_id, json_body) {
        return await post(this.url, `index.php?/api/v2/update_suite/${suite_id}`, json_body, this.headers);
    }

    async delete_suite(suite_id, json_body) {
        return await post(this.url, `index.php?/api/v2/delete_suite/${suite_id}`, json_body, this.headers, false);
    }
}

module.exports.TestRail_API = TestRail_API;
