"use client";

import { Controller, useForm } from "react-hook-form";
import CustomModal from "../../general/modal/Modal";
import CustomButton from "../../general/button/Button";
import CustomInput from "../../general/input/Input";
import CustomSelect from "../../general/select/CustomSelect";
import CustomToggle from "../../general/toggle/CustomToggle";
import RulerLoadingOverlay from "../../general/rulerLoading/RulerLoading";
import { enqueueSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateCategory } from "../../../service/product/category.service.ts";

interface IProps {
  isOpen: boolean;
  onDismiss: () => void;
  categories?: any[];
}

type CategoryForm = {
  CategoryId: number | null;
  Title: string;
  IsPublished: boolean;
  Description: string;
  MetaTitle: string;
  MetaDescription: string;
  Image?: File;
};

export default function CreateCategoryModal({
                                              isOpen,
                                              onDismiss,
                                              categories = [],
                                            }: IProps) {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
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

  const { mutate: createCategory, isPending } = useCreateCategory();

  const onSubmit = (values: CategoryForm) => {
    if (!values.Title) {
      enqueueSnackbar("عنوان وارد نشده است", { variant: "warning" });
      return;
    }

    const fd = new FormData();

    Object.entries(values).forEach(([key, val]) => {
      if (val !== null && val !== undefined && key !== "Image") {
        fd.append(key, val as any);
      }
    });

    if (values.Image) fd.append("Image", values.Image);

    createCategory(fd, {
      onSuccess: () => {
        enqueueSnackbar("دسته‌بندی با موفقیت ایجاد شد", { variant: "success" });
        queryClient.invalidateQueries({ queryKey: ["categoryTree"] });
        onDismiss();
        reset();
      },
    });
  };

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
    { name: "Description", placeholder: "توضیحات", type: "textarea" },
    { name: "MetaTitle", placeholder: "Meta Title", type: "text" },
    { name: "MetaDescription", placeholder: "Meta Description", type: "textarea" },
  ];

  return (
    <>
      <RulerLoadingOverlay open={isPending} />

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

          {/* فیلدهای داینامیک */}
          {formFields.map((f) => (
            <Controller
              key={f.name}
              control={control}
              name={f.name as keyof CategoryForm}
              render={({ field }) =>
                f.type === "select" ? (
                  <CustomSelect
                    options={f.options}
                    placeholder={f.placeholder}
                    valueID={field.value as any}
                    onChange={(val) => field.onChange(val)}
                  />
                ) : (
                  <CustomInput
                    {...field}
                    placeholder={f.placeholder}
                    isTextArea={f.type === "textarea"}
                  />
                )
              }
            />
          ))}

          {/* Image Upload */}
          <div className="col-span-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setValue("Image", e.target.files?.[0])}
            />
          </div>

          {/* Toggle */}
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
        </form>
      </CustomModal>
    </>
  );
}
