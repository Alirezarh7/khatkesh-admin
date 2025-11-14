import Breadcrumb from "../../component/general/breadCrumb/Breadcrumb";
import CategoryTree from "../../component/general/categoryTree/CategoryTree.tsx";
import {useCategory, useCategoryDataByID} from "../../service/product/category.service.ts";
import DataSummary from "../../component/general/card/DataSummary.tsx";
import Button from "../../component/general/button/Button.tsx";
import {useModalStore, useSetDataStore} from "../../store/modalStore.ts";
import CreateCategoryModal from "../../component/pages/courseManagment/CreateCategoryModal.tsx";
import DeletedCategory from "../../component/pages/courseManagment/DeletedCategory.tsx";

const ListOfCoursePage = () => {
  const {data} = useCategory();
  const {setDataTypeIdsAsync,dataTypeIds} = useSetDataStore()
  const {modals, open, close} = useModalStore();
  const isOpenCreateCategories = modals['createCategories'];
  const isOpenDeletedCategory = modals['deletedCategory'];
  const categories = data?.category ?? [];
  const {refetch} =useCategoryDataByID(dataTypeIds)
  const onEdit = (item:any) =>{
    setDataTypeIdsAsync(item.id).then(()=>{
      refetch().then((value)=>{
        setDataTypeIdsAsync(value.data?.category).then(()=>{
          open('createCategories')
        })
      })
    })
  }
  const onDelete = (item:any) => {
    setDataTypeIdsAsync(item.id).then(()=>{
      open('deletedCategory')
    })
  }
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
              onEdit={(item) =>onEdit(item) }
              onDelete={(item) => onDelete(item)}
            />
          </div>
        </div>
      </DataSummary>
      <CreateCategoryModal editData={dataTypeIds}  categories={data?.category ?? []} isOpen={isOpenCreateCategories} onDismiss={()=>close('createCategories')} />
      <DeletedCategory   editRolment = {dataTypeIds}  isOpen={isOpenDeletedCategory} onClose={() => close('deletedCategory')}  />
    </>
  );
};

export default ListOfCoursePage;
