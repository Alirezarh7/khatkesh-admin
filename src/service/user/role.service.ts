import {useMutation, useQuery} from "@tanstack/react-query";
import type {RoleCreateAndEdit, RoleType} from "../../types/roleType.ts";
import {axiosUser} from "../../baseURL/axios";

const register = async (data:RoleCreateAndEdit) => {
  const response = await axiosUser.post(`/users/back/Role/Register`,data);
  return response.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register
  });
}
const EditRole = async (data:{ title: string, description: string }) => {
    const response = await axiosUser.put(`/users/back/Role/Edit`,data);
    return response.data;
};

export const useEditRole = () => {
    return useMutation({
        mutationFn: EditRole
    });
}

const DeleteRole = async (data: { id: number }) => {
  const response = await axiosUser.delete(`/users/back/Role/Delete`, {
    data, // یعنی { data: { id: ... } }
  });
  return response.data;
};

export const useDeleteRole = () => {
  return useMutation({
    mutationFn: DeleteRole,
  });
};

const roleData = async () => {
    const response = await axiosUser.get<RoleType>(`/users/back/Role/GetAll`);
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
      const { data } = await axiosUser.get("/users/back/Permission/getAll");
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
  const response = await axiosUser.get(`/users/back/Role/Get?id=${id}`);
  return response.data;
};

export const useRowRoleData = (id:number) => {
  return useQuery({
    enabled:false,
    queryFn:()=>rowRoleData(id),
    queryKey:['rowRoleData']
  });
};


