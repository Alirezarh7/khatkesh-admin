import { Route, Routes, Navigate } from "react-router-dom";
import { Paths } from "./paths";
import { AuthStore} from "../store/authStore.ts";

const WebRouter = () => {
    const { permissions } = AuthStore();

    const allowedPaths = Paths.filter((route) => {
        if (!route.requiredPermission) return true;
        return permissions.includes(route.requiredPermission);
    });

    return (
        <Routes>
            {allowedPaths.map((item) => (
                <Route key={item.path} path={item.path} element={item.element} />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default WebRouter;
