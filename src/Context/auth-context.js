import React from "react";

const AuthContext = React.createContext({
  username: "",
  userimage: "",
  openModal: () => {},
  addComment: () => {},
  deleteComment: ()=>{},
  addReply: ()=>{},
  onUpdateComment: ()=>{}
});

export const AuthContextProvider = (props) => {
  return (
    <AuthContext.Provider
      value={{
        username: props.user.username,
        userimage: props.user.image.png,
        openModal: props.openModal,
        addComment: props.addComment,
        deleteComment:props.deleteComment,
        addReply:props.addReply,
        onUpdateComment:props.onUpdateComment
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
