import Breadcrumb from "../../component/general/breadCrumb/Breadcrumb.tsx";
import DataSummary from "../../component/general/card/DataSummary.tsx";
import Button from "../../component/general/button/Button.tsx";
import {useModalStore, useSetDataStore} from "../../store/modalStore.ts";
import CreateProductModal from "../../component/pages/productManagment/CreateProductModal.tsx";
import {useCategory} from "../../service/product/category.service.ts";

const ProductPage = () => {
  const {data:getCategory} = useCategory();
  const {setDataTypeIdsAsync} = useSetDataStore()
  const {modals, open, close} = useModalStore();
  const isOpenCreateProduct = modals['createProduct'];
  return (
    <>
      <Breadcrumb/>
      <DataSummary legendTitle={'نقش ها'}>
        <div className={' shadow-lg p-2'}>
          <div className={'w-full flex justify-between items-center  '}>
            <div className={'max-w-32 '}>
              <Button variant={"glass"} onClick={() => setDataTypeIdsAsync([]).then(() => {
                open('createProduct')
              })}
                      label={'ایجاد دسته'}
                      type={'button'}/>
            </div>
          </div>
          <div className="mt-8">

          </div>
        </div>
      </DataSummary>
      <CreateProductModal isOpen={isOpenCreateProduct} categories={getCategory?.category ?? []} onDismiss={()=>close('createProduct')} />
    </>
  );
};

export default ProductPage;