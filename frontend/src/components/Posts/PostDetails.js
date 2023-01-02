import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostAction,
  fetchPostDetailsAction,
} from "../../redux/slices/post/postSlices";
import DateFormatter from "../../utils/DateFormatter";
import Loading from "../../utils/Loading";
import AddComment from "../Comment/AddComment";
import CommentsList from "../Comment/CommentsList";

const PostDetails = () => {
  //get data from store
  const post = useSelector((state) => state?.post);
  const { loading, postDetails, appErr, serverErr, isDeleted } = post;

  //getting login user and post creator
  const postCreator = postDetails?.user?._id;
  const user = useSelector((state) => state.users);
  const {
    userAuth: { _id },
  } = user;
  console.log(_id, postCreator);
  const areIdSame = _id === postCreator;
  console.log(areIdSame);
  //get id
  const { id } = useParams();
  //dispatch
  const dispatch = useDispatch();

  //comment
  const comment = useSelector((state) => state.comment);
  const { commentCreated, commentDeleted } = comment;
  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [dispatch, id, commentCreated, commentDeleted]);
  if (isDeleted) return <Navigate to='/posts' />;
  return (
    <>
      {loading ? (
        <Loading />
      ) : appErr || serverErr ? (
        <h1 className='h-screen text-red-400'>
          {appErr}
          {serverErr}
        </h1>
      ) : (
        <section className='py-20 2xl:py-15 bg-gray-900 overflow-hidden font-playfair'>
          <div className='container px-4 mx-auto'>
            {/* Post Image */}
            <img
              className=' mb-14 w-full h-96 object-cover'
              src={postDetails?.image}
              alt=''
            />
            <div className='max-w-2xl mx-auto text-center'>
              <h2 className='mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-thin font-heading'>
                {postDetails?.title}
              </h2>

              {/* User */}
              <div className='inline-flex pt-14 mb-14 items-center border-t border-gray-500'>
                <img
                  className='mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full'
                  src={postDetails?.user?.profilePhoto}
                  alt=''
                />
                <div className='text-left font-mono'>
                  <Link to={`/profile/${postDetails?.user?._id}`}>
                    <h4 className='mb-1 text-2xl font-playfair text-gray-50'>
                      <span className='text-2xl lg:text-2xl  text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600'>
                        {postDetails?.user?.firstName}{" "}
                        {postDetails?.user?.lastName}
                      </span>
                    </h4>
                  </Link>
                  <p className='text-gray-500'>
                    <DateFormatter date={postDetails?.createdAt} />{" "}
                  </p>
                </div>
              </div>
              {/* Post description */}
              <div className='max-w-xl mx-auto'>
                <p className='mb-6 text-left font-sans text-xl text-gray-300'>
                  {postDetails?.description}
                  {/* Show delete and update btn if created user */}
                  {areIdSame ? (
                    <p className='flex'>
                      <Link
                        to={`/update-post/${postDetails?._id}`}
                        className='p-3 '
                      >
                        <PencilSquareIcon className='h-8 mt-3 lg:mr-80 sm:mr-50 text-yellow-300' />
                      </Link>
                      <button
                        onClick={() => dispatch(deletePostAction(id))}
                        className='ml-3'
                      >
                        <TrashIcon className='h-8 mt-3 lg:ml-20 sm:ml:50 text-red-600' />
                      </button>
                    </p>
                  ) : null}
                </p>
              </div>
            </div>
          </div>
          {/* Add comment Form component here */}
          <AddComment postId={id} />
          <div className='flex justify-center font-sans  items-center'>
            <CommentsList comments={postDetails?.comments} />
          </div>
        </section>
      )}
    </>
  );
};

export default PostDetails;
