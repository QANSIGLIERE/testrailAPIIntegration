async function get(base_url, additional_path, headers) {
    let response = await fetch(`https://${base_url}${additional_path}`, {
        mode: 'cors',
        method: 'GET',
        headers: headers,
        redirect: 'follow',
    });

    return response.json();
}

module.exports.get = get;
