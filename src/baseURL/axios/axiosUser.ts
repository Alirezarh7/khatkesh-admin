import axios from "axios";
import { baseUrls } from "../baseURL";
import { setupInterceptors } from "./axiosInterceptors";

const axiosUser = axios.create({
  baseURL: baseUrls.userManagementPanel,
});

setupInterceptors(axiosUser);

export default axiosUser;
