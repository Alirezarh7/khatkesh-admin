import {useMutation} from "@tanstack/react-query";
import {axiosUser} from "../baseURL/axios";

const login = async (data: {email:string,password:string}) => {
  const response = await axiosUser.post(`/users/back/Auth/login`, data);
  return response.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login
  });
};

const logout = async () => {
  const response = await axiosUser.post(`/users/back/Auth/logout`);
  return response.data;
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout
  });
}