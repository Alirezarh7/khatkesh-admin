"use client";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CustomModal from "../../general/modal/Modal";
import CustomInput from "../../general/input/Input";
import CustomButton from "../../general/button/Button";
import PermissionAccordion from "../../general/permissionAccordion/PermissionAccordion";
import type { SelectedState } from "../../../types/generalType";
import { usePermissions} from "../../../service/role.service.ts";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  editRolment?: any; // داده نقش برای حالت ویرایش
}

type FormValues = {
  title: string;
  description: string;
};

const CreateAndEditRoleModal = ({ isOpen, onClose, editRolment }: IProps) => {
  console.log(editRolment)
  const [selected, setSelected] = useState<SelectedState>({});
  const { data: permissions, isLoading } = usePermissions();

  const {
    control,
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: { title: "", description: "" },
  });

  useEffect(() => {
    if (!permissions) return;

    if (editRolment?.role) {
      reset({
        title: editRolment.role.title ?? "",
        description: editRolment.role.description ?? "",
      });

      const selectedIds = new Set(editRolment.role.permissions.map((p: any) => p.id));
      const next: SelectedState = {};
      permissions.forEach((group:any) => {
        const checkedIds = group.value
          .filter((perm:any) => selectedIds.has(perm.id))
          .map((perm:any) => perm.id);
        if (checkedIds.length > 0) next[group.id] = checkedIds;
      });

      setSelected(next);
    } else {
      reset({ title: "", description: "" });
      setSelected({});
    }
  }, [editRolment, permissions, reset]);


  const payload = useMemo(() => {
    const out: Array<{ groupId: number; permissionIds: number[] }> = [];
    Object.entries(selected).forEach(([groupId, ids]) => {
      out.push({ groupId: Number(groupId), permissionIds: ids });
    });
    return out;
  }, [selected]);

  const onSubmit = (values: FormValues) => {
    const body = {
      roleId: editRolment?.id ?? 0,
      title: values.title,
      description: values.description,
      permissions: payload,
    };
    console.log("✅ ارسال به بک‌اند:", body);
  };

  return (
    <CustomModal
      isOpen={isOpen}
      title={editRolment?.role?.title? "ویرایش نقش" : "ایجاد نقش"}
      onDismiss={onClose}
      footerData={
        <>
          <CustomButton
            label="ذخیره"
            onClick={handleSubmit(onSubmit)}
            type="submit"
            variant="InputClass"
          />
          <CustomButton label="بستن" onClick={onClose} type="button" variant="Cancel" />
        </>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full grid grid-cols-1 md:grid-cols-2 mx-auto gap-3 m-2"
      >
        <div className="flex flex-col gap-2">
          <Controller
            name="title"
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomInput placeholder="عنوان نقش" value={value} onChange={onChange} />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field: { value, onChange } }) => (
              <CustomInput
                placeholder="توضیحات نقش"
                isTextArea
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        {/* 📋 مجوزها */}
        {isLoading ? (
          <div className="text-center p-5">در حال بارگذاری مجوزها...</div>
        ) : (
          <PermissionAccordion
            data={permissions ?? []}
            selected={selected}
            onChange={setSelected}
          />
        )}
      </form>
    </CustomModal>
  );
};

export default CreateAndEditRoleModal;
