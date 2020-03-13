import Axios from "axios";

async function GET(path, request, pathParams) {
    const response = await Axios.get(path + pathParams, request);
    return response;
}
  
async function POST(path, data) {
    try {
        const response = await Axios.post(path, data);
        console.log('message of response in socket.js is:', response)
        return response;
    } catch {
        console.log('Exception Catched in POST')
        return 400
    }
}
  
async function DELETE(path) {
    const response = await Axios.delete(path);
    return response;
}



export default {
    GET,
    POST,
    DELETE
};
  