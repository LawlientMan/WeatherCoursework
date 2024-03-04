import WeatherPage from "@/pages/WeatherPage";
import Layout from "@components/Layouts/Layout";
import AboutPage from "@pages/AboutPage";
import HomePage from "@pages/HomePage";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/weather", element: <WeatherPage /> },
      // { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
