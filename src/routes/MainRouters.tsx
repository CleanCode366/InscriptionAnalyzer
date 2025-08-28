import Upload from "@/views/Upload/Upload";
import BaseLayout from "@layouts/MainLayout/BaseLayout";
import AuthPage from "@views/Auth/AuthPage";
import DetailInscriptionPage from "@views/DetailInscriptionPage/DetailInscriptionPage";
import Feed from "@views/Feed/Feed";
import Gallery from "@views/Gallery/Gallery";
import Profile from "@views/Profile/Profile";
import Setting from "@views/Setting/Setting";
import { Navigate } from "react-router-dom";

const MainRoutes = {
  path: '/',
  element: <BaseLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="Feed" replace />
    },
    {
      path: 'Feed',
      element: <Feed />
    },
    {
      path: 'upload',
      element: <Upload/>
    },
    {
      path: 'Feed/:id',
      element: <DetailInscriptionPage/>
    },
    {
      path: 'settings',
      element: <Setting/>
    },
    {
      path: 'profile',
      element:<Profile/>
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
