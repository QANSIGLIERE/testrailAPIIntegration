var { TestRail_API } = require('./lib/api_integration.js');

(async function Demo() {
    let new_integration = new TestRail_API();

    let resp = await new_integration.add_results_for_cases(4, {
        results: [
            {
                case_id: 17,
                status_id: 1,
                comment: 'This test failed',
                defects: 'TR-7',
            },
            {
                case_id: 18,
                status_id: 5,
                comment: 'This test passed',
                elapsed: '5m',
                version: '1.0 RC1',
            },
            {
                case_id: 19,
                status_id: 2,
                comment: 'Assigned this test to Joe',
            },
        ],
    });

    console.log(JSON.stringify(resp));
})();

module.exports.TestRail_API = TestRail_API;
