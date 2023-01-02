import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  HeartIcon,
  FaceFrownIcon,
  ArrowUpTrayIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { EnvelopeIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserAction,
  userProfileAction,
  followUserAction,
  unfollowUserAction,
} from "../../../../redux/slices/users/userSlice";
import DateFormatter from "../../../../utils/DateFormatter";
import Loading from "../../../../utils/Loading";

export default function Profile(props) {
  // console.log(props);
  const { id } = useParams();
  //fetch uiser profile
  const dispatch = useDispatch();

  //get data from store
  const user = useSelector((state) => state?.users);
  const {
    userProfile,
    loading,
    appErr,
    serverErr,
    followed,
    unfollowed,
    userAuth,
    profile,
  } = user;
  //fech user profile
  useEffect(() => {
    dispatch(fetchUserAction(id));
  }, [id, dispatch, followed, unfollowed]);
  useEffect(() => {
    dispatch(userProfileAction(id));
  }, [id, dispatch, followed, unfollowed]);
  //navigate
  const navigate = useNavigate();
  //send mail handle click
  const sendMailNavigate = () => {
    navigate("/send-mail", {
      state: {
        id: userProfile?._id,
        email: userProfile?.email,
      },
    });
  };

  //isLogin
  const isLoginUser = userAuth._id === id;
  return (
    <>
      <div className='min-h-screen  bg-blue-500 font-sans'>
        {loading ? (
          <Loading />
        ) : appErr || serverErr ? (
          <h2>
            {appErr}
            {serverErr}
          </h2>
        ) : (
          <div className='h-screen flex overflow-hidden bg-white font-sans'>
            {/* Static sidebar for desktop */}

            <div className='flex flex-col min-w-0 flex-1 overflow-hidden'>
              <div className='flex-1 relative z-0 flex overflow-hidden'>
                <main className='flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last'>
                  <article>
                    {/* Profile header */}
                    <div>
                      <div>
                        <img
                          className='h-32 w-full object-cover lg:h-48'
                          src={userProfile?.profilePhoto}
                          alt={userProfile?.firstName}
                        />
                      </div>
                      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
                        <div className='-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5'>
                          <div className='flex -mt-20'>
                            <img
                              className='h-24 w-24 rounded-full 
                               ring-4 ring-white sm:h-32 sm:w-32'
                              src={userProfile?.profilePhoto}
                              alt={userProfile?.firstName}
                            />
                          </div>
                          <div className='mt-8 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1'>
                            <div className=' flex flex-col 2xl:block mt-10 min-w-0 flex-1'>
                              <h1 className='text-4xl font-bold font-garamond text-gray-900 '>
                                {userProfile?.firstName}
                                {userProfile?.lastName}

                                <span className='inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800'>
                                  {userProfile?.accountType}
                                </span>
                                {/* Display if verified or not */}
                                {userProfile?.isAccountVerified ? (
                                  <span className='inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-green-600 text-gray-300'>
                                    Account Verified
                                  </span>
                                ) : (
                                  <span className='inline-flex ml-2 items-center px-3 py-0.5  rounded-lg text-sm font-medium bg-red-600 text-gray-300'>
                                    Unverified Account
                                  </span>
                                )}
                              </h1>
                              <p className='m-3  ml-1 font-mono  text-sm'>
                                Date Joined:
                                <DateFormatter
                                  date={userProfile?.createdAt}
                                />{" "}
                              </p>
                              <p className='text-green-500 mt-2 mb-2'>
                                {userProfile?.posts?.length} posts{" "}
                                {userProfile?.followers.length} followers{" "}
                                {userProfile?.following.length} following
                              </p>
                              {/* Who view my profile */}
                              <div className='flex items-center  mb-2'>
                                <EyeIcon className='h-5 w-5 ' />
                                <div className='pl-2'>
                                  {profile?.viewedBy?.length}{" "}
                                  <span className='text-indigo-400 cursor-pointer hover:underline'>
                                    users viewed your profile
                                  </span>
                                </div>
                              </div>

                              {/* is login user */}
                              {/* Upload profile photo */}
                              <Link
                                to={`/upload-profile-photo/${userProfile?._id}`}
                                className='inline-flex justify-center w-48 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                              >
                                <ArrowUpTrayIcon
                                  className='-ml-1 mr-2 h-5 w-5 text-gray-800'
                                  aria-hidden='true'
                                />
                                <span className='text-gray-800'>
                                  Upload Photo
                                </span>
                              </Link>
                            </div>

                            <div className='mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4'>
                              {/* // Hide follow button from the same */}
                              {!isLoginUser && (
                                <div>
                                  {userProfile?.isFollowing ? (
                                    <button
                                      onClick={() =>
                                        dispatch(unfollowUserAction(id))
                                      }
                                      className='mr-2 inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                                    >
                                      <FaceFrownIcon
                                        className='-ml-1 mr-2 h-5 w-5 text-gray-800'
                                        aria-hidden='true'
                                      />
                                      <span>Unfollow</span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() =>
                                        dispatch(followUserAction(id))
                                      }
                                      type='button'
                                      className='inline-flex  justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                                    >
                                      <HeartIcon
                                        className='-ml-1 mr-2 h-5 w-5 text-gray-800 '
                                        aria-hidden='true'
                                      />
                                      <span className='text-gray-800'>
                                        Follow{" "}
                                      </span>
                                      <span className='pl-2'>
                                        {userProfile?.followers?.length}
                                      </span>
                                    </button>
                                  )}

                                  <></>
                                </div>
                              )}

                              {/* Update Profile */}

                              <>
                                {isLoginUser && (
                                  <Link
                                    to={`/upload-profile/${userProfile?._id}`}
                                    className='inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                                  >
                                    <UserIcon
                                      className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                                      aria-hidden='true'
                                    />
                                    <span>Update Profile</span>
                                  </Link>
                                )}
                              </>
                              {/* Send Mail */}
                              <button
                                onClick={sendMailNavigate}
                                className='inline-flex justify-center bg-indigo-900 px-4 py-2 border border-yellow-700 shadow-sm text-sm font-medium rounded-md text-gray-700  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                              >
                                <EnvelopeIcon
                                  className='-ml-1 mr-2 h-5 w-5 text-gray-200'
                                  aria-hidden='true'
                                />
                                <span className='text-base mr-2  text-bold text-yellow-500'>
                                  Send Message
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className='hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1'>
                          <h1 className='text-2xl font-bold text-gray-900 truncate'>
                            {userProfile?.lastName}
                          </h1>
                        </div>
                      </div>
                    </div>
                    {/* Tabs */}
                    <div className='mt-6 sm:mt-2 2xl:mt-5'>
                      <div className='border-b border-red-900'>
                        <div className='max-w-5xl mx-auto '></div>
                      </div>
                    </div>
                    <div className='flex justify-center place-items-start flex-wrap  md:mb-0'>
                      <div className='w-full md:w-1/3 px-4 mb-4 md:mb-0'>
                        <h1 className='text-center text-xl font-sans font-bold text-gray-800 border-gray-500 mb-2 border-b-2'>
                          Who viewed my profile :{" "}
                          {userProfile?.viewedBy?.length}
                        </h1>

                        {/* Who view my post */}
                        <ul className=''>
                          {userProfile?.viewedBy?.length <= 0 ? (
                            <h2>No Viewers!!</h2>
                          ) : (
                            userProfile?.viewedBy?.map((userr) => (
                              <li>
                                <Link>
                                  <div
                                    key={userr?._id}
                                    className='flex mb-2 items-center space-x-4 lg:space-x-6'
                                  >
                                    <img
                                      className='w-16 h-16 rounded-full lg:w-20 lg:h-20'
                                      src={userr?.profilePhoto}
                                      alt={userr?._id}
                                    />
                                    <div className='font-medium text-lg leading-6 space-y-1'>
                                      <h3>
                                        {userr?.firstName} {userr?.lastName}
                                      </h3>
                                      <p className='text-indigo-600'>
                                        {userr.accountType}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            ))
                          )}
                        </ul>
                      </div>
                      {/* All my Post */}
                      <div className='w-full md:w-2/3 px-4 mb-4 md:mb-0'>
                        <h1
                          className='text-center text-xl font-sans
                        text-gray-800
                         font-bold border-gray-500 mb-2 border-b-2'
                        >
                          My Post - {userProfile?.posts?.length}
                        </h1>
                        {/* Loop here */}
                        {userProfile?.posts.length <= 0 ? (
                          <h2>No Post Found!!</h2>
                        ) : (
                          userProfile?.posts.map((post) => (
                            <div className='flex flex-wrap  -mx-3 mt-3  lg:mb-6'>
                              <div className='mb-2   w-full lg:w-1/4 px-3'>
                                <Link>
                                  <img
                                    className='object-cover h-40 rounded'
                                    src={post?.image}
                                    alt='poster'
                                  />
                                </Link>
                              </div>
                              <div className='w-full lg:w-3/4 px-3'>
                                <Link
                                  to={`/posts/${post?._id}`}
                                  className='hover:underline'
                                >
                                  <h3 className='mb-1 text-2xl font-bold text-green-600 font-heading'>
                                    {post?.title}
                                  </h3>
                                </Link>
                                <p className='text-gray-600 font-sans truncate'>
                                  {post?.description}
                                </p>
                                <Link
                                  className='text-indigo-500 font-sans hover:underline'
                                  to={`/posts/${post?._id}`}
                                >
                                  Read more
                                </Link>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </article>
                </main>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
