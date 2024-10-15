import axios from "axios"

const CallApi = async (method, url, body) => {
    var config = {
        method: method,
        url: url,
        body: body
    }
    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        throw error
    }
}

export default CallApi;