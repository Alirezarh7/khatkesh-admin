import Breadcrumb from "../../component/general/breadCrumb/Breadcrumb.tsx";
import {useGetall} from "../../service/user.service.ts";
import DataGrid from "../../component/general/grid/DataGrid.tsx";
import {useState} from "react";
import {useWindowWidth} from "../../hook/useWindowWidth.ts";


const ListManagementPage = () => {
  const {data} = useGetall()
  console.log(data?.users.value)

  const headData = [
    {title: "اسم", key: "fullName"},
    {title: "ایمیل", key: "email"},
    {title: "تایید ایمیل", key: "emailVerified"},
    {title: "تاریخ ایجاد اکانت", key: "createdAt"},
    {title: "تاریخ ویرایش اکانت", key: "updatedAt"},
  ];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = useWindowWidth() > 550 ? 10 : 5;
  const bodyData = {
    item: data?.users.value?.map((userData) => ({
      fullName: userData.firstName + userData.lastName,
      // email:userData.email,
      // emailVerified:userData.emailVerified ? '✅' : '❌',
      // createdAt:userData.createdAt,
      // updatedAt:userData.updatedAt,
      // id: userData.id,
    })) ?? [],
    queryKey: 'getall',
    totalPage: data?.totalCount ?? 0,
  }
    return (
        <>
            <Breadcrumb />
            <DataGrid setCurrentPage={setCurrentPage} currentPage={currentPage} bodyData={bodyData} headData={headData}  />
        </>
    );
};

export default ListManagementPage;