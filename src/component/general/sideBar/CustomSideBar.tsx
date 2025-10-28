import {useState} from "react";
import {RiMenuFold3Line} from "react-icons/ri";
import CustomDropDownSlider from "../../dropDown/CustomDropDownSlider.tsx";
import {GrUserAdmin} from "react-icons/gr";



const CustomSidebar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const dropDownData = [
        {icon: <GrUserAdmin  className={'text-borderColor'}/>, title: 'مدیریت کاربران',id:'1', href: '', dropdownItems: [
            {href: '/list-kahtkesh-managementPage', title: 'لیست کاربران وب سایت'},
            {href: '/list-admin-management', title: 'لیست افراد ادمین'},
            {href: '/list-teacher', title: 'لیست معلمین'},
          ]},
        {icon: <GrUserAdmin  className={'text-borderColor'}/>, title: 'مدیریت نقش ها',id:'2', href: '',  dropdownItems: [
            {href: '/list-roles', title: 'لیست نقش ها'},
            {href: '/list-course', title: 'دسترسی ها'}
          ]},
      {icon: <GrUserAdmin  className={'text-borderColor'}/>, title: 'پرداخت ها',id:'3', href: '', dropdownItems: [
          {href: '/pay-management', title: 'مدیریت پرداخت'},
          {href: '/reports', title: 'گزارشات'},
        ]},
      {icon: <GrUserAdmin  className={'text-borderColor'}/>, title: 'دوره ها',id:'4', href: '', dropdownItems: [
          {href: '/create-course', title: 'تعریف دوره'},
          {href: '/list-course', title: 'لیست دوره تعرف شده'},
        ]},
      {icon: <GrUserAdmin  className={'text-borderColor'}/>, title: 'دوره های من',id:'5', href: '/my-course'},
    ]
    return (
        <div className="relative  ">
            {/* آیکون باز کردن منو */}
            <RiMenuFold3Line
                className="md:hidden text-borderColor w-11 h-11 cursor-pointer inline-flex items-center p-2"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
            />

            {/* پس‌زمینه شفاف هنگام باز شدن سایدبار */}
            {isSidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-text bg-opacity-50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* خود سایدبار */}
            <div
                className={`fixed top-0 right-0 z-40 border-l border-borderColor w-72 h-screen bg-gradient-to-r from-textColor/70  transition-transform duration-700 transform ${
                    isSidebarOpen ? "translate-x-0" : "translate-x-full"
                } md:translate-x-0`}
            >
                {/* دکمه بستن */}
                <div className="flex justify-around items-center w-full border-b-4 bg-white border-borderColor">
                    <img className={'p-3'} src={'/logo.png'} height={60} width={60} alt="Arm"/>
                </div>
                {/*<IoIosCloseCircleOutline*/}
                {/*	className="md:hidden cursor-pointer text-customBlue w-8 h-8 fixed left-3 top-1"*/}
                {/*	onClick={() => setSidebarOpen(false)}*/}
                {/*/>*/}
                {/* آیتم‌های منو */}
                <nav className=" flex flex-col ">
                    {dropDownData.map((item) => (
                        <CustomDropDownSlider id={item.id} href={item.href} icon={item.icon} title={item.title}
                                              openDropdownId={openDropdownId}
                                              setOpenDropdownId={setOpenDropdownId}
                                              dropdownItems={item.dropdownItems}
                                              setSidebarOpen={setSidebarOpen}
                        />
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default CustomSidebar;