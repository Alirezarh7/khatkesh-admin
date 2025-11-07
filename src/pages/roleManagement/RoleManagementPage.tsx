import Breadcrumb from "../../component/general/breadCrumb/Breadcrumb.tsx";
import DataSummary from "../../component/general/card/DataSummary.tsx";
import Button from "../../component/general/button/Button.tsx";
import {useModalStore, useSetDataStore} from "../../store/modalStore.ts";
import CreateAndEditRoleModal from "../../component/pages/roleManagement/CreateAndEditRoleModal.tsx";
import DataGrid from "../../component/general/grid/DataGrid.tsx";
import {useRole, useRowRoleData} from "../../service/role.service.ts";


const RoleManagementPage = () => {
  const {setDataTypeIdsAsync, dataTypeIds} = useSetDataStore()
  const {modals, open, close} = useModalStore();
  const isOpenCreateAndEditRoleodal = modals['createAndEditRole'];
  const {data}= useRole()
  const {refetch:RowRoleDataRefetch}= useRowRoleData(dataTypeIds)
  const headData = [
    {title: "ایدی", key: "id"},
    {title: "نام دوره", key: "title"},
    {title: "توضیحات", key: "description"},
  ];
  const bodyData = {
    item: data?.roles?.value.map((destructure) => ({
      title:destructure.title,
      id:destructure.id,
      description:destructure.description,
    })) ?? [],
    queryKey: 'getOrganSarfasls',
  }
  const onEdit = (data:any) => {
    setDataTypeIdsAsync(data.id).then(()=>{
      RowRoleDataRefetch().then((value)=>{
        setDataTypeIdsAsync(value.data).then(()=>{
          open('createAndEditRole')
        })
      })
    })
  }
  console.log(dataTypeIds)
  const onDelete = () => {

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
      <CreateAndEditRoleModal editRolment = {dataTypeIds}  isOpen={isOpenCreateAndEditRoleodal} onClose={() => close('createAndEditRole')}  />
    </>
  );
};

export default RoleManagementPage;