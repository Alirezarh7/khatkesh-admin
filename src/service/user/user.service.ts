import {useMutation, useQuery} from "@tanstack/react-query";
import type {UserFormValues} from "../../types/generalType.ts";
import {axiosUser} from "../../baseURL/axios";

const getAllUser = async () => {
  const response = await axiosUser.get(`/users/back/User/getall`);
  return response.data;
};

export const useGetall = () => {
  return useQuery({
    queryFn:()=>getAllUser(),
    queryKey:['getAllUser']
  });
};

const getRowDataForEdit = async (email:string) => {
  const response = await axiosUser.get(`/users/back/User/get?Email=${email}`);
  return response.data;
};

export const useRowDataForEdit = (email:string) => {
  return useQuery({
    enabled:false,
    queryFn:()=>getRowDataForEdit(email),
    queryKey:['getRowDataForEdit']
  });
};

const editUser = async (data:UserFormValues) => {
  const response = await axiosUser.put(`/users/back/User/Edit`,data);
  return response.data;
};

export const useEditeUser = () => {
  return useMutation({
    mutationFn: editUser
  });
}

const createUser = async (data:UserFormValues) => {
  const response = await axiosUser.post(`/users/back/User/register`,data);
  return response.data;
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser
  });
}

const DeleteUser = async (email: string) => {
  const response = await axiosUser.delete(`/users/back/User/Delete`, {
    params: { email }
  });
  return response.data;
};

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: DeleteUser,
  });
};
