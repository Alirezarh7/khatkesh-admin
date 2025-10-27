import {useMutation, useQuery} from "@tanstack/react-query";
import axiosConfig from "../baseURL/axiosConfig.ts";

const getall = async () => {
  const response = await axiosConfig.get(`/users/back/User/getall`);
  return response.data;
};

export const useGetall = () => {
  return useQuery({
    queryFn:()=>getall(),
    queryKey:['getall']
  });
};

const logout = async () => {
  const response = await axiosConfig.post(`/users/app/Auth/logout`);
  return response.data;
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout
  });
}