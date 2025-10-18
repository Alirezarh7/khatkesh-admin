import HomePage from "../pages/HomePage.tsx";
import ListManagementPage from "../pages/ListManagementPage.tsx";

export interface RouteConfig {
  path: string;
  label: string;
  element: React.ReactNode;
  requiredPermission?: string;
}

export const Paths: RouteConfig[] = [
  { path: "/", label: "خانه", element: <HomePage /> },
  { path: "/list-managementPage", label: "لیست کاربران", element: <ListManagementPage /> },
];
