
import { baseUrl } from '../config.json';

 const FetchApi = {
    get: (url) => fetchRequest(url, "GET"),
    post: (url, body) => fetchRequest(url, "POST", body),
    put: (url, body) => fetchRequest(url, "PUT", body),
    delete: (url) => fetchRequest(url, "DELETE"),
};

const fetchRequest = async (url, method, body = null) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    const options = { method, headers };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${baseUrl}${url}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch API error:', error);
        throw error;
    }
};

export default FetchApi;

// const FetchApi= async (url, method , body = null) => {

//     const headers = {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',

//     };
//     // Add authorization header if token is available

//     const options = {
//         method: method, // e.g., 'GET', 'POST', 'PUT', 'DELETE'
//         headers,
//     };

//     if (body) {
//         options.body = JSON.stringify(body);
//     }

//     try {
//         const response = await fetch(`${baseUrl}${url}`, options)
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return await response.json();
//     } catch (error) {
//         console.error('Fetch API error:', error);
//         throw error;
//     }
// }

// export default FetchApi;