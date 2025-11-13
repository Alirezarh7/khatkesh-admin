import {useMutation, useQuery} from "@tanstack/react-query";
import axiosProducts from "../../baseURL/axios/axiosProducts.ts";

const category = async () => {
  const response = await axiosProducts.get(`/ProductsService/back/Category/GetAll`);
  return response.data;
};

export const useCategory = () => {
  return useQuery({
    queryFn:()=>category(),
    queryKey:['rowRoleData']
  });
};

const createCategoryAPI = async (formData: FormData) => {
  const response = await axiosProducts.post(
    "/ProductsService/back/Category/Create",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data;
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategoryAPI,
  });
};