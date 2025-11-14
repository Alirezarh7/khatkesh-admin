"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import CustomModal from "../../general/modal/Modal";
import CustomButton from "../../general/button/Button";
import CustomInput from "../../general/input/Input";
import CustomSelect from "../../general/select/CustomSelect";
import RulerLoadingOverlay from "../../general/rulerLoading/RulerLoading";
import RichTextEditor from "../../general/RichTextEditor/RichTextEditor";
import UploadingFile from "../../general/UploadingFile/UploadingFile";

import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

import { useCreateProduct, useEditProduct } from "../../../service/product/product.service";
import type { ProductForm } from "../../../types/generalType";
import { baseUrls } from "../../../baseURL/baseURL";

interface IProps {
  isOpen: boolean;
  onDismiss: () => void;
  categories?: any[];
  editData?: any | null; // دیتا برای ویرایش
}

export default function CreateProductModal({
                                             isOpen,
                                             onDismiss,
                                             categories = [],
                                             editData,
                                           }: IProps) {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<ProductForm>({
    mode: "onTouched",
    defaultValues: {
      Title: "",
      CategoryId: null,
      TitleEn: "",
      Description: "",
      ShortDescription: "",
      MetaTitle: "",
      MetaDescription: "",
      ImageAlt: null,
      Image: null,
      Images: null,
      SubCategoryIds: [],
      Prices: {
        id: 0,
        priceValue: 0,
        discountPercent: 0,
        discountPrice: 0,
        stock: 0,
      },
    },
  });

  // 🟦 حالت EDIT → پر کردن فرم
  useEffect(() => {
    if (editData) {
      reset({
        Title: editData.title,
        CategoryId: editData.categoryId,
        TitleEn: editData.titleEn,
        Description: editData.description,
        ShortDescription: editData.shortDescription,
        MetaTitle: editData.metaTitle,
        MetaDescription: editData.metaDescription,
        ImageAlt: null,
        Image: null,
        Images: null,
        SubCategoryIds: editData.subCategoryIds ?? [],
        Prices: editData.prices,
      });
    } else {
      reset();
    }
  }, [editData, reset]);

  const { mutate: createProduct, isPending: creating } = useCreateProduct();
  const { mutate: editProduct, isPending: editing } = useEditProduct();

  const onSubmit = (values: ProductForm) => {
    const fd = new FormData();

    Object.entries(values).forEach(([key, val]) => {
      if (key === "Prices") {
        fd.append("Prices", JSON.stringify(val));
      } else if (key !== "Image" && key !== "Images") {
        fd.append(key, val as any);
      }
    });

    if (values.Image instanceof File) fd.append("Image", values.Image);
    if (values.Images instanceof File) fd.append("Images", values.Images);

    if (editData?.id) fd.append("Id", editData?.id);

    if (editData?.id) {
      editProduct(fd, {
        onSuccess: () => {
          enqueueSnackbar("محصول با موفقیت ویرایش شد", { variant: "success" });
          queryClient.invalidateQueries({ queryKey: ["productList"] });
          onDismiss();
          reset();
        },
      });
    } else {
      createProduct(fd, {
        onSuccess: () => {
          enqueueSnackbar("محصول با موفقیت ایجاد شد", { variant: "success" });
          queryClient.invalidateQueries({ queryKey: ["productList"] });
          onDismiss();
          reset();
        },
      });
    }
  };

  // عکس قبلی
  const previousImage = editData?.imageUrl
    ? `${baseUrls.productsService}${editData.imageUrl}`
    : null;

  const categoryOptions = categories.map((x) => ({
    value: x.id,
    label: x.title,
  }));

  return (
    <>
      <RulerLoadingOverlay open={creating || editing} />

      <CustomModal
        isOpen={isOpen}
        title={editData ? "ویرایش محصول" : "ایجاد محصول"}
        onDismiss={onDismiss}
        footerData={
          <>
            <CustomButton
              label={editData ? "ویرایش" : "ایجاد محصول"}
              type="submit"
              onClick={handleSubmit(onSubmit)}
              variant="InputClass"
            />
            <CustomButton label="بستن" onClick={onDismiss} variant="Cancel" />
          </>
        }
      >
        <form className="w-full grid grid-cols-2 gap-4 p-3">

          {/* عنوان فارسی */}
          <Controller
            control={control}
            name="Title"
            render={({ field }) => (
              <CustomInput {...field} placeholder="عنوان محصول" />
            )}
          />

          {/* عنوان انگلیسی */}
          <Controller
            control={control}
            name="TitleEn"
            render={({ field }) => (
              <CustomInput {...field} placeholder="Title En" />
            )}
          />

          {/* انتخاب دسته */}
          <Controller
            control={control}
            name="CategoryId"
            render={({ field }) => (
              <CustomSelect
                options={categoryOptions}
                placeholder="انتخاب دسته"
                valueID={field.value as any}
                onChange={field.onChange}
              />
            )}
          />

          {/* توضیحات */}
          <div className="col-span-2">
            <Controller
              control={control}
              name="Description"
              render={({ field }) => (
                <RichTextEditor
                  label="توضیحات"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          {/* توضیح کوتاه */}
          <div className="col-span-2">
            <Controller
              control={control}
              name="ShortDescription"
              render={({ field }) => (
                <RichTextEditor
                  label="توضیح کوتاه"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          {/* قیمت‌ها */}
          <div className="col-span-2 grid grid-cols-2 gap-2 border p-3 rounded">
            <p className="font-bold">مشخصات قیمت</p>

            <Controller
              control={control}
              name="Prices.priceValue"
              render={({ field }) => (
                <CustomInput {...field} placeholder="قیمت" type="number" />
              )}
            />

            <Controller
              control={control}
              name="Prices.discountPercent"
              render={({ field }) => (
                <CustomInput {...field} placeholder="درصد تخفیف" type="number" />
              )}
            />

            <Controller
              control={control}
              name="Prices.stock"
              render={({ field }) => (
                <CustomInput {...field} placeholder="موجودی" type="number" />
              )}
            />
          </div>

          {/* آپلود تصویر اصلی */}
          <div className="col-span-2">
            <UploadingFile
              title="تصویر اصلی"
              value={watch("Image")}
              onChange={(file) => setValue("Image", file)}
              previewUrl={previousImage}
            />
          </div>

        </form>
      </CustomModal>
    </>
  );
}
