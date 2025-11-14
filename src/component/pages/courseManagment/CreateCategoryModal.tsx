"use client";

import { Controller, useForm ,} from "react-hook-form";
import CustomModal from "../../general/modal/Modal";
import CustomButton from "../../general/button/Button";
import CustomInput from "../../general/input/Input";
import CustomSelect from "../../general/select/CustomSelect";
import CustomToggle from "../../general/toggle/CustomToggle";
import RulerLoadingOverlay from "../../general/rulerLoading/RulerLoading";
import { useQueryClient } from "@tanstack/react-query";
import {useCreateCategory, useEditCategory} from "../../../service/product/category.service.ts";
import RichTextEditor from "../../general/RichTextEditor/RichTextEditor.tsx";
import UploadingFile from "../../general/UploadingFile/UploadingFile.tsx";
import {useEffect} from "react";
import {enqueueSnackbar} from "notistack";
import {baseUrls} from "../../../baseURL/baseURL.ts";

interface IProps {
  isOpen: boolean;
  onDismiss: () => void;
  categories?: any[];
  editData?: any;   // 🟩 اضافه شد
}

type CategoryForm = {
  CategoryId: number | null;
  Title: string;
  IsPublished: boolean;
  Description: string;
  MetaTitle: string;
  MetaDescription: string;
  Image?: File|null;
};

export default function CreateCategoryModal({
                                              isOpen,
                                              editData,
                                              onDismiss,
                                              categories = [],
                                            }: IProps) {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm<CategoryForm>({
    mode: "onTouched",
    defaultValues: {
      CategoryId: null,
      Title: "",
      IsPublished: true,
      Description: "",
      MetaTitle: "",
      MetaDescription: "",
      Image: undefined,
    },
  });

  useEffect(() => {
    if (editData) {
      reset({
        CategoryId: editData.categoryId,
        Title: editData.title,
        IsPublished: editData.isPublished,
        Description: editData.description,
        MetaTitle: editData.metaTitle,
        MetaDescription: editData.metaDescription,
        Image: null, // چون file واقعی نداریم
      });
    } else {
      reset(); // حالت ایجاد
    }
  }, [editData, reset]);



  const { mutate: createCategory, isPending: creating } = useCreateCategory();
  const { mutate: editCategory, isPending: editing } = useEditCategory();

  const onSubmit = (values: CategoryForm) => {
    const fd = new FormData();

    // همه فیلدها به جز تصویر
    Object.entries(values).forEach(([key, val]) => {
      if (key !== "Image" && val !== undefined && val !== null) {
        fd.append(key, val as any);
      }
    });

    // در حالت ادیت → ID هم بفرست
    if (editData?.id) {
      fd.append("Id", editData.id);
    }

    // اگر تصویر جدید آپلود شده باشد
    if (values.Image instanceof File) {
      fd.append("Image", values.Image);
    }

    // فراخوانی API بر اساس حالت
    if (editData?.id) {
      editCategory(fd, {
        onSuccess: () => {
          enqueueSnackbar("با موفقیت ویرایش شد", { variant: "success" });
          queryClient.invalidateQueries({ queryKey: ["categoryTree"] });
          onDismiss();
          reset();
        }
      });
    } else {
      createCategory(fd, {
        onSuccess: () => {
          enqueueSnackbar("با موفقیت ایجاد شد", { variant: "success" });
          queryClient.invalidateQueries({ queryKey: ["categoryTree"] });
          onDismiss();
          reset();
        }
      });
    }
  };

  const previousImage =
    editData?.imageUrl ? `${baseUrls.productsService}${editData.imageUrl}` : null;
  console.log(previousImage)
  // --- ساخت Select والد ---
  const buildCategoryOptions = (cats: any[], level = 0): any[] => {
    let result: any[] = [];

    cats?.forEach((cat) => {
      result.push({
        value: cat.id,
        label: `${"— ".repeat(level)}${cat.title}`,
      });

      if (cat.children?.length > 0) {
        result = result.concat(buildCategoryOptions(cat.children, level + 1));
      }
    });

    return result;
  };

  const categoryOptions = buildCategoryOptions(categories);

  // --- تعریف فیلدهای فرم به‌صورت داینامیک ---
  const formFields = [
    {
      name: "CategoryId",
      placeholder: "والد (اختیاری)",
      type: "select",
      options: categoryOptions,
    },
    { name: "Title", placeholder: "عنوان", type: "text" },
    { name: "MetaTitle", placeholder: "Meta Title", type: "text" },
    { name: "MetaDescription", placeholder: "Meta Description", type: "textarea" },
    { name: "Description", placeholder: "توضیحات", type: "editor" },
  ];

  return (
    <>
      <RulerLoadingOverlay open={creating||editing} />

      <CustomModal
        isOpen={isOpen}
        title="ایجاد دسته‌بندی"
        onDismiss={onDismiss}
        footerData={
          <>
            <CustomButton
              label="ایجاد دسته‌بندی"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              variant="InputClass"
            />
            <CustomButton label="بستن" onClick={onDismiss} variant="Cancel" />
          </>
        }
      >
        <form className="w-full grid grid-cols-2 gap-3 m-2">
          <div className="col-span-2">
            <Controller
              control={control}
              name="IsPublished"
              render={({ field }) => (
                <CustomToggle
                  label="انتشار شود؟"
                  checked={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          {/* فیلدهای داینامیک */}
          {formFields.map((f) => (
            <>
            <Controller
              key={f.name}
              control={control}
              name={f.name as keyof CategoryForm}
              render={({ field }) => {
                if (f.type === "select") {
                  return (
                    <CustomSelect
                      options={f.options}
                      placeholder={f.placeholder}
                      valueID={field.value as any}
                      onChange={(val) => field.onChange(val)}
                    />
                  );
                }
                if (f.type === "editor") {
                  return (
                    <div className="col-span-2">
                      <RichTextEditor
                        label={f.placeholder}
                        value={String(field.value || "")}
                        onChange={field.onChange}
                      />
                    </div>
                  );
                }
                return (
                  <CustomInput
                    {...field}
                    placeholder={f.placeholder}
                    isTextArea={f.type === "textarea"}
                  />
                );
              }}
            />

            </>
          ))}
          <div className="col-span-2">
            <UploadingFile
              title="آپلود تصویر"
              value={watch("Image") || null}
              onChange={(file:File|null) => setValue("Image", file)}
              previewUrl={previousImage}   // 🟩 جدید
            />
          </div>
        </form>
      </CustomModal>
    </>
  );
}
