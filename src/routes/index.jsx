import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "../pages/Home";
import Pokemon from "../pages/Pokemon";
import Favorites from "../pages/Favorites"
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/pokemon/:id",
        element: <Pokemon/>
    },
    {
        path: "/favorites",
        element: <Favorites/>
    },
    {
        path: "*",
        element: <NotFound/>
    }
])

export default function Routes() {
    return <RouterProvider router={router} />;
}