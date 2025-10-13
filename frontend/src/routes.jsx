import AboutUsPage from "./pages/AboutUsPage";
import HomePage from "./pages/HomePage";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutUsPage />,
  },
];

export default routes;
