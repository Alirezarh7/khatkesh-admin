import Breadcrumb from "../../component/general/breadCrumb/Breadcrumb.tsx";
import DataSummary from "../../component/general/card/DataSummary.tsx";
import Button from "../../component/general/button/Button.tsx";
import {useModalStore, useSetDataStore} from "../../store/modalStore.ts";
import CustomModal from "../../component/general/modal/Modal.tsx";
import CreateAndEditRoleModal from "../../component/pages/roleManagement/CreateAndEditRoleModal.tsx";


const RoleManagementPage = () => {
  const {setDataTypeIdsAsync} = useSetDataStore()
  const {modals, open, close} = useModalStore();
  const isOpenCreateAndEditRoleodal = modals['createAndEditRole'];


  return (
    <>
      <Breadcrumb/>
      <DataSummary legendTitle={'استثنائات'}>
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

        </div>

      </DataSummary>
      <CreateAndEditRoleModal isOpen={isOpenCreateAndEditRoleodal} onClose={() => close('createAndEditRole')}  />
    </>
  );
};

export default RoleManagementPage;