import HomePage from "./components/HomePage/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/HomePage/User/Register/Register";
import Login from "./components/HomePage/User/Login/Login";
import Navbar from "./components/HomePage/Navigation/Navbar";
import AddNewCategory from "./components/Categories/AddNewCategory";
import CategoryList from "./components/Categories/CategoryList";
import UpdateCategory from "./components/Categories/UpdateCategory";
import PrivateProtectRoute from "./components/HomePage/Navigation/ProtectedRoutes/PrivateProtectRoute";
import AdminRoutes from "./components/HomePage/Navigation/ProtectedRoutes/AdminRoutes";
import CreatePost from "./components/Posts/CreatePost";
import UpdatePost from "./components/Posts/UpdatePost";
import PostsList from "./components/Posts/PostsList";
import PostDetails from "./components/Posts/PostDetails";
import UpdateComment from "./components/Comment/UpdateComment";
import Profile from "./components/HomePage/User/Profile/Profile";
import UploadProfilePhoto from "./components/HomePage/User/Profile/UploadProfilePhoto";
import UpdateProfileForm from "./components/HomePage/User/Profile/UpdateProfileForm";
import SendEmail from "./components/HomePage/User/Emailing/SendEmail";
import AccountVerified from "./components/HomePage/User/AccountVerification/AccountVerified";
import UsersList from "./components/HomePage/User/UsersList/UsersList";
import UpdatePassword from "./components/HomePage/User/PasswordManagement/UpdatePassword";
import ResetPasswordForm from "./components/HomePage/User/PasswordManagement/ResetPasswordForm";
import ResetPassword from "./components/HomePage/User/PasswordManagement/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route element={<AdminRoutes />}>
          <Route path='/update-category/:id' element={<UpdateCategory />} />
          <Route path='/add-category' element={<AddNewCategory />} />
          <Route path='/category-list' element={<CategoryList />} />
          <Route path='/send-mail' element={<SendEmail />} />
          <Route path='/users' element={<UsersList />} />
        </Route>
        <Route element={<PrivateProtectRoute />}>
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:id' element={<UpdatePost />} />
          <Route path='/update-comment/:id' element={<UpdateComment />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/update-password' element={<UpdatePassword />} />
          <Route
            path='/upload-profile-photo/:id'
            element={<UploadProfilePhoto />}
          />
          <Route path='/upload-profile/:id' element={<UpdateProfileForm />} />
          <Route path='/verify-account/:token' element={<AccountVerified />} />
        </Route>
        <Route path='/posts' element={<PostsList />} />
        <Route path='/posts/:id' element={<PostDetails />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/password-reset-token' element={<ResetPasswordForm />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
