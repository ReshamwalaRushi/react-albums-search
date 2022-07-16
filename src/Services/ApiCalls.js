import axios from "axios";

let cancel;

/**
 * This function would universally handle API errors
 *
 * @param apiOptions
 * @param multiple Parameter for axios.all request (apiOptions should be array of axios requests)
 * @returns {axios.Promise}
 * @constructor
 */

export default function MakeTheApiCall(apiOptions, multiple = false) {
  var success = (resolve, reject, response) => {
    let checkResponse = (response) => {
      if (response.status !== 200 && response.status !== 201) {
        return reject(response);
      }
    };
    if (Array.isArray(response)) {
      response.forEach((r) => {
        checkResponse(r);
      });
    } else {
      checkResponse(response);
    }
    return resolve(response);
  },
    error = (resolve, reject, err) => {
      if (err.response && err.response.status === 406) {
        return reject(err);
      }
      if (err.response && err.response.status === 403) {
        window.location.replace("forbidden");
      } else {
        // showErrorToster(err.statusText, apiOptions.method, apiOptions.url)
      }
      if (err.response && err.response.status === 401) {

      }
      return reject(err);
    };
  if (multiple) {
    return new Promise((resolve, reject) => {
      return axios
        .all(apiOptions)
        .then((response) => {
          success(resolve, reject, response);
        })
        .catch((err) => {
          error(resolve, reject, err);
        });
    });
  } else {
    return new Promise((resolve, reject) => {
      return axios(apiOptions)
        .then((response) => {
          success(resolve, reject, response);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
          } else {
            error(resolve, reject, err);
          }
        });
    });
  }
}

/**
 * Build the correct headers and options to make the API call.
 * @params url: string
 * @params method: string
 * @params data: object
 * @params authorization: bool 
 * @returns {{method: string, url: string, crossDomain: boolean, headers: {Authorization: string, Content-Type: string}, json: boolean}}
 */

export function GenerateOptions(url, method, body, apiUrl, authorization = true) {
  var token = localStorage.getItem('token')
  var options = {
    method: method,
    url: `${apiUrl}/${url}`,
    data: "",
    headers: {
      'Content-Type': 'application/json', 
    },
    json: true
  };

  if (authorization){
    options["headers"]["Authorization"] = `Bearer ${token}`
  }

  if (body) {
    options["data"] = body;
  }

  return options;
}

export function cancelRequest() {
  cancel("Operation canceled by the user.");
}