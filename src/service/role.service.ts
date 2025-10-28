import axiosConfig from "../baseURL/axiosConfig.ts";
import {useMutation} from "@tanstack/react-query";

const register = async (data:{ title: string, description: string }) => {
  const response = await axiosConfig.post(`/users/back/Role/register`,data);
  return response.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register
  });
}