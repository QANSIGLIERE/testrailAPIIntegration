var { get, post, post_file, download } = require('./axios_utils.js');

class TestRail_API {
    constructor(url = '', username = '', api_key = '') {
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
        return await get(this.url, `index.php?/api/v2/get_bdd/${case_id}`, this.headers);
    }

    async add_bdd(section_id, path_to_file) {
        return await post_file(this.url, `index.php?/api/v2/add_bdd/${section_id}`, path_to_file, this.headersFormData);
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
        return await post(this.url, `index.php?/api/v2/delete_variable/${variable_id}`, json_body, this.headers);
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
        return await post(this.url, `index.php?/api/v2/delete_project/${project_id}`, json_body, this.headers);
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
        return await post(this.url, `index.php?/api/v2/delete_suite/${suite_id}`, json_body, this.headers);
    }

    async get_section(section_id) {
        return await get(this.url, `index.php?/api/v2/get_section/${section_id}`, this.headers);
    }

    async get_sections(project_id, suite_id) {
        return await download(
            this.url,
            `index.php?/api/v2/get_sections/${project_id}&suite_id=${suite_id}`,
            'sections',
            this.headers,
        );
    }

    async add_section(project_id, json_body) {
        return await post(this.url, `index.php?/api/v2/add_section/${project_id}`, json_body, this.headers);
    }

    async move_section(section_id, json_body) {
        return await post(this.url, `index.php?/api/v2/move_section/${section_id}`, json_body, this.headers);
    }

    async update_section(section_id, json_body) {
        return await post(this.url, `index.php?/api/v2/update_section/${section_id}`, json_body, this.headers);
    }

    async delete_section(section_id, json_body) {
        return await post(this.url, `index.php?/api/v2/delete_section/${section_id}`, json_body, this.headers);
    }

    async get_milestone(milestone_id) {
        return await get(this.url, `index.php?/api/v2/get_milestone/${milestone_id}`, this.headers);
    }

    async get_milestones(project_id) {
        return await download(this.url, `index.php?/api/v2/get_milestones/${project_id}`, 'milestones', this.headers);
    }

    async add_milestone(project_id, json_body) {
        return await post(this.url, `index.php?/api/v2/add_milestone/${project_id}`, json_body, this.headers);
    }

    async update_milestone(milestone_id, json_body) {
        return await post(this.url, `index.php?/api/v2/update_milestone/${milestone_id}`, json_body, this.headers);
    }

    async delete_milestone(milestone_id, json_body) {
        return await post(this.url, `index.php?/api/v2/delete_milestone/${milestone_id}`, json_body, this.headers);
    }

    async get_group(group_id) {
        return await get(this.url, `index.php?/api/v2/get_group/${group_id}`, this.headers);
    }

    async get_groups() {
        return await download(this.url, `index.php?/api/v2/get_groups`, 'groups', this.headers);
    }

    async add_group(json_body) {
        return await post(this.url, `index.php?/api/v2/add_group`, json_body, this.headers);
    }

    async update_group(group_id, json_body) {
        return await post(this.url, `index.php?/api/v2/update_group/${group_id}`, json_body, this.headers);
    }

    async delete_group(group_id, json_body) {
        return await post(this.url, `index.php?/api/v2/delete_group/${group_id}`, json_body, this.headers);
    }

    async get_user(user_id) {
        return await get(this.url, `index.php?/api/v2/get_user/${user_id}`, this.headers);
    }

    async get_current_user(user_id) {
        return await get(this.url, `index.php?/api/v2/get_current_user/${user_id}`, this.headers);
    }

    async get_user_by_email(email) {
        return await get(this.url, `index.php?/api/v2/get_user_by_email&email=${email}`, this.headers);
    }

    async get_users() {
        return await download(this.url, `index.php?/api/v2/get_users`, 'users', this.headers);
    }

    async get_users__project_id(project_id) {
        return await download(this.url, `index.php?/api/v2/get_users/${project_id}`, 'users', this.headers);
    }

    async add_user(json_body) {
        return await post(this.url, `index.php?/api/v2/add_user`, json_body, this.headers);
    }

    async update_user(user_id, json_body) {
        return await post(this.url, `index.php?/api/v2/update_user/${user_id}`, json_body, this.headers);
    }

    async get_test(test_id) {
        return await get(this.url, `index.php?/api/v2/get_test/${test_id}`, this.headers);
    }

    async get_tests(run_id) {
        return await download(this.url, `index.php?/api/v2/get_tests/${run_id}`, 'tests', this.headers);
    }

    async get_shared_step(shared_step_id) {
        return await get(this.url, `index.php?/api/v2/get_shared_step/${shared_step_id}`, this.headers);
    }

