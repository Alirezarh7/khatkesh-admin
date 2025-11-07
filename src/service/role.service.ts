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

export const usePermissions = () => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: async () => {
      const { data } = await axiosConfig.get("/users/back/Permission/getAll");
      const items = data.permissions.value.map((group: any) => ({
        id: group.id,
        title: group.description,
        value: group.children.map((child: any) => ({
          id: child.id,
          permision: child.description,
        })),
      }));
      return items;
    },
  });
};
const rowRoleData = async (id:number) => {
  const response = await axiosConfig.get(`/users/back/Role/Get?id=${id}`);
  return response.data;
};

export const useRowRoleData = (id:number) => {
  return useQuery({
    enabled:false,
    queryFn:()=>rowRoleData(id),
    queryKey:['rowRoleData']
  });
};


