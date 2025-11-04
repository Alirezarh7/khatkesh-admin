import HomePage from "../pages/HomePage.tsx";
import ListManagementPage from "../pages/userManagment/ListManagementPage.tsx";
import RoleManagementPage from "../pages/roleManagement/RoleManagementPage.tsx";
import CreateCoursePage from "../pages/courseManagement/CreateCoursePage.tsx";
import AdminManagementPage from "../pages/userManagment/AdminManagementPage.tsx";
import TeacherManagementPage from "../pages/userManagment/TeacherManagementPage.tsx";
import ReportsPage from "../pages/payManagmenet/ReportsPage.tsx";
import PayManagementPage from "../pages/payManagmenet/PayManagementPage.tsx";
import MyCoursePage from "../pages/MyCoursePage.tsx";
import ListOfCoursePage from "../pages/courseManagement/ListOfCoursePage.tsx";

export interface RouteConfig {
  path: string;
  label: string;
  element: React.ReactNode;
  requiredPermission?: string;
}

export const Paths: RouteConfig[] = [
  { path: "/", label: "خانه", element: <HomePage /> },
  { path: "/list-kahtkesh-managementPage", label: "لیست کاربران خط کش", element: <ListManagementPage /> ,requiredPermission:'users' },
  { path: "/list-admin-management", label: "لیست افراد ادمین", element: <AdminManagementPage />,requiredPermission:'users' },
  { path: "/list-teacher", label: "لیست معلمین", element: <TeacherManagementPage /> ,requiredPermission:'users'},
  { path: "/list-roles", label: "لیست نقش ها", element: <RoleManagementPage />,requiredPermission:'roles' },
  { path: "/pay-management", label: "مدیریت پرداخت", element: <PayManagementPage />,requiredPermission:'roles' },
  { path: "/reports", label: "گزارشات", element: <ReportsPage />,requiredPermission:'roles' },
  { path: "/create-course", label: "تعریف دوره", element: <CreateCoursePage />,requiredPermission:'products.create' },
  { path: "/list-course", label: "لیست دوره ها", element: <ListOfCoursePage />,requiredPermission:'products.index' },
  { path: "/my-course", label: "دوره های من", element: <MyCoursePage />,requiredPermission:'products' },
];
