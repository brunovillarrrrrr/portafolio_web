
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import AdminPanel from "./components/AdminPanel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
  },
]);

export const Router = () => <RouterProvider router={router} />;
