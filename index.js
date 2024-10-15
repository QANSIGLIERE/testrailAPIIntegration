var { TestRailAPI } = require('./lib/apiIntegration.js');

(async function Demo() {
    let apiIntegration = new TestRailAPI(
        'qansigliere.testrail.io',
        'qansigliere@gmail.com',
        'GPco0JvzmQL1gxcb1Xsb-cAbHKPg51Kye4oNWVE5u',
    );

    let resp = await apiIntegration.getProject(1);

    console.log(JSON.stringify(resp));
})();

module.exports.TestRailAPI = TestRailAPI;
