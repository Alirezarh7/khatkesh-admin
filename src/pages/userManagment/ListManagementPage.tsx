import Breadcrumb from "../../component/general/breadCrumb/Breadcrumb.tsx";
import {useGetall} from "../../service/user.service.ts";
import DataGrid from "../../component/general/grid/DataGrid.tsx";
import {useState} from "react";
import Button from "../../component/general/button/Button.tsx";
import {useModalStore, useSetDataStore} from "../../store/modalStore.ts";
import CreateEditUserModal from "../../component/pages/listManagment/CreateEditUserModal.tsx";


const ListManagementPage = () => {
  const {data} = useGetall()
  const {setDataTypeIdsAsync, dataTypeIds} = useSetDataStore()
  const {modals, open, close} = useModalStore();
  const createEditUserModal = modals['createEditUserModal'];
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
      fullName: userData.firstName + ' ' + userData.lastName,
      email: userData.email.value,
      is_Verify: userData.is_Verify ? '✅' : '❌',
      username: userData.username.value,
      type: userData.type,
      id: userData.id,
    })) ?? [],
  }
  const onEdit = ()=>{}
  const onDelete = ()=>{}
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
      <CreateEditUserModal isOpen={createEditUserModal} onDismiss={()=>close('createEditUserModal')} />
    </>
  );
};

export default ListManagementPage;