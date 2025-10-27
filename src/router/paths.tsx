import HomePage from "../pages/HomePage.tsx";
import ListManagementPage from "../pages/ListManagementPage.tsx";
import RoleManagementPage from "../pages/RoleManagementPage.tsx";
import CreateCoursePage from "../pages/CreateCoursePage.tsx";

export interface RouteConfig {
  path: string;
  label: string;
  element: React.ReactNode;
  requiredPermission?: string;
}

export const Paths: RouteConfig[] = [
  { path: "/", label: "خانه", element: <HomePage /> },
  { path: "/list-managementPage", label: "لیست کاربران", element: <ListManagementPage /> },
  { path: "/list-role", label: "مدیریت نقش ها", element: <RoleManagementPage /> },
  { path: "/list-course", label: "لیست دوره ها", element: <ListManagementPage /> },
  { path: "/create-course", label: "ایجاد دوره", element: <CreateCoursePage /> },
];
