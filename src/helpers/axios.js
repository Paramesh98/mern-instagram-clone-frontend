import axios from "axios";

const AxiosInstance = axios.create({
  // baseURL: "http://localhost:8080/",
  baseURL: "https://instagram-clone-backend98.herokuapp.com/",
});

export default AxiosInstance;
