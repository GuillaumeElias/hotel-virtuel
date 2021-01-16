import React from "react";

const BackButton = ({ history, match, location }) => {
  const goBack = () => {
    history.goBack();
  };

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
