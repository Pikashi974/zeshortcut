import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResultPage from "./pages/ResultPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/result", element: <ResultPage /> },
]);

export default router;
