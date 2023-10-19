import React from "react";

const AuthContext = React.createContext({
  username: "",
  userimage: "",
  openModal: ()=>{}
});

export const AuthContextProvider = (props) => {
  return (
    <AuthContext.Provider
      value={{ username: props.user.username, userimage: props.user.image.png ,openModal:props.openModal}}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
