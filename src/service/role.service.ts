import axiosConfig from "../baseURL/axiosConfig.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import type {RoleType} from "../types/roleType.ts";

const register = async (data:{ title: string, description: string }) => {
  const response = await axiosConfig.post(`/users/back/Role/register`,data);
  return response.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register
  });
}

const roleData = async () => {
    const response = await axiosConfig.get<RoleType>(`/users/back/Role/GetAll`);
    return response.data;
};

export const useRole = () => {
    return useQuery({
        queryFn:()=>roleData(),
        queryKey:['roleData']
    });
};


