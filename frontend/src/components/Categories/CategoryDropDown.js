import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";

const CategoryDropDown = (props) => {
  //dispatch action
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  //select categories
  const category = useSelector((state) => state?.category);
  const { categoryList, loading } = category;
  const allCategories = categoryList?.map((category) => {
    return {
      label: category?.title,
      value: category?._id,
    };
  });
  //handle change
  const handleChange = (value) => {
    props.onChange("category", value);
  };
  //handle Blur
  const handleBlur = (value) => {
    props.onBlur("category", true);
  };
  return (
    <div style={{ margin: "1rem 0" }}>
      {loading ? (
        <h2 className='text-base text-green-600'>Loading.....</h2>
      ) : (
        <Select
          onChange={handleChange}
          onBlur={handleBlur}
          id='category'
          options={allCategories}
          value={props?.value?.label}
        />
      )}
      {/* display */}
      {props?.error && (
        <div style={{ color: "red", marginTop: ".5rem" }}>{props?.error}</div>
      )}
    </div>
  );
};

export default CategoryDropDown;
