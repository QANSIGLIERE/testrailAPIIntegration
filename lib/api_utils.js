const fs = require('fs');

async function get(base_url, additional_path, headers, json_format = true) {
    let response = await fetch(`https://${base_url}/${additional_path}`, {
        mode: 'cors',
        method: 'GET',
        headers: headers,
        redirect: 'follow',
    });

    return json_format ? response.json() : response.text();
}

async function download(base_url, additional_path, key_for_collection, headers) {
    let initial_call = await get(base_url, additional_path, headers);

    let final_result = [...initial_call[key_for_collection]];

    if (Object.keys(initial_call).includes('_links')) {
        if (initial_call['_links']['next']) {
            let next_additional_path = `index.php?/${initial_call['_links']['next']}`;
            while (next_additional_path != null) {
                let next_call = await get(base_url, next_additional_path, headers);
                final_result.push(next_call[key_for_collection]);
                next_additional_path = next_call['_links']['next'] ? `index.php?/${next_call['_links']['next']}` : null;
            }
        }
    }

    return final_result;
}

async function post(base_url, additional_path, json_body, headers, json_format = true) {
    let response = await fetch(`https://${base_url}/${additional_path}`, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(json_body),
        headers: headers,
        redirect: 'follow',
    });

    return json_format ? response.json() : response.text();
}

async function post_file(base_url, additional_path, path_to_file, headers, json_format = true) {
    const form_data = new FormData();
    form_data.append('image', fs.createReadStream(path_to_file));

    let response = await fetch(`https://${base_url}/${additional_path}`, {
        mode: 'cors',
        method: 'POST',
        body: form_data,
        headers: headers,
        redirect: 'follow',
    });

    return json_format ? response.json() : response.text();
}

module.exports.get = get;
module.exports.post = post;
module.exports.post_file = post_file;
module.exports.download = download;
