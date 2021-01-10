import React from "react";

const BackButton = ({ history, match, location }) => {
  const goBack = () => {
    history.goBack();
  };

  console.log("location", location);

  if (location.pathname == "/") {
    return <div />;
  }

  return (
    <div>
      <button onClick={goBack} className="btn btn-outline-light">
        Back
      </button>
    </div>
  );
};

export default BackButton;
