import CustomModal from "../../general/modal/Modal.tsx";
import CustomButton from "../../general/button/Button.tsx";
import {enqueueSnackbar} from "notistack";
import {useQueryClient} from "@tanstack/react-query";
import {useDeleteCategory} from "../../../service/product/category.service.ts";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  editRolment: number
}

const DeletedCategory = ({onClose, isOpen, editRolment}: IProps) => {
  const {mutate} = useDeleteCategory()
  const queryClient = useQueryClient();
  const deletData = () => {
    mutate(
      editRolment,
      {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ["rowRoleData"]}).then(() => {
            enqueueSnackbar("حذف با موفقیت انجام شد", {variant: "success"});
            onClose();
          })
        },
        onError: () => {
          enqueueSnackbar("حذف با خطا مواجه شد", {variant: "error"});
        },
      }
    );
  };

  return (
    <CustomModal
      isOpen={isOpen}
      title={"حذف دسته"}
      onDismiss={onClose}
      footerData={
        <>

          <CustomButton label={'خیر'} onClick={onClose} type={'submit'} variant='InputClass'/>
          <CustomButton label={'بله'} onClick={deletData} type={'button'} variant='Cancel'/>
        </>
      }
    >
      <div className={'w-full flex items-center justify-center  '}>
        <strong>آیا از حذف ایتم خود اطمینان دارید ؟</strong>
      </div>
    </CustomModal>
  );
};

export default DeletedCategory;