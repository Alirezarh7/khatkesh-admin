import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import CustomModal from "../../general/modal/Modal";
import CustomInput from "../../general/input/Input";
import CustomButton from "../../general/button/Button";
import RulerLoadingOverlay from "../../general/rulerLoading/RulerLoading";
import CustomSelect from "../../general/select/CustomSelect";
import CustomToggle from "../../general/toggle/CustomToggle";
import { useCreateUser, useEditeUser } from "../../../service/user.service";
import { UserType } from "../../../data/GeneralData";
import { useRole } from "../../../service/role.service";
import type {UserFormValues} from "../../../types/generalType.ts";

interface IProps {
  isOpen: boolean;
  onDismiss: () => void;
  editUser?: any;
}
const CreateEditUserModal = ({ isOpen, onDismiss, editUser }: IProps) => {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormValues>({
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password_confirm: "",
      username: "",
      userType: "User",
      role: "",
      is_Verify: true,
    },
  });

  const { mutate: createUser, isPending: createPending } = useCreateUser();
  const { mutate: updateUser, isPending: updatePending } = useEditeUser();
  const { data: roleData } = useRole();

  // map roles to select options
  const roleOptions =
    roleData?.roles?.value?.map((r: any) => ({
      value: r.id,
      label: r.title,
    })) ?? [];

  useEffect(() => {
    if (editUser) {
      reset({
        firstName: editUser.firstName ?? "",
        lastName: editUser.lastName ?? "",
        email: editUser.email ?? "",
        username: editUser.username ?? "",
        userType: editUser.userType ?? "",
        role: editUser.role ?? "",
        is_Verify: editUser.is_Verify ?? true,
        password: "",
        password_confirm: "",
      });
    } else {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password_confirm: "",
        username: "",
        userType: "",
        role: "",
        is_Verify: false,
      });
    }
  }, [editUser, reset]);

  const onSubmit = (values: UserFormValues) => {
    if (!values.firstName) {
      enqueueSnackbar("نام وارد نشده است", { variant: "warning" });
      return;
    }
    if (!values.lastName) {
      enqueueSnackbar("نام خانوادگی وارد نشده است", { variant: "warning" });
      return;
    }
    if (!values.email) {
      enqueueSnackbar("ایمیل وارد نشده است", { variant: "warning" });
      return;
    }
    if (!editUser && !values.password) {
      enqueueSnackbar("رمز عبور وارد نشده است", { variant: "warning" });
      return;
    }
    if (values.password !== values.password_confirm) {
      enqueueSnackbar("رمز عبور و تکرار آن یکسان نیست!", {
        variant: "warning",
      });
      return;
    }
    if (!values.role) {
      enqueueSnackbar("نقش کاربر وارد نشده است", {
        variant: "warning",
      });
      return;
    }

    const body = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      password_confirm: values.password_confirm,
      username: values.username,
      userType: values.userType,
      role: Number(values.role),
      is_Verify: Boolean(values.is_Verify),
    };

    if (editUser?.id) {
      updateUser(body,
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getAllUser"] }).then(() => {
              enqueueSnackbar("کاربر با موفقیت ویرایش شد", {
                variant: "success",
              });
              onDismiss();
            });
          },
        }
      );
    } else {
      createUser(body, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getAllUser"] }).then(() => {
            enqueueSnackbar("کاربر با موفقیت ایجاد شد", {
              variant: "success",
            });
            onDismiss();
          });
        },
      });
    }

    console.log("✅ payload نهایی برای بک‌اند:", body);
  };

  const loading = createPending || updatePending;

  // فیلدهای متنی / سلکت (به جز is_Verify)
  const fields: {
    name: Exclude<keyof UserFormValues, "is_Verify">;
    placeholder: string;
    type?: string;
    options?: { value: string | number; label: string }[];
  }[] = [
    { name: "firstName", placeholder: "نام" },
    { name: "lastName", placeholder: "نام خانوادگی" },
    { name: "email", placeholder: "ایمیل", type: "email" },
    { name: "username", placeholder: "شماره موبایل" },
    { name: "userType", placeholder: "نوع کاربر", options: UserType },
    { name: "role", placeholder: "نقش کاربر", options: roleOptions },
    { name: "password", placeholder: "رمز عبور", type: "password" },
    {
      name: "password_confirm",
      placeholder: "تکرار رمز عبور",
      type: "password",
    },
  ];

  return (
    <>
      <RulerLoadingOverlay open={loading} />

      <CustomModal
        isOpen={isOpen}
        title={editUser ? "ویرایش کاربر" : "ایجاد کاربر"}
        onDismiss={onDismiss}
        footerData={
          <>
            <CustomButton
              label={editUser ? "ذخیره تغییرات" : "ایجاد کاربر"}
              onClick={handleSubmit(onSubmit)}
              type="submit"
              variant="InputClass"
            />
            <CustomButton
              label="بستن"
              onClick={onDismiss}
              type="button"
              variant="Cancel"
            />
          </>
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full grid grid-cols-2 gap-3 m-2"
        >
          {fields.map((f) => (
            <div key={f.name as string} className="flex flex-col gap-1">
              <Controller
                control={control}
                name={f.name}
                render={({ field }) =>
                  f.options ? (
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
                      type={f.type as any}
                    />
                  )
                }
              />
              {errors[f.name] && (
                <p className="text-red-500 text-xs mt-1">
                  {(errors[f.name]?.message as string) || ""}
                </p>
              )}
            </div>
          ))}

          {/* سوییچ فعال/غیرفعال بودن */}
          <div className="flex items-center gap-2 col-span-2">
            <Controller
              control={control}
              name="is_Verify"
              render={({ field }) => (
                <CustomToggle
                  label="کاربر فعال باشد"
                  checked={!!field.value}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            />
          </div>
        </form>
      </CustomModal>
    </>
  );
};

export default CreateEditUserModal;
