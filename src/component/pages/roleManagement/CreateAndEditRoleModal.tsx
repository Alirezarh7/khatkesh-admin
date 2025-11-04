import CustomModal from "../../general/modal/Modal.tsx";
import {Controller, useForm} from "react-hook-form";
import CustomInput from "../../general/input/Input.tsx";
import CustomButton from "../../general/button/Button.tsx";
import {useRegister} from "../../../service/role.service.ts";
import type {PermissionGroup, SelectedState} from "../../../types/generalType.ts";
import PermissionAccordion from "../../general/permissionAccordion/PermissionAccordion.tsx";
import {useMemo, useState} from "react";
import {enqueueSnackbar} from "notistack";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormValues = {
  title: string;
  description: string;
};
const CreateAndEditRoleModal = ({isOpen, onClose}: IProps) => {
  const [selected, setSelected] = useState<SelectedState>({});

  // تبدیل برای ارسال به بک‌اند (مثال: آرایه‌ای از { groupId, permissionId })
  const payload = useMemo(() => {
    const out: Array<{ groupId: number; permissionId: number }> = [];
    Object.entries(selected).forEach(([groupId, ids]) => {
      ids.forEach((pid) => out.push({groupId: Number(groupId), permissionId: pid}));
    });
    return out;
  }, [selected]);
  const {
    control,
    handleSubmit,
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: {title: '', description: ''},
  });
  const {mutate} = useRegister()
  const onSubmit = async (values: FormValues) => {
    console.log(values)
    console.log("payload to backend:", payload);
    mutate({title: values.title, description: values.description}, {
        onSuccess: (value) => {
            console.log(value)
            onClose()
        },
        onError: (err) => {
            console.log(err)
            enqueueSnackbar(err.message, {variant: 'error'})
        }
    })
  };
  const data: PermissionGroup[] = [
    {
      id: 1, title: "مدیریت کاربران", value: [
        {id: 1, permision: "aljfdlaf"},
        {id: 2, permision: "aaa"},
        {id: 3, permision: "ddd"},
        {id: 4, permision: "fff"},
      ]
    },
    {
      id: 2, title: "مدیریت نوشته‌ها", value: [
        {id: 1, permision: "poikl"},
        {id: 2, permision: "zxcv"},
        {id: 3, permision: "uik"},
        {id: 4, permision: "qwer"},
      ]
    },
    {
      id: 3, title: "مدیریت محصولات", value: [
        {id: 1, permision: "777"},
        {id: 2, permision: "98"},
        {id: 3, permision: "32"},
        {id: 4, permision: "120"},
      ]
    },
    {
      id: 4, title: "مدیریت تخفیف‌ها", value: [
        {id: 1, permision: "55"},
        {id: 2, permision: "66"},
        {id: 3, permision: "44"},
        {id: 4, permision: "258"},
      ]
    },
  ];

  return (
    <CustomModal isOpen={isOpen} title={'ایجاد نقش'}
                 footerData={
                   <>
                     <CustomButton label={'ذخیره'} onClick={handleSubmit(onSubmit)} type={'submit'}
                                   variant='InputClass'/>
                     <CustomButton label={'بستن'} onClick={onClose} type={'button'} variant='Cancel'/>
                   </>
                 }
                 onDismiss={onClose}>

      <form onSubmit={handleSubmit(onSubmit)} className={'w-full grid grid-cols-1 md:grid-cols-2 mx-auto gap-3 m-2'}>
        <div className={'flex flex-col gap-2'}>
          <Controller name={'title'} control={control} render={({field: {value, onChange}}) => (
            <CustomInput placeholder={'عنوان'} value={value} onChange={onChange}/>)}
          />
          <Controller name={'description'} control={control} render={({field: {value, onChange}}) => (
            <CustomInput placeholder={'دوره'} isTextArea={true} value={value}
                         onChange={onChange}/>)}
          />
        </div>
        <PermissionAccordion
          data={data}
          selected={selected}
          onChange={setSelected}
        />
      </form>
    </CustomModal>
  );
};

export default CreateAndEditRoleModal;