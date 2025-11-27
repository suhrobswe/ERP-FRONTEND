import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { MainLayout } from "./layout/main-layout";
import { Statistic } from "./pages/admin/statistic/statistic";
import adminRoute from "./router/admin-route";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/app" element={<MainLayout />}>
                <Route path="admin">
                    <Route index element={<Statistic />} />
                    {adminRoute.map(({ page: Page, path }) => (
                        <Route key={path} path={path} element={<Page />} />
                    ))}
                </Route>

                <Route path="teacher"></Route>
            </Route>
        </Routes>
    );
}

export default App;
