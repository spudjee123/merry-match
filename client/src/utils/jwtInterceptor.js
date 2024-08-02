import axios from "axios";

function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });

  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (
        error.response?.status === 401 &&
        error.response?.statusText === "Unathorized"
      ) {
        window.localStorage.removeItem("token");
        window.location.replace("/home-login");
      }

      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;
