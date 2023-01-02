import React from "react";
import RingLoader from "react-spinners/RingLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loading = () => {
  return (
    <>
      <RingLoader
        color='red'
        loading='true'
        cssOverride={override}
        size={150}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
      ;
    </>
  );
};

export default Loading;
