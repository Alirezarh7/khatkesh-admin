import {useState} from "react";
import {RiMenuFold3Line} from "react-icons/ri";
import CustomDropDownSlider from "../../dropDown/CustomDropDownSlider.tsx";
import {Paths} from "../../../router/paths.ts";
import {TfiReceipt} from "react-icons/tfi";
import {BiMessageDetail} from "react-icons/bi";
import {IoFastFoodOutline} from "react-icons/io5";
import {PiBowlFood} from "react-icons/pi";


const CustomSidebar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const dropDownData = [
        {
            icon: <TfiReceipt className={'text-goldColor'}/>, title: 'مدیریت سفارشات و دریافت',id:'1', href: '', dropdownItems: [
                {href: Paths.receipt, title: 'ثبت سند دریافت جدید'},
                {href: Paths.ManageReceipt, title: 'مدیرت دریافت ها'}
            ]
        },
        {
            icon: <BiMessageDetail  className={'text-goldColor'}/>, title: 'پیام ها',id:'2', href: '', dropdownItems: [
                {href: Paths.massage, title: 'مدیت پیام ها'},
            ]
        },
        {
            icon: <IoFastFoodOutline   className={'text-goldColor'}/>, title: 'مدیریت سامانه تغذیه ',id:'3', href: '', dropdownItems: [
                {href: Paths.consumerGroupFoodAssignments, title: 'مدیریت آمار غذای رستوران'},
                {href: Paths.breadPlan, title: 'مدیریت نیازمندی نان'},
            ]
        },
        {
            icon: <PiBowlFood    className={'text-goldColor'}/>, title: 'برنامه غدایی',id:'3', href: Paths.mealPlan, dropdownItems: []
        },
    ]
    return (
        <div className="relative ">
            {/* آیکون باز کردن منو */}
            <RiMenuFold3Line
                className="md:hidden text-goldColor w-11 h-11 cursor-pointer inline-flex items-center p-2"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
            />

            {/* پس‌زمینه شفاف هنگام باز شدن سایدبار */}
            {isSidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* خود سایدبار */}
            <div
                className={`fixed top-0 right-0 z-40 border-l border-goldColor w-72 h-screen bg-gradient-to-r from-sliderColor/70  to-sliderColor transition-transform duration-700 transform ${
                    isSidebarOpen ? "translate-x-0" : "translate-x-full"
                } md:translate-x-0`}
            >
                {/* دکمه بستن */}
                <div className="flex justify-around items-center w-full border-b-4 bg-white border-goldColor">
                    <img className={'p-1'} src={'/image/Arm.png'} height={60} width={60} alt="Arm"/>
                    <img src="/image/hajZiarat.png" className="max-w-[140px] w-full h-auto object-cover rounded-lg"
                         alt="Arm"/>
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