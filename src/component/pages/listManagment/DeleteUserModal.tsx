import CustomModal from "../../general/modal/Modal.tsx";
import CustomButton from "../../general/button/Button.tsx";
import {enqueueSnackbar} from "notistack";
import {useQueryClient} from "@tanstack/react-query";
import {useDeleteUser} from "../../../service/user/user.service.ts";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  editRolment: string
}

const DeleteUserModal = ({onClose, isOpen, editRolment}: IProps) => {
  const queryClient = useQueryClient();
  const {mutate} = useDeleteUser()
  const deletData = () => {
    mutate(
      editRolment,
      {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ["getAllUser"]}).then(() => {
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
      title={"حذف کاربر"}
      onDismiss={onClose}
      footerData={
        <>

          <CustomButton label={'خیر'} onClick={onClose} type={'submit'} variant='InputClass'/>
          <CustomButton label={'بله'} onClick={deletData} type={'button'} variant='Cancel'/>
        </>
      }
    >
      <div className={'w-full flex items-center justify-center  '}>
        <strong>آیا از حذف کاربر خود اطمینان دارید ؟</strong>
      </div>
    </CustomModal>
  );
};

export default DeleteUserModal;