import "./App.css";
import {  createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import RedirectLink from "./pages/RedirectLink";
import Link from "./pages/Link";
import UrlProvider from "./context/context";
import RequireAuth from "./components/RequireAuth";

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children:[
      {
        path: '/',
        element: <Landing/>
      },
      {
        path: '/dashboard',
        element: <RequireAuth> <Dashboard/> </RequireAuth>
      },
      {
        path: '/auth',
        element: <Auth/>
      },
      {
        path:'link/:id',
        element:<RequireAuth> <Link/> </RequireAuth>
      },
      {
        path:'/:id',
        element: <RedirectLink/>
      }
    ]
  }
])

function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router}/>;
    </UrlProvider>
  )
  
}

export default App;
