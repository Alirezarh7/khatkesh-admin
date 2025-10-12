import CustomSidebar from "../../general/sideBar/CustomSideBar.tsx";
import CustomDropDownHeader from "../../dropDown/CustomDropDownHeader.tsx";


const Header = () => {

  return (
    <div className='w-full bg-gradient-to-r from-sliderColor/70  to-sliderColor  p-2 z-10 rounded-md '>
      <div className='w-full flex items-center justify-between'>
        <CustomSidebar/>
        <CustomDropDownHeader/>
      </div>
    </div>
  );
};
export default Header