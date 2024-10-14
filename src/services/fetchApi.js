async function fetchApi(url, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };
    const requestOptions = {
        method: options.method || 'GET',
        headers: headers,
        ...(options.body && {body: JSON.stringify(options.body)}),
    };

    const newUrl = typeof url == "string" ? url : url();

    return fetch(newUrl, requestOptions)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(new Error(`HTTP error! status: ${response.status}`));
            }
            if (response.status === 204) {
                return null;
            }
            return response.json()
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}

export default fetchApi;
