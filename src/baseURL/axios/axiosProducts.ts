import axios from "axios";
import { baseUrls } from "../baseURL";
import { setupInterceptors } from "./axiosInterceptors";

const axiosProducts = axios.create({
  baseURL: baseUrls.productsService,
});

setupInterceptors(axiosProducts);

export default axiosProducts;
