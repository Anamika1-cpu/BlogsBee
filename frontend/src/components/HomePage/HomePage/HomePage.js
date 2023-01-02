import React from "react";
// import poster from "../../../img/poster.png";
const HomePage = () => {
  return (
    <>
      <section className='pb-10 bg-gray-900 font-playfair'>
        <div className='relative container px-4   mx-auto'>
          <div className='flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14'>
            <div className='w-full items-center lg:w-1/2 px-4 mb-16 lg:mb-0 '>
              <span className='text-lg font-sans  font-bold text-blue-400'>
                Create posts to EDUCATE
              </span>
              <h2 className='max-w-2xl mt-12 mb-12 text-6xl 2xl:text-8xl text-white  font-heading'>
                Pen down your ideas{" "}
                <span className='text-blue-500'>
                  By creating a <span className='text-yellow-500'>Post</span>
                </span>
              </h2>
              <p className='mb-12 lg:mb-16 2xl:mb-24 text-xl font-sans font-bold text-gray-100'>
                Your post must be free from racism and unhealthy words
              </p>
              {/* <a
                className='inline-block px-12 py-5 text-lg text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-full transition duration-200'
                href='/'
              >
                Buy This Course
              </a> */}
            </div>
            <div className='w-full lg:w-1/2 px-4'>
              {/* <img className='w-full' src={poster} alt={poster} /> */}
              <img
                className='w-full'
                src='https://media.giphy.com/media/765ccrAiB0g9z6EApL/giphy.gif'
                alt=''
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
