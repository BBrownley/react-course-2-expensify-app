import React from "react";
import ReactDOM from "react-dom";

const Info = props => {
  console.log(props);
  return (
    <div>
      <h1>Info</h1>
      <p>The info is: {props.info}</p>
    </div>
  );
};

const withAdminWarning = WrappedComponent => {
  // Think of it like a regular HOC... Passing down props from a parent component
  // Except this has an argument taking in a child component
  const component = props => {
    console.log(props);
    return (
      <div>
        {props.isAdmin && <p>This is private info. Please don't share!</p>}
        <WrappedComponent {...props} />
      </div>
    );
  };
  return component;
};

const requireAuthentication = WrappedComponent => {
  return props => (
    <div>
      {props.isAuthenticated ? (
        <WrappedComponent {...props} />
      ) : (
        <p>You are not authenticated - please sign in!</p>
      )}
    </div>
  );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

ReactDOM.render(
  <AuthInfo isAuthenticated={true} info="There are the details" />,
  document.getElementById("root")
);
