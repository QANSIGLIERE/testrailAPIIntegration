const axios = require('axios');
var FormData = require('form-data');
const fs = require('fs');

async function post_file(base_url, additional_path, path_to_file, headers, file_key = 'attachment') {
    const data = new FormData();
    data.append(file_key, fs.createReadStream(path_to_file));

    let response = await axios(`https://${base_url}/${additional_path}`, {
        method: 'POST',
        data: data,
        headers: Object.assign(headers, data.getHeaders()),
        redirect: 'follow',
    }).catch(function (error) {
        return error;
    });

    return response.status == 200 ? response.data : response.response.data;
}

module.exports.post_file = post_file;
