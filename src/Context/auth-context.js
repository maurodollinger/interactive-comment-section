import React from "react";

const AuthContext = React.createContext({
  username: "",
  userimage: "",
});

export const AuthContextProvider = (props) => {
  return (
    <AuthContext.Provider
      value={{ username: props.user.username, userimage: props.user.image.png }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
