import React from "react";

const BackButton = ({ history, match, path }) => {
  const goBack = () => {
    history.push(path);
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
