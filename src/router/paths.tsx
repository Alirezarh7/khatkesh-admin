import HomePage from "../pages/HomePage.tsx";
import ListManagementPage from "../pages/userManagment/ListManagementPage.tsx";
import RoleManagementPage from "../pages/roleManagement/RoleManagementPage.tsx";
import AdminManagementPage from "../pages/userManagment/AdminManagementPage.tsx";
import TeacherManagementPage from "../pages/userManagment/TeacherManagementPage.tsx";
import ReportsPage from "../pages/payManagmenet/ReportsPage.tsx";
import PayManagementPage from "../pages/payManagmenet/PayManagementPage.tsx";
import MyCoursePage from "../pages/MyCoursePage.tsx";
import ListOfCategoriesPage from "../pages/courseManagement/ListOfCategoriesPage.tsx";
import ProductPage from "../pages/courseManagement/ProductPage.tsx";

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
  { path: "/list-categories", label: "دسته بندی دوره ها", element: <ListOfCategoriesPage />,requiredPermission:'products' },
  { path: "/course-groups", label: "دوره های تعریف شده", element: <ProductPage />,requiredPermission:'products' },
  { path: "/my-course", label: "دوره های من", element: <MyCoursePage />,requiredPermission:'products' },
];
