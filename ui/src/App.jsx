import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import IndexPage from "./pages/IndexPage";
import Bookmarks from "./components/Bookmarks";
import AddNews from "./components/AddNews";
import UpdateCategories from "./components/UpdateCategories";
import EditNewsPage from "./components/EditNewsPage";
import SearchResultsPage from "./pages/SearchResultsPage";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/addnews" element={<AddNews />} />
          <Route path="/categories" element={<UpdateCategories />} />
          <Route path="/edit-news/custom/:id" element={<EditNewsPage />} />
          <Route path="/search" element={<SearchResultsPage/>} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
