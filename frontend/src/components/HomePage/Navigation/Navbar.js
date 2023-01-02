import AdminNavbar from "./Admin/AdminNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";
import { useSelector } from "react-redux";
import AccountVerificationAlertWarning from "./Alerts/AccountVerificationAlertWarning";
import AccountVerificationSuccessAlert from "./Alerts/AccountVerificationSuccessAlert";

const Navbar = () => {
  //get user from store
  const state = useSelector((state) => state?.users);
  const { userAuth } = state;
  const isAdmin = userAuth?.isAdmin;

  //account verfification
  const account = useSelector((state) => state?.acc);
  const { loading, appErr, serverErr, token } = account;
  return (
    <>
      {isAdmin ? (
        <AdminNavbar isLogin={userAuth} />
      ) : userAuth ? (
        <PrivateNavbar isLogin={userAuth} />
      ) : (
        <PublicNavbar />
      )}
      {/*  Alert  */}
      {userAuth && !userAuth.isAccountVerified && (
        <AccountVerificationAlertWarning />
      )}

      {/* success msg */}
      {loading && <h2 className='text-center'>Loading Please wait..</h2>}
      {token && <AccountVerificationSuccessAlert />}
      {appErr || serverErr ? (
        <h2 className='text-center text-red-500'>
          {serverErr}
          {appErr}
        </h2>
      ) : null}
    </>
  );
};

export default Navbar;
