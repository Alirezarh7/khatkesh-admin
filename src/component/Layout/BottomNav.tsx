import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {FaCreditCard, FaTimes} from "react-icons/fa";
import {TfiReceipt} from "react-icons/tfi";
import {BiFoodMenu} from "react-icons/bi";
import {IoFastFoodOutline} from "react-icons/io5";
import {useLocation, useNavigate} from "react-router-dom";
import {Paths} from "../../router/paths.tsx";
import {HiMiniReceiptRefund} from "react-icons/hi2";

const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  useEffect(() => {
    setSelectedTab(currentPath);
  }, [currentPath]);
  const [selectedTab, setSelectedTab] = useState<string>(currentPath);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useNavigate()
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);
  const navItems = [
    {
      id: Paths.ManageReceipt,
      icon: <TfiReceipt color={selectedTab === Paths.ManageReceipt ? "#e1ac33" : "white"}/>,
      label: "دریافت ها",
      history: Paths.ManageReceipt
    },
    {
      id: Paths.mealPlan,
      icon: <BiFoodMenu   color={selectedTab === Paths.mealPlan ? "#e1ac33" : "white"}/>,
      label: "برنامه غذایی",
      history: Paths.mealPlan
    },
    {
      id: Paths.receipt,
      icon: <HiMiniReceiptRefund   color={selectedTab === Paths.receipt ? "#e1ac33" : "white"}/>,
      label: "ثبت دریافت",
      history: Paths.receipt
      // onClick: () => setIsModalOpen(true),
    },
    {
      id: Paths.consumerGroupFoodAssignments,
      icon: <IoFastFoodOutline color={selectedTab === Paths.consumerGroupFoodAssignments ? "#e1ac33" : "white"}/>,
      label: "رستوران",
      history: Paths.consumerGroupFoodAssignments,

    },
    {
      id: Paths.breadPlan,
      icon: <IoFastFoodOutline color={selectedTab === Paths.breadPlan ? "#e1ac33" : "white"}/>,
      label: "نان",
      history: Paths.breadPlan,
    },

  ];

  const servicesData = [
    {
      id: 1,
      icon: <FaCreditCard/>,
      title: "خدمات پرکاربرد",
    },
    {
      id: 2,
      icon: <FaCreditCard/>,
      title: "خودرو و موتور",
    },
    {
      id: 3,
      icon: <FaCreditCard/>,
      title: "خدمات بانکی",
    },
    {
      id: 4,
      icon: <FaCreditCard/>,
      title: "خدمات سفر",
    },
    {
      id: 5,
      icon: <FaTimes/>,
      title: "",
    },
    {
      id: 6,
      icon: <FaCreditCard/>,
      title: "قبض و موبایل",
    },
  ];

  return (
    <>
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-sliderColor/70  to-sliderColor p-4 flex justify-around items-center shadow-lg rounded-t-3xl z-30">
        {navItems.map((item) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center cursor-pointer"
            onClick={() => {
              setSelectedTab(item.id);
              if (item.history) {
                history(item.history)
              }
            }}
          >
            {selectedTab === item.id && (
              <motion.div
                layoutId="indicator"
                className="absolute -top-12 w-16 h-16 bg-white rounded-full flex items-center justify-center "
                transition={{type: "spring", stiffness: 300, damping: 20}}
              >
                <div
                  className="  w-12 h-12 bg-gradient-to-r from-sliderColor/70  to-sliderColor rounded-full flex items-center justify-center shadow-md">
                  {item.icon}
                </div>
              </motion.div>
            )}
            <span
              className={`text-gray-600 ${selectedTab === item.id ? "opacity-0" : "opacity-100"}`}
            >
              {item.icon}
            </span>
            <span className="text-xs text-white mt-1">{item.label}</span>
          </div>
        ))}
      </div>

      {/* مودال */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 50}}
            transition={{duration: 0.3}}
            className="fixed top-0 left-0 w-full h-full bg-white/75 flex flex-col items-center justify-center z-[1000001] overflow-hidden"
          >
            <div
              className={
                "grid grid-cols-3 w-full justify-items-center bottom-3 gap-5  fixed "
              }
            >
              {servicesData.map((item) => (
                <div key={item.id}>
                  {item.id !== 5 ? (
                    <div
                      className={
                        "bg-gradient-to-r from-sliderColor to-customBlue/90 text-goldColor rounded-xl flex flex-col items-center justify-center w-[88px] h-[88px] shadow-xl"
                      }
                    >
                      <div className={"mb-2"}>{item.icon}</div>
                      <p className={"text-[13px]"}>{item.title}</p>
                    </div>
                  ) : (
                    <div
                      onClick={() => setIsModalOpen(false)}
                      className="w-12 h-12 bg-gradient-to-r from-sliderColor  to-customBlue/80 text-goldColor   rounded-full flex  items-center justify-center shadow-md mr-2.5 mt-2"
                    >
                      {item.icon}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BottomNav;
