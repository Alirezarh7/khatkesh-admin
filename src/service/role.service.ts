import axiosConfig from "../baseURL/axiosConfig.ts";
import {useMutation, useQuery} from "@tanstack/react-query";

const register = async (data:{ title: string, description: string }) => {
  const response = await axiosConfig.post(`/users/back/Role/register`,data);
  return response.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register
  });
}

const permissionData = async () => {
    const response = await axiosConfig.get(`/users/back/Role/getall`);
    return response.data;
};

export const usePermissionData = () => {
    return useQuery({
        queryFn:()=>permissionData(),
        queryKey:['permissionData']
    });
};
