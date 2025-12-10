import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { MainLayout } from "./layout/main-layout";
import { Statistic } from "./pages/admin/statistic/statistic";
import adminRoute from "./router/admin-route";
import NotFound from "./NoTFound";
import teacherRouter from "./router/teacher-router";
import { Group } from "./pages/teacher/groups/groups";

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

                <Route path="teacher">
                    <Route index element={<Group />} />
                    {teacherRouter.map(({ page: Page, path }) => (
                        <Route key={path} path={path} element={<Page />} />
                    ))}
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
