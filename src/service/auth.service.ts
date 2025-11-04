import {useMutation} from "@tanstack/react-query";
import axiosConfig from "../baseURL/axiosConfig.ts";

const login = async (data: {email:string,password:string}) => {
  const response = await axiosConfig.post(`/users/back/Auth/login`, data);
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login
  });
};

const logout = async () => {
  const response = await axiosConfig.post(`/users/back/Auth/logout`);
  return response.data;
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout
  });
}