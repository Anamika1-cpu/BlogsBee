import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAction } from "../../../../redux/slices/users/userSlice";
import Loading from "../../../../utils/Loading";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
  //select data from store
  const user = useSelector((state) => state?.users);
  const { usersList, appErr, serverErr, loading, userBlock, userUnBlock } =
    user;
  console.log(user);
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsersAction());
  }, [dispatch, userBlock, userUnBlock]);
  return (
    <>
      <section class='py-8 bg-gray-900 min-h-screen'>
        {loading ? (
          <Loading />
        ) : appErr || serverErr ? (
          <h3>
            {appErr} {serverErr}
          </h3>
        ) : usersList?.length <= 0 ? (
          <h2>No users!</h2>
        ) : (
          usersList?.map((user) => <UsersListItem user={user} />)
        )}
      </section>
    </>
  );
};

export default UsersList;
