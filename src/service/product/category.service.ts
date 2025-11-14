import {useMutation, useQuery} from "@tanstack/react-query";
import axiosProducts from "../../baseURL/axios/axiosProducts.ts";

const category = async () => {
  const response = await axiosProducts.get(`/ProductsService/back/Category/GetAll`);
  return response.data;
};

export const useCategory = () => {
  return useQuery({
    queryFn: () => category(),
    queryKey: ['rowRoleData']
  });
};

const categoryDataByID = async (id: number) => {
  const response = await axiosProducts.get(`/ProductsService/back/Category/Get?id=${id}`);
  return response.data;
};

export const useCategoryDataByID = (id: number) => {
  return useQuery({
    enabled: false,
    queryFn: () => categoryDataByID(id),
    queryKey: ['categoryDataByID']
  });
};

const createCategoryAPI = async (formData: FormData) => {
  const response = await axiosProducts.post(
    "/ProductsService/back/Category/Create",
    formData,
    {
      headers: {"Content-Type": "multipart/form-data"},
    }
  );
  return response.data;
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategoryAPI,
  });
};

const EditCategory = async (formData: FormData) => {
  const response = await axiosProducts.put(
    "/ProductsService/back/Category/Edit",
    formData,
    {
      headers: {"Content-Type": "multipart/form-data"},
    }
  );
  return response.data;
};

export const useEditCategory = () => {
  return useMutation({
    mutationFn: EditCategory,
  });
};

const deleteCategory = async (Id: number) => {
  const response = await axiosProducts.delete(`/ProductsService/back/Category/delete`, {
    params: { Id }
  });
  return response.data;
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: deleteCategory,
  });
};