import axiosProducts from "../../baseURL/axios/axiosProducts.ts";
import {useMutation} from "@tanstack/react-query";

const createProductAPI = async (formData: FormData) => {
  const response = await axiosProducts.post(
    "/ProductsService/back/Product/Create",
    formData,
    {
      headers: {"Content-Type": "multipart/form-data"},
    }
  );
  return response.data;
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: createProductAPI,
  });
};

const editProduct = async (formData: FormData) => {
  const response = await axiosProducts.put(
    "/ProductsService/back/Product/Edit",
    formData,
    {
      headers: {"Content-Type": "multipart/form-data"},
    }
  );
  return response.data;
};

export const useEditProduct = () => {
  return useMutation({
    mutationFn: editProduct,
  });
};
