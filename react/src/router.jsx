import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Users from "./views/Users";
import Constructions from "./views/Constructions";
import ConstructionForm from "./views/ConstructionForm";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/UserForm";
import ConstructionMeasurements from "./views/ConstructionMeasurements";
import MeasurementForm from "./views/MeasurementForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/users" />
            },
            {
                path: "/users",
                element: <Users />
            },
            {
                path: "/users/new",
                element: <UserForm key="userCreate"/>
            },
            {
                path: "/users/:id",
                element: <UserForm key="userUpdate"/>
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/constructions",
                element: <Constructions />
            },
            {
                path: "/constructions/new",
                element: <ConstructionForm key="constructionCreate"/>
            },
            {
                path: "/constructions/:id",
                element: <ConstructionForm key="constructionUpdate"/>
            },
            {
                path: "/constructions/:id/measurements",
                element: <ConstructionMeasurements key="constructionMeasurements" />
            },
            {
                path: "/constructions/:id/measurements/new",
                element: <MeasurementForm key="measurementCreate" />
            },
        ]
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />
    },
]);

export default router;