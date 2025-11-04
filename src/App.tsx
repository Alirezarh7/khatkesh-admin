import MeinLayout from "./component/Layout/MeinLayout";
import { AuthStore } from "./store/authStore";
import LoginPage from "./pages/Login/LoginPage";

function App() {
    const token = AuthStore((state) => state.token);

    return (
        <div className="w-full font-vazir">
            {token ? <MeinLayout /> : <LoginPage />}
        </div>
    );
}

export default App;
