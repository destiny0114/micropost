class HTTP {
    async get(url) {
        const response = await fetch(url);
        const resdata = await response.json();
        return resdata;
    }

    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resdata = await response.json();
        return resdata;
    }

    async put(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resdata = await response.json();
        return resdata;
    }

    async delete(url) {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });

        const resdata = await 'Deleting.......';
        return resdata;
    }
}

export const http = new HTTP();