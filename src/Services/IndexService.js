import MakeTheApiCall, { GenerateOptions } from "./ApiCalls";

const API_URL = 'https://jsonplaceholder.typicode.com';

export const apiGetAlbums = () => {
    var options = GenerateOptions(`albums`, 'GET', null, API_URL, false);
    return MakeTheApiCall(options)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error.data;
        });
};