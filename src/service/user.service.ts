import {useMutation, useQuery} from "@tanstack/react-query";
import axiosConfig from "../baseURL/axiosConfig.ts";
import type {UserFormValues} from "../types/generalType.ts";

const getAllUser = async () => {
  const response = await axiosConfig.get(`/users/back/User/getall`);
  return response.data;
};

export const useGetall = () => {
  return useQuery({
    queryFn:()=>getAllUser(),
    queryKey:['getAllUser']
  });
};

const editUser = async (data:UserFormValues) => {
  const response = await axiosConfig.post(`/users/back/User/Edit`,data);
  return response.data;
};

export const useEditeUser = () => {
  return useMutation({
    mutationFn: editUser
  });
}

const createUser = async (data:UserFormValues) => {
  const response = await axiosConfig.post(`/users/back/User/register`,data);
  return response.data;
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser
  });
}