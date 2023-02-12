import React from "react";
import {createBrowserRouter,RouterProvider} from "react-router-dom";

// import all Components
import Username from "./components/Username";
import Password from "./components/Password";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";
import Register from "./components/Register";


// root routes
const router = createBrowserRouter([
    {
        path:"/",
        element:<Username/>
    } ,
    {
        path:"/register",
        element:<Register/>
    } ,
    {
        path:"/password",
        element:<Password/>
    },
    {
        path:"/reset",
        element:<Reset/>
    },
    {
        path:"/recovery",
        element:<Recovery/>
    },
    {
        path:"*",
        element:<PageNotFound/>
    },
    {
        path:"/profile",
        element:<Profile/>
    }

])

function App() {
  return (
    <main className="App">
          <RouterProvider router={router}>
              
          </RouterProvider>
    </main>
  );
}

export default App;
