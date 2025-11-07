import Breadcrumb from "../../component/general/breadCrumb/Breadcrumb.tsx";
import DataSummary from "../../component/general/card/DataSummary.tsx";
import Button from "../../component/general/button/Button.tsx";
import {useModalStore, useSetDataStore} from "../../store/modalStore.ts";
import CreateAndEditRoleModal from "../../component/pages/roleManagement/CreateAndEditRoleModal.tsx";
import DataGrid from "../../component/general/grid/DataGrid.tsx";
import {useRole} from "../../service/role.service.ts";


const RoleManagementPage = () => {
  const {setDataTypeIdsAsync} = useSetDataStore()
  const {modals, open, close} = useModalStore();
  const isOpenCreateAndEditRoleodal = modals['createAndEditRole'];
  const {data}= useRole()
  const dropdown = [
    {title:'معلم',description:'برای تستستستستستستس',id:1,permisstionDropDown:[]},
    {title:'اجرا',description:'برای تستستستستستستس',id:2},
    {title:'ادمین',description:'برای تستستستستستستس',id:3},
    {title:'گزارش',description:'برای تستستستستستستس',id:4},
  ]
  const permisstionDropDown = [
    {title:'مدیریت کاربران',permission:{view:true,create:true,delete:true,edit:true}},
    {title:'مدیریت نقش ها',permission:{view:true,create:false,delete:false,edit:true}},
    {title:'مدیریت پرداخت ',permission:{view:true,create:true,delete:true,edit:true}},
    {title:'گزارشات',permission:{view:false,create:false,delete:false,edit:false}},
    {title:'لیست دوره ها',permission:{view:true,create:false,delete:false,edit:true}},
  ]
  const headData = [
    {title: "ایدی", key: "id"},
    {title: "نام دوره", key: "title"},
    {title: "توضیحات", key: "description"},
  ];
  const bodyData = {
    item: dropdown.map((destructure) => ({
      title:destructure.title,
      id:destructure.id,
      description:destructure.description,
    })) ?? [],
    queryKey: 'getOrganSarfasls',
  }
  const onEdit = (data: any) => {

  }
  const onDelete = (data: any) => {

  }
  return (
    <>
      <Breadcrumb/>
      <DataSummary legendTitle={'نقش ها'}>
        <div className={' shadow-lg p-2'}>
          <div className={'w-full flex justify-between items-center  '}>
            <div className={'max-w-32 '}>
              <Button variant={"glass"} onClick={() => setDataTypeIdsAsync([]).then(() => {
                open('createAndEditRole')
              })}
                      label={'ایجاد نقش'}
                      type={'button'}/>
            </div>
          </div>
          <DataGrid onEdit={onEdit} onDelete={onDelete} bodyData={bodyData} headData={headData} />
        </div>

      </DataSummary>
      <CreateAndEditRoleModal isOpen={isOpenCreateAndEditRoleodal} onClose={() => close('createAndEditRole')}  />
    </>
  );
};

export default RoleManagementPage;