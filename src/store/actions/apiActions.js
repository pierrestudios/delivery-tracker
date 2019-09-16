import { apiGetRequest, apiPostRequest } from "../../common/api";

export async function retrieve(entity, userToken = "") {
  if (!userToken) {
    return null;
  }

  return await apiGetRequest(entity, userToken).catch(() => null);
}

export async function save(entity, data, userToken = "") {
  if (!userToken) {
    return null;
  }

  return await apiPostRequest(entity, data, userToken).catch(() => null);
}
