import Breadcrumb from "../component/general/breadCrumb/Breadcrumb.tsx";
import {useGetall} from "../service/user.service.ts";


const ListManagementPage = () => {
  const {data} = useGetall()
  console.log(data)
    return (
        <>
            <Breadcrumb />
fhgfgh
        </>
    );
};

export default ListManagementPage;