import {Route, Routes} from 'react-router-dom';
import {Paths} from "./paths.ts";
import HomePage from "../pages/HomePage.tsx";
import LoginPage from "../pages/Login/LoginPage.tsx";


const WebRouter = () => {

    return (
        <Routes>
            <Route path={Paths.home} element={<HomePage/>}/>
            <Route path={Paths.login} element={<LoginPage/>}/>
        </Routes>
    );
};

export default WebRouter;