    async get_shared_step_history(shared_step_id) {
        return await get(this.url, `index.php?/api/v2/get_shared_step_history/${shared_step_id}`, this.headers);
    }

    async get_shared_steps(project_id) {
        return await download(
            this.url,
            `index.php?/api/v2/get_shared_steps/${project_id}`,
            'shared_steps',
            this.headers,
        );
    }

    async add_shared_step(project_id, json_body) {
        return await post(this.url, `index.php?/api/v2/add_shared_step/${project_id}`, json_body, this.headers);
    }

    async update_shared_step(shared_update_id, json_body) {
        return await post(
            this.url,
            `index.php?/api/v2/update_shared_step/${shared_update_id}`,
            json_body,
            this.headers,
        );
    }

    async delete_shared_step(shared_update_id, json_body) {
        return await post(
            this.url,
            `index.php?/api/v2/delete_shared_step/${shared_update_id}`,
            json_body,
            this.headers,
        );
    }

    async get_dataset(dataset_id) {
        return await get(this.url, `index.php?/api/v2/get_dataset/${dataset_id}`, this.headers);
    }

    async get_datasets(project_id) {
        return await download(this.url, `index.php?/api/v2/get_datasets/${project_id}`, 'datasets', this.headers);
    }

    async add_dataset(project_id, json_body) {
        return await post(this.url, `index.php?/api/v2/add_dataset/${project_id}`, json_body, this.headers);
    }

    async update_dataset(dataset_id, json_body) {
        return await post(this.url, `index.php?/api/v2/update_dataset/${dataset_id}`, json_body, this.headers);
    }

    async delete_dataset(dataset_id, json_body) {
        return await post(this.url, `index.php?/api/v2/delete_dataset/${dataset_id}`, json_body, this.headers);
    }

    async get_case(case_id) {
        return await get(this.url, `index.php?/api/v2/get_case/${case_id}`, this.headers);
    }

    async get_cases(project_id, suite_id) {
        return await download(
            this.url,
            `index.php?/api/v2/get_cases/${project_id}&suite_id=${suite_id}`,
            'cases',
            this.headers,
        );
    }

    async get_history_for_case(case_id) {
        return await download(this.url, `index.php?/api/v2/get_history_for_case/${case_id}`, 'history', this.headers);
    }

    async add_case(section_id, json_body) {
        return await post(this.url, `index.php?/api/v2/add_case/${section_id}`, json_body, this.headers);
    }

    async copy_cases_to_section(section_id, json_body) {
        return await post(this.url, `index.php?/api/v2/copy_cases_to_section/${section_id}`, json_body, this.headers);
    }

    async update_case(case_id, json_body) {
        return await post(this.url, `index.php?/api/v2/update_case/${case_id}`, json_body, this.headers);
    }

    async update_cases(suite_id, json_body) {
        return await post(this.url, `index.php?/api/v2/update_cases/${suite_id}`, json_body, this.headers);
    }

    async move_cases_to_section(section_id, json_body) {
        return await post(this.url, `index.php?/api/v2/move_cases_to_section/${section_id}`, json_body, this.headers);
    }

    async delete_case(case_id, json_body) {
        return await post(this.url, `index.php?/api/v2/delete_case/${case_id}`, json_body, this.headers);
    }

    async delete_cases(suite_id, json_body) {
        return await post(this.url, `index.php?/api/v2/delete_cases/${suite_id}&soft=1`, json_body, this.headers);
    }

    async get_plan(plan_id) {
        return await get(this.url, `index.php?/api/v2/get_plan/${plan_id}`, this.headers);
    }

    async get_plans(project_id) {
        return await download(this.url, `index.php?/api/v2/get_plans/${project_id}`, 'plans', this.headers);
    }

    async add_plan(project_id, json_body) {
        return await post(this.url, `index.php?/api/v2/add_plan/${project_id}`, json_body, this.headers);
    }

    async add_plan_entry(plan_id, json_body) {
        return await post(this.url, `index.php?/api/v2/add_plan_entry/${plan_id}`, json_body, this.headers);
    }

    async add_run_to_plan_entry(plan_id, entry_id, json_body) {
        return await post(
            this.url,
            `index.php?/api/v2/add_run_to_plan_entry/${plan_id}/${entry_id}`,
            json_body,
            this.headers,
        );
    }

    async update_plan(plan_id, json_body) {
        return await post(this.url, `index.php?/api/v2/update_plan/${plan_id}`, json_body, this.headers);
    }

    async update_plan_entry(plan_id, entry_id, json_body) {
        return await post(
            this.url,
            `index.php?/api/v2/update_plan_entry/${plan_id}/${entry_id}`,
            json_body,
            this.headers,
        );
    }

