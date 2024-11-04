const axios = require('axios');
var FormData = require('form-data');
const fs = require('fs');

async function get(base_url, additional_path, headers, debug = false) {
    let response = await axios(`https://${base_url}/${additional_path}`, {
        method: 'GET',
        headers: headers,
        redirect: 'follow',
    }).catch(function (error) {
        return error;
    });

    if (debug) {
        return [response.status, response.status == 200 ? response.data : response.response.data];
    } else {
        return response.status == 200 ? response.data : response.response.data;
    }
}

async function download(base_url, additional_path, key_for_collection, headers) {
    let initial_call = await get(base_url, additional_path, headers, true);
    let final_result = [];

    if (initial_call[0] < 400) {
        final_result = [...initial_call[1][key_for_collection]];

        if (Object.keys(initial_call[1]).includes('_links')) {
            if (initial_call[1]['_links']['next']) {
                let next_additional_path = `index.php?/${initial_call[1]['_links']['next']}`;
                while (next_additional_path != null) {
                    let next_call = await get(base_url, next_additional_path, headers);
                    final_result.push(...next_call[key_for_collection]);
                    next_additional_path = next_call['_links']['next']
                        ? `index.php?/${next_call['_links']['next']}`
                        : null;
                }
            }
        }
    } else {
        final_result = initial_call[1];
    }

    return final_result;
}

async function post(base_url, additional_path, json_body, headers) {
    let response = await axios(`https://${base_url}/${additional_path}`, {
        method: 'POST',
        data: JSON.stringify(json_body),
        headers: headers,
        redirect: 'follow',
    }).catch(function (error) {
        return error;
    });

    return response.status == 200 ? response.data : response.response.data;
}

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

module.exports.get = get;
module.exports.download = download;
module.exports.post = post;
module.exports.post_file = post_file;
