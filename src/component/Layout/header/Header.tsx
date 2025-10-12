import CustomSidebar from "../../general/sideBar/CustomSideBar.tsx";
import CustomDropDownHeader from "../../dropDown/CustomDropDownHeader.tsx";


const Header = () => {

  return (
    <div className='w-full border-b border-borderColor  p-2 z-10  '>
      <div className='w-full flex items-center justify-between'>
        <CustomSidebar/>
        <CustomDropDownHeader/>
      </div>
    </div>
  );
};
export default Header