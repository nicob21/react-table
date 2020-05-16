import { RANDOM_USER_API } from "../settings/api";
import { API_CALL_FAILED } from "../constants/errors";

export const fetchGet = async (uri, api = RANDOM_USER_API) => {
  return await fetchRes("GET", uri, api);
};

export const fetchPost = (uri, body, api = RANDOM_USER_API) => {
  return fetchRes("POST", uri, api, body);
};

export const fetchPut = (uri, body, api = RANDOM_USER_API) => {
  return fetchRes("PUT", uri, api, body);
};

export const fetchDelete = (uri, body = {}, api = RANDOM_USER_API) => {
  return fetchRes("DELETE", uri, api, body);
};

const fetchRes = async (method, uri, api, body) => {
  try {
    let res = await fetch(`${api}${uri}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      timeout: 30 * 1000,
    });
    if ([200, 201, 202].includes(res.status)) {
      if (
        res.headers &&
        res.headers.get("content-type").indexOf("application/json") !== -1
      ) {
        res = await res.json();
      }
      return res;
    } else {
      throw new Error(API_CALL_FAILED);
    }
  } catch (e) {
    console.log("Fetch", e);
    throw e;
  }
};
