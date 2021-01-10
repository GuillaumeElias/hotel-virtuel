import React from "react";

const BackButton = ({ history, match, location }) => {
  const goBack = () => {
    history.goBack();
  };

  console.log("location", location);

  if (location.pathname === "/") {
    return <div />;
  }

  return (
    <div>
      <a onClick={goBack}>
        <img src="/images/back.png" alt="back" />
      </a>
    </div>
  );
};

export default BackButton;
