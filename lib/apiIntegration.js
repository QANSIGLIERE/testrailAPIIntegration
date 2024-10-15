class TestRailAPI {
    constructor(url, username, apiKey) {
        this.url = url;
        this.headers = {
            'user-agent': 'QANSIGLIERE',
            'content-type': 'application/json',
            accept: 'application/json',
            authorization: 'Basic ' + btoa(`${username}:${apiKey}`),
        };
    }

    async getProject(projectID) {
        const response = await fetch(`https://${this.url}/index.php?/api/v2/get_project/${projectID}`, {
            mode: 'cors',
            method: 'GET',
            headers: this.headers,
            redirect: 'follow',
        });

        return response.json();
    }
}

module.exports.TestRailAPI = TestRailAPI;
