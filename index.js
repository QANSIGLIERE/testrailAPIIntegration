var { TestRail_API } = require('./lib/api_integration.js');

(async function Demo() {
    let new_integration = new TestRail_API();

    let resp = await new_integration.add_bdd(
        1,
        `Feature: Users cannot login with invalid credentials
The login page should not allow users to login with invalid credentials, and it should not reveal sensitive info relating to the correctness of credentials.Background:Given I am viewing the login page`,
    );

    console.log(JSON.stringify(resp));
})();

module.exports.TestRail_API = TestRail_API;
