"use client";
import {useEffect, useMemo, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import CustomModal from "../../general/modal/Modal";
import CustomInput from "../../general/input/Input";
import CustomButton from "../../general/button/Button";
import PermissionAccordion from "../../general/permissionAccordion/PermissionAccordion";
import type {SelectedState} from "../../../types/generalType";
import {useEditRole, usePermissions, useRegister} from "../../../service/role.service.ts";
import {enqueueSnackbar} from "notistack";
import RulerLoadingOverlay from "../../general/rulerLoading/RulerLoading.tsx";
import {useQueryClient} from "@tanstack/react-query";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    editRolment?: any; // داده نقش برای حالت ویرایش
}

type FormValues = {
    title: string;
    description: string;
};

const CreateAndEditRoleModal = ({isOpen, onClose, editRolment}: IProps) => {

    const [selected, setSelected] = useState<SelectedState>({});
    const {data: permissions, isLoading} = usePermissions();
    const {mutate: RegisterMutate, isPending: RegisterPending} = useRegister();
    const {mutate: EditRoleMutate, isPending: EditRolePending} = useEditRole();
    const queryClient = useQueryClient();

    const {
        control,
        handleSubmit,
        reset,
        watch,
    } = useForm<FormValues>({
        mode: "onTouched",
        defaultValues: {title: "", description: ""},
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
            permissions.forEach((group: any) => {
                const checkedIds = group.value
                    .filter((perm: any) => selectedIds.has(perm.id))
                    .map((perm: any) => perm.id);
                if (checkedIds.length > 0) next[group.id] = checkedIds;
            });

            setSelected(next);
        } else {
            reset({title: "", description: ""});
            setSelected({});
        }
    }, [editRolment, permissions, reset]);


    const permissionIds = useMemo(() => {
        const out: number[] = [];
        Object.values(selected).forEach((ids) => {
            out.push(...ids);         // همه رو می‌ریزیم تو یه آرایه
        });
        return out;
    }, [selected]);

    const onSubmit = (values: FormValues) => {
        if (!watch("title")) {
            enqueueSnackbar("عنوان نقش وارد نشده است", { variant: "warning" });
            return;
        }
        if (!watch("description")) {
            enqueueSnackbar("توضیحات نقش وارد نشده است", { variant: "warning" });
            return;
        }
        if (permissionIds.length === 0) {
            enqueueSnackbar("دسترسی وارد نشده است", { variant: "warning" });
            return;
        }
        const body = {
            title: values.title,
            description: values.description,
            permissionIds,
        };
        if (editRolment?.role?.id) {
            EditRoleMutate(Object.assign(body, {roleId: editRolment?.role?.id}),{onSuccess:()=>{
                    queryClient.invalidateQueries({queryKey: ['roleData']}).then(() => {
                        enqueueSnackbar('اپدیت با موقعیت انجام شد', { variant: "success" })
                        onClose()
                    })
                }});
        } else {
            RegisterMutate(body,{onSuccess:()=>{
                    queryClient.invalidateQueries({queryKey: ['roleData']}).then(() => {
                        enqueueSnackbar('نقش با موقعیت اضافه شد', { variant: "success" });
                        onClose()
                    })
                }});
        }

        console.log("✅ ارسال به بک‌اند:", body);
    };



    return (
        <>
            <RulerLoadingOverlay open={ RegisterPending || EditRolePending } />
            <CustomModal
                isOpen={isOpen}
                title={editRolment?.role?.title ? "ویرایش نقش" : "ایجاد نقش"}
                onDismiss={onClose}
                footerData={
                    <>
                        <CustomButton
                            label="ذخیره"
                            onClick={handleSubmit(onSubmit)}
                            type="submit"
                            variant="InputClass"
                        />
                        <CustomButton label="بستن" onClick={onClose} type="button" variant="Cancel"/>
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
                            render={({field: {value, onChange}}) => (
                                <CustomInput placeholder="عنوان نقش" value={value} onChange={onChange}/>
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            render={({field: {value, onChange}}) => (
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
        </>
    );
};

export default CreateAndEditRoleModal;
