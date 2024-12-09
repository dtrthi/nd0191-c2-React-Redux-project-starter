import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import AddQuestion from "./pages/AddQuestion";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import QuestionDetail from "./pages/QuestionDetail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/add",
          element: <AddQuestion />,
        },
        {
          path: "/questions/:questionId",
          element: <QuestionDetail />,
        },
        {
          path: "/leaderboard",
          element: <Leaderboard />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
