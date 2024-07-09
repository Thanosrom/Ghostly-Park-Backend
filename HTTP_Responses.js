/* eslint-disable no-unused-vars */
async function handleResponse(statusCode) {
  if (statusCode === 100) {
    return 'Continue';
  } else if (statusCode === 101) {
    return 'Switching Protocols';
  } else if (statusCode === 102) {
    return 'Processing';
  } else if (statusCode === 200) {
    return 'OK';
  } else if (statusCode === 201) {
    return 'Created';
  } else if (statusCode === 202) {
    return 'Accepted';
  } else if (statusCode === 204) {
    return 'No Content';
  } else if (statusCode === 300) {
    return 'Multiple Choices';
  } else if (statusCode === 301) {
    return 'Moved Permanently';
  } else if (statusCode === 302) {
    return 'Found';
  } else if (statusCode === 304) {
    return 'Not Modified';
  } else if (statusCode === 400) {
    return 'Bad Request';
  } else if (statusCode === 401) {
    return 'Unauthorized';
  } else if (statusCode === 403) {
    return 'Forbidden';
  } else if (statusCode === 404) {
    return 'Not Found';
  } else if (statusCode === 409) {
    return 'Conflict';
  } else if (statusCode === 429) {
    return 'Too Many Requests';
  } else if (statusCode === 500) {
    return 'Internal Server Error';
  } else if (statusCode === 501) {
    return 'Not Implemented';
  } else if (statusCode === 503) {
    return 'Service Unavailable';
  } else {
    throw new Error(`Unexpected status code: ${statusCode}`);
  }
}
