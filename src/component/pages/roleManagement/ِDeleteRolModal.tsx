import CustomModal from "../../general/modal/Modal.tsx";
import CustomButton from "../../general/button/Button.tsx";
import {useDeleteRole} from "../../../service/user/role.service.ts";
import {enqueueSnackbar} from "notistack";
import {useQueryClient} from "@tanstack/react-query";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  editRolment: number
}

const DeleteRolModal = ({onClose, isOpen, editRolment}: IProps) => {
  const {mutate} = useDeleteRole()
  const queryClient = useQueryClient();
  const deletData = () => {
    mutate(
      {id: editRolment},
      {
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ["roleData"]}).then(() => {
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
      title={"حذف نقش"}
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

export default DeleteRolModal;