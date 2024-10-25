var { TestRail_API } = require('./lib/api_integration.js');

(async function Demo() {
    let new_integration = new TestRail_API();

    let resp = await new_integration.update_user(2, {
        name: 'UPDATED API',
    });

    console.log(JSON.stringify(resp));
})();

module.exports.TestRail_API = TestRail_API;
