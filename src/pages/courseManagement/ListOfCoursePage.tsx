import Breadcrumb from "../../component/general/breadCrumb/Breadcrumb";
import CategoryTree from "../../component/general/categoryTree/CategoryTree.tsx";
import {useCategory} from "../../service/product/category.service.ts";
import DataSummary from "../../component/general/card/DataSummary.tsx";
import Button from "../../component/general/button/Button.tsx";
import {useModalStore, useSetDataStore} from "../../store/modalStore.ts";
import CreateCategoryModal from "../../component/pages/courseManagment/CreateCategoryModal.tsx";

const ListOfCoursePage = () => {
  const {data} = useCategory();
  const {setDataTypeIdsAsync} = useSetDataStore()
  const {modals, open, close} = useModalStore();
  const isOpencreateCategories = modals['createCategories'];
  const categories = data?.category ?? [];

  return (
    <>
      <Breadcrumb/>
      <DataSummary legendTitle={'نقش ها'}>
        <div className={' shadow-lg p-2'}>
          <div className={'w-full flex justify-between items-center  '}>
            <div className={'max-w-32 '}>
              <Button variant={"glass"} onClick={() => setDataTypeIdsAsync([]).then(() => {
                open('createCategories')
              })}
                      label={'ایجاد دسته'}
                      type={'button'}/>
            </div>
          </div>
          <div className="mt-8">
            <CategoryTree
              data={categories}
              onEdit={(item) => console.log("EDIT:", item)}
              onDelete={(item) => console.log("DELETE:", item)}
            />
          </div>
        </div>
      </DataSummary>
      <CreateCategoryModal  categories={data?.category ?? []} isOpen={isOpencreateCategories} onDismiss={()=>close('createCategories')} />
    </>
  );
};

export default ListOfCoursePage;
