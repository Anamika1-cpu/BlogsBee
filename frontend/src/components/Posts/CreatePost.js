import * as Yup from "yup";
import { useFormik } from "formik";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../redux/slices/post/postSlices";
import CategoryDropDown from "../Categories/CategoryDropDown";
import styled from "styled-components";
import { Navigate } from "react-router-dom";

//Form schema
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.object().required("Category is required"),
  image: Yup.string().required("Image is required"),
});
//css for dropzone
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
border-color:'red'
  transition: border 0.24s ease-in-out;
`;
export default function CreatePost() {
  const dispatch = useDispatch();

  //select store data
  const post = useSelector((state) => state?.post);
  const { loading, isCreated, appErr, serverErr } = post;
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      image: "",
    },
    onSubmit: (values) => {
      //dispath the action
      const data = {
        category: values?.category?.label,
        title: values?.title,
        description: values?.description,
        image: values?.image,
      };
      dispatch(createPostAction(data));
    },
    validationSchema: formSchema,
  });
  //redirect
  if (isCreated) return <Navigate to='/posts' />;
  return (
    <>
      <div className='min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 '>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-4xl font-extrabold text-gray-900'>
            Create Post
          </h2>

          <p className='mt-2 text-center text-sm text-gray-900'>
            <p className='font-medium text-green-600 hover:text-indigo-500'>
              Share your ideas to the word. Your post must be free from
              profanity
            </p>
          </p>
          {appErr || serverErr ? (
            <p className='mt-2 text-center text-lg text-red-600'>
              {serverErr} {appErr}
            </p>
          ) : null}
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
            <form onSubmit={formik.handleSubmit} className='space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-900'
                >
                  Title
                </label>
                <div className='mt-1'>
                  {/* Title */}
                  <input
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                    id='title'
                    name='title'
                    type='title'
                    autoComplete='title'
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  />
                </div>
                {/* Err msg */}
                <div className='text-red-500'>
                  {formik?.touched?.title && formik?.errors?.title}
                </div>
              </div>
              {/* Category input goes here */}
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-900'
              >
                Select Category
              </label>
              <CategoryDropDown
                value={formik.values.category?.label}
                onChange={formik.setFieldValue}
                onBlur={formik.setFieldTouched}
                error={formik.errors.category}
                touched={formik.touched.category}
              />
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-900'
                >
                  Description
                </label>
                {/* Description */}
                <textarea
                  value={formik.values.description}
                  onChange={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
                  rows='5'
                  cols='10'
                  className='rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none'
                  type='text'
                ></textarea>
                {/* Image component */}
                {/* <label
                  htmlFor='password'
                  className='block text-sm font-medium mt-3 mb-2 text-gray-700'
                >
                  Select image to upload
                </label>
                <div className='container bg-gray-600 '>
                  <Container>
                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        formik.setFieldValue("image", acceptedFiles[0].path);
                      }}
                      accept='image/jpeg,image/png'
                      onBlur={formik.handleBlur("image")}
                    >
                      {({ getRootProps, getInputProps }) => {
                        return (
                          <div className='container'>
                            <div
                              {...getRootProps({
                                className: "dropzone",
                                onDrop: (event) => event.stopPropagation(),
                              })}
                            >
                              <input {...getInputProps()} />
                            </div>
                            <p>Click here to upload image</p>
                          </div>
                        );
                      }}
                    </Dropzone>
                  </Container>
                </div> */}
                <label
                  htmlFor='password'
                  className='block text-sm font-medium mt-3 mb-2 text-gray-900'
                >
                  Select image to upload
                </label>
                <Container className='container bg-gray-900'>
                  <Dropzone
                    onBlur={formik.handleBlur("image")}
                    accept='image/jpeg, image/png'
                    onDrop={(acceptedFiles) => {
                      formik.setFieldValue("image", acceptedFiles[0]);
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div className='container'>
                        <div
                          {...getRootProps({
                            className: "dropzone",
                            onDrop: (event) => event.stopPropagation(),
                          })}
                        >
                          <input {...getInputProps()} />
                          <p className='text-gray-300 text-lg cursor-pointer hover:text-gray-500'>
                            Click here to select image
                          </p>
                        </div>
                      </div>
                    )}
                  </Dropzone>
                </Container>
                {/* Err msg */}
                <div className='text-red-500'>
                  {formik.touched.title && formik.errors.title}
                </div>
              </div>
              <div>
                {/* Submit btn */}
                {loading ? (
                  <button
                    type='submit'
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600
                     '
                  >
                    Loading...
                  </button>
                ) : (
                  <button
                    type='submit'
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Create
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
