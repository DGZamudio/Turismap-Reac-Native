    const baseUrl = 'https://turismap-backend-python.onrender.com';

    const getData = (endpoint) => {
        const url = `${baseUrl}${endpoint}`;
        return fetch(url, {
            method: 'GET'
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((e) => {
            console.error('Fetch error:', e);
            throw e;
        })
    }
    const sendData = (endpoint, body) => {
        const url = `${baseUrl}${endpoint}`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((e) => {
            console.error('Fetch error:', e);
            throw e;
        })
    }
    const updateData = (endpoint, body) => {
        const url = `${baseUrl}${endpoint}`;
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((e) => {
            console.error('Fetch error:', e);
            throw e;
        }) 
    }
    const deleteData = (endpoint) => {
        const url = `${baseUrl}${endpoint}`;
        return fetch(url, {
            method: 'DELETE'
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((e) => {
            console.error('Fetch error:', e);
            throw e;
        })
    }

export { getData, sendData, updateData, deleteData }