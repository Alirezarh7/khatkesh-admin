import MeinLayout from "./component/Layout/MeinLayout.tsx";
import {AuthStore} from "./store/authStore.ts";
import LoginPage from "./pages/Login/LoginPage.tsx";


function App() {
  const token = AuthStore((s) => s.token);
  return (
    <div className="w-full font-vazir">
      {token ? <MeinLayout/> : <LoginPage />}
    </div>
  )
}

export default App
