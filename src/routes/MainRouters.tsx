import BaseLayout from "@layouts/MainLayout/BaseLayout";
import AuthPage from "@views/Auth/AuthPage";
import Gallery from "@views/Gallery/Gallery";
import Home from "@views/Home";
import { Navigate } from "react-router-dom";

const MainRoutes = {
  path: '/',
  element: <BaseLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="home" replace />
    },
    {
      path: 'home',
      element: <Home />
    },
    {
      path: 'photos',
      element: <Gallery/>
    },
    {
      path: 'login',
      element: <AuthPage/>
    }
    
  ]
};

export default MainRoutes;
