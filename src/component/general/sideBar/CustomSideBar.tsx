import { useState, useMemo } from "react";
import { RiMenuFold3Line } from "react-icons/ri";
import CustomDropDownSlider from "../../dropDown/CustomDropDownSlider";
import { GrUserAdmin } from "react-icons/gr";
import { AuthStore } from "../../../store/authStore";

type MenuItem = {
    id: string;
    title: string;
    icon: React.ReactNode;
    href?: string;
    requiredPermission?: string;
    dropdownItems?: Array<{
        href: string;
        title: string;
        requiredPermission?: string;
    }>;
};

const CustomSidebar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const { permissions } = AuthStore();

    // ✅ چک دسترسی با پشتیبانی از parent ⇒ children
    const can = (required?: string) => {
        if (!required) return true;
        if (permissions.includes(required)) return true;
        const parent = required.split(".")[0]; // "products.create" => "products"
        if (permissions.includes(parent)) return true;
        return false;
        // اگر خواستی برعکس (children ⇒ parent) هم ساپورت بشه، می‌تونی:
        // if (permissions.some(p => p.startsWith(required + "."))) return true;
    };

    const dropDownData: MenuItem[] = [
        {
            icon: <GrUserAdmin className="text-borderColor" />,
            title: "مدیریت کاربران",
            id: "1",
            dropdownItems: [
                { href: "/list-kahtkesh-managementPage", title: "لیست کاربران وب سایت", requiredPermission: "users" },
                { href: "/list-admin-management", title: "لیست افراد ادمین", requiredPermission: "users" },
                { href: "/list-teacher", title: "لیست معلمین", requiredPermission: "users" },
            ],
        },
        {
            icon: <GrUserAdmin className="text-borderColor" />,
            title: "مدیریت نقش ها",
            id: "2",
            dropdownItems: [
                { href: "/list-roles", title: "لیست نقش ها", requiredPermission: "roles" },
            ],
        },
        {
            icon: <GrUserAdmin className="text-borderColor" />,
            title: "پرداخت ها",
            id: "3",
            dropdownItems: [
                { href: "/pay-management", title: "مدیریت پرداخت", requiredPermission: "roles" },
                { href: "/reports", title: "گزارشات", requiredPermission: "roles" },
            ],
        },
        {
            icon: <GrUserAdmin className="text-borderColor" />,
            title: "دوره ها",
            id: "4",
            dropdownItems: [
                { href: "/list-categories", title: "دسته بندی دوره ها", requiredPermission: "products" },
                { href: "/course-groups", title: "دوره های تعریف شده", requiredPermission: "products" },
            ],
        },
        {
            icon: <GrUserAdmin className="text-borderColor" />,
            title: "دوره‌های من",
            id: "5",
            href: "/my-course",
            requiredPermission: "products",
        },
    ];

    // ✅ فقط منوها/آیتم‌هایی که دسترسی‌شون اوکیه بمونن
    const visibleDropDownData = useMemo(() => {
        return dropDownData
            .map((item) => {
                if (item.dropdownItems && item.dropdownItems.length > 0) {
                    const filtered = item.dropdownItems.filter((sub) => can(sub.requiredPermission));
                    if (filtered.length === 0) return null; // ❗ هیچ بچه مجازی نداره، خود منو مخفی
                    return { ...item, dropdownItems: filtered };
                }
                // آیتم لینک مستقیم
                if (!item.dropdownItems) {
                    return can(item.requiredPermission) ? item : null;
                }
                return null;
            })
            .filter((x): x is MenuItem => Boolean(x));
    }, [dropDownData, permissions]);

    return (
        <div className="relative">
            <RiMenuFold3Line
                className="md:hidden text-black w-11 h-11 cursor-pointer inline-flex items-center p-2"
                onClick={() => setSidebarOpen(!isSidebarOpen)}
            />
            {isSidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/60  z-20"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ⚠️ این بخش باید template string با backtick باشه */}
            <div
                className={`fixed top-0 right-0 z-30 bg-white border-l border-text w-72 h-screen  transition-transform duration-700 transform ${
                    isSidebarOpen ? "translate-x-0" : "translate-x-full"
                } md:translate-x-0`}
            >
                <div className="flex justify-around items-center w-full border-b-4 bg-white border-text">
                    <img className="p-3" src="/logo.png" height={60} width={60} alt="Arm" />
                </div>

                <nav className="flex flex-col bg-white">
                    {visibleDropDownData.map((item) => (
                        <CustomDropDownSlider
                            key={item.id}
                            id={item.id}
                            href={item.href!}
                            icon={item.icon}
                            title={item.title}
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
