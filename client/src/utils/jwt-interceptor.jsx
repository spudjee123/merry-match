import axios from "axios";

function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers = {
        ...req.headers,
        authorization: `Bearer ${token}`,
      };
    }

    return req;
  });

  axios.interceptors.response.use(
    (req) => {
      return req;
    },
    (error) => {
      if (
        error.response?.status === 401 &&
        error.response?.statatusText === "Unauthorized"
      ) {
        localStorage.removeItem("token");
        localStorage.replace("/");
      }
      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;
