import Breadcrumb from "../../component/general/breadCrumb/Breadcrumb.tsx";
import {useGetall, useRowDataForEdit} from "../../service/user.service.ts";
import DataGrid from "../../component/general/grid/DataGrid.tsx";
import {useState} from "react";
import Button from "../../component/general/button/Button.tsx";
import {useModalStore, useSetDataStore} from "../../store/modalStore.ts";
import CreateEditUserModal from "../../component/pages/listManagment/CreateEditUserModal.tsx";
import DeleteUserModal from "../../component/pages/listManagment/DeleteUserModal.tsx";


const ListManagementPage = () => {
  const {data} = useGetall()
  const {setDataTypeIdsAsync, dataTypeIds} = useSetDataStore()
  const {modals, open, close} = useModalStore();
  const {refetch:rowDataForEditRefetch}=useRowDataForEdit(dataTypeIds)
  const createEditUserModal = modals['createEditUserModal'];
  const deleteUserModal = modals['deleteUserModal'];
  const headData = [
    {title: "اسم", key: "fullName"},
    {title: "ایمیل", key: "email"},
    {title: "تایید ایمیل", key: "is_Verify"},
    {title: "شماره موبایل", key: "username"},
    {title: "نقش", key: "type"},
  ];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const bodyData = {
    item: data?.users.value?.map((userData: any) => ({
      fullName: userData?.firstName + ' ' + userData.lastName,
      email: userData?.email,
      is_Verify: userData?.is_Verify ? '✅' : '❌',
      username: userData?.username,
      type: userData?.type,
      id: userData?.id,
    })) ?? [],
  }
  const onEdit = (data:any)=>{
    setDataTypeIdsAsync(data.email).then(()=>{
      rowDataForEditRefetch().then((value)=>{
        setDataTypeIdsAsync(value.data).then(()=>{
          open('createEditUserModal')
        })
      })
    })
  }
  const onDelete = (data:any)=>{
    setDataTypeIdsAsync(data.email).then(()=>{
      open('deleteUserModal')
    })
  }
  return (
    <>
      <Breadcrumb />
      <div className={' shadow-lg p-2'}>
        <div className={'w-full flex justify-between items-center  '}>
          <div className={'max-w-32 '}>
            <Button variant={"glass"} onClick={() => setDataTypeIdsAsync([]).then(() => {
              open('createEditUserModal')
            })}
                    label={'ایجاد کاربر'}
                    type={'button'}/>
          </div>
        </div>

        <DataGrid setCurrentPage={setCurrentPage} currentPage={currentPage} bodyData={bodyData} headData={headData} onEdit={onEdit} onDelete={onDelete}/>
      </div>
      <CreateEditUserModal isOpen={createEditUserModal} editUser={dataTypeIds} onDismiss={()=>close('createEditUserModal')} />
      <DeleteUserModal editRolment = {dataTypeIds}  isOpen={deleteUserModal} onClose={() => close('deleteUserModal')}  />
    </>
  );
};

export default ListManagementPage;