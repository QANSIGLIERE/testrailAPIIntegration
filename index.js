var { TestRail_API } = require('./lib/api_integration.js');

(async function Demo() {
    let new_integration = new TestRail_API();

    let resp = await new_integration.add_case_field({
        type: 'Multiselect',
        name: 'my_multiselect',
        label: 'My Multiselect',
        description: 'my custom Multiselect description',
        configs: [
            {
                context: {
                    is_global: true,
                    project_ids: '',
                },
                options: {
                    is_required: false,
                    items: '1, One\n2, Two',
                },
            },
        ],
        include_all: true,
    });

    console.log(JSON.stringify(resp));
})();

module.exports.TestRail_API = TestRail_API;
