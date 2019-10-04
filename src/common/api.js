const { REACT_APP_API_URL: API_URL } = process.env;

const apiRequest = async (url, data, type = "GET", headerData = undefined) => {
  return (
    fetch(API_URL + url, {
      method: data ? "POST" : type,
      headers: {
        ...headerData,
        Origin: API_URL.substring(0, API_URL.length - 1),
        "Content-Type": "application/json"
      },
      body: data ? JSON.stringify(data) : undefined // Fix for Edge "TypeMismatchError"
    })
      .then(async res => {
        if (!res.ok) {
          return Promise.reject(res.statusText || "Code: " + res.status);
        }

        // catch HTTP Errors
        if (!res.ok) {
          return res
            .json()
            .then(json => {
              return Promise.reject(json.error);
            })
            .catch(E => {
              console.log("E", E);
              return Promise.reject(E || res.statusText);
            });
        }

        return res.json();
      })
      .then(Response => {
        if ("error" in Response) {
          if (Response.error && typeof Response.error === "string") {
            return Promise.reject(Response.error);
          }

          if (
            typeof Response.error === "object" &&
            "email" in Response.error &&
            !!Response.error.email.length
          ) {
            return Promise.reject(Response.error.email[0]);
          }

          if (
            typeof Response.error === "object" &&
            "password" in Response.error &&
            !!Response.error.password.length
          ) {
            return Promise.reject(Response.error.password[0]);
          }
        }

        return Response;
      })
      // Check for new Token
      .then(json => {
        if (json.token) return { data: { token: json.token } };
        return json;
      })
      .then(json => json.data)
      .catch(e => {
        console.log("Api > catch() Error", e);

        return Promise.reject(e);
      })
  );
};

export const apiGetRequest = async (url, token) => {
  return await apiRequest("api/" + url, null, "GET", {
    Authorization: "Bearer " + token
  });
};

export const apiPostRequest = async (url, data, token) => {
  return await apiRequest(
    "api/" + url,
    data,
    "POST",
    token ? { Authorization: "Bearer " + token } : undefined
  );
};

export const apiUnAuthPost = async (url, data) => {
  return await apiRequest("auth/" + url, data, "POST");
};