    async update_run_in_plan_entry(run_id, json_body) {
        return await post(this.url, `index.php?/api/v2/update_run_in_plan_entry/${run_id}`, json_body, this.headers);
    }

    async close_plan(plan_id, json_body) {
        return await post(this.url, `index.php?/api/v2/close_plan/${plan_id}`, json_body, this.headers);
    }

    async delete_plan(plan_id, json_body) {
        return await post(this.url, `index.php?/api/v2/delete_plan/${plan_id}`, json_body, this.headers);
    }

    async delete_plan_entry(plan_id, entry_id, json_body) {
        return await post(
            this.url,
            `index.php?/api/v2/delete_plan_entry/${plan_id}/${entry_id}`,
            json_body,
            this.headers,
        );
    }

    async delete_run_from_plan_entry(run_id, json_body) {
        return await post(this.url, `index.php?/api/v2/delete_run_from_plan_entry/${run_id}`, json_body, this.headers);
    }

    async get_configs(project_id) {
        return await get(this.url, `index.php?/api/v2/get_configs/${project_id}`, this.headers);
    }

    async add_config_group(project_id, json_body) {
        return await post(this.url, `index.php?/api/v2/add_config_group/${project_id}`, json_body, this.headers);
    }

    async add_config(config_group_id, json_body) {
        return await post(this.url, `index.php?/api/v2/add_config/${config_group_id}`, json_body, this.headers);
    }

    async update_config_group(config_group_id, json_body) {
        return await post(
            this.url,
            `index.php?/api/v2/update_config_group/${config_group_id}`,
            json_body,
            this.headers,
        );
    }

    async update_config(config_id, json_body) {
        return await post(this.url, `index.php?/api/v2/update_config/${config_id}`, json_body, this.headers);
    }

    async delete_config_group(config_group_id, json_body) {
        return await post(
            this.url,
            `index.php?/api/v2/delete_config_group/${config_group_id}`,
            json_body,
            this.headers,
        );
    }

    async delete_config(config_id, json_body) {
        return await post(this.url, `index.php?/api/v2/delete_config/${config_id}`, json_body, this.headers);
    }

    async add_attachment_to_case(case_id, path_to_file) {
        return await post_file(
            this.url,
            `index.php?/api/v2/add_attachment_to_case/${case_id}`,
            path_to_file,
            this.headersFormData,
        );
    }

    async add_attachment_to_plan(plan_id, path_to_file) {
        return await post_file(
            this.url,
            `index.php?/api/v2/add_attachment_to_plan/${plan_id}`,
            path_to_file,
            this.headersFormData,
        );
    }

    async add_attachment_to_plan_entry(plan_id, entry_id, path_to_file) {
        return await post_file(
            this.url,
            `index.php?/api/v2/add_attachment_to_plan_entry/${plan_id}/${entry_id}`,
            path_to_file,
            this.headersFormData,
        );
    }

    async add_attachment_to_result(result_id, path_to_file) {
        return await post_file(
            this.url,
            `index.php?/api/v2/add_attachment_to_result/${result_id}`,
            path_to_file,
            this.headersFormData,
        );
    }

    async add_attachment_to_run(run_id, path_to_file) {
        return await post_file(
            this.url,
            `index.php?/api/v2/add_attachment_to_run/${run_id}`,
            path_to_file,
            this.headersFormData,
        );
    }

    async get_attachments_for_case(case_id) {
        return await download(
            this.url,
            `index.php?/api/v2/get_attachments_for_case/${case_id}`,
            'attachments',
            this.headers,
        );
    }

    async get_attachments_for_plan(plan_id) {
        return await download(
            this.url,
            `index.php?/api/v2/get_attachments_for_plan/${plan_id}`,
            'attachments',
            this.headers,
        );
    }

    async get_attachments_for_plan_entry(plan_id, entry_id) {
        return await get(
            this.url,
            `index.php?/api/v2/get_attachments_for_plan_entry/${plan_id}/${entry_id}`,
            this.headers,
        );
    }

    async get_attachments_for_run(run_id) {
        return await download(
            this.url,
            `index.php?/api/v2/get_attachments_for_run/${run_id}`,
            'attachments',
            this.headers,
        );
    }

    async get_attachments_for_test(test_id) {
        return await get(this.url, `index.php?/api/v2/get_attachments_for_test/${test_id}`, this.headers);
    }

    async get_attachment(attachment_id) {
        return await get(this.url, `index.php?/api/v2/get_attachment/${attachment_id}`, this.headers);
    }

    async delete_attachment(attachment_id, json_body) {
        return await post(this.url, `index.php?/api/v2/delete_attachment/${attachment_id}`, json_body, this.headers);
    }
}

module.exports.TestRail_API = TestRail_API;
