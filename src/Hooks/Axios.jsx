import axios from "axios";
function Axios() {
  const apiKey = process.env.REACT_APP_API_KEY;
  console.log(apiKey, "apikey");
  const api = axios.create({
    baseURL: "https://www.googleapis.com/books/v1/",
  });
  api.interceptors.request.use(
    (config) => {
      config.params = {
        ...config.params,
        key: apiKey,
      };
      return config;
    },
    (error) => Promise.reject(error)
  );
  api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );
}

export default Axios;
