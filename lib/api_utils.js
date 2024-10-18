async function get(base_url, additional_path, headers) {
    let response = await fetch(`https://${base_url}/${additional_path}`, {
        mode: 'cors',
        method: 'GET',
        headers: headers,
        redirect: 'follow',
    });

    return response.json();
}

async function download(base_url, additional_path, key_for_collection, headers) {
    let initial_call = await get(base_url, additional_path, headers);

    let final_result = [];
    final_result.push(initial_call[key_for_collection]);

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

async function post(base_url, additional_path, json_body, headers) {
    let response = await fetch(`https://${base_url}/${additional_path}`, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(json_body),
        headers: headers,
        redirect: 'follow',
    });

    return response.json();
}

module.exports.get = get;
module.exports.post = post;
module.exports.download = download;
