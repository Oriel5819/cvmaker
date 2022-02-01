import axios from "axios";

// const BASE_URL= `http://10.210.210.16:3005`
const BASE_URL = `http://localhost:3005`;

export default axios.create({
  baseURL: BASE_URL,
});
