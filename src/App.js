import { useState } from "react";
import AddComment from "./Components/AddComment/AddComment";
import Modal from "./Components/Modal/Modal";
import CommentsSection from "./Components/CommentsSection/CommentsSection";
import { AuthContextProvider } from "./Context/auth-context";
import jsonData from "./data/data.json";
//import { commentScheme } from "./data/commentScheme";


function App() {
  const [modalOpen, setModalOpen] = useState({open:false,id:0});
  const [comments, setComments] = useState(jsonData.comments);
  const currentUser = jsonData.currentUser;

  const openModal = (id) => {
    setModalOpen({open:true,id:id});
  };

  const closeModal = () => {
    setModalOpen({open:false,id:0});
  };

  const addComment = (newValue) => {
    setComments([...comments,{
      id:Math.random(),
      content:newValue,
      createdAt:'Today',
      score:1,
      user:currentUser,
      replies:[]
    }])
  };

  const addReply = (newValue, replyId) =>{
    let newTextReply = {
      id:Math.random(),
      content:newValue,
      createdAt:'Today',
      score:1,
      user:currentUser,
      replies:[]
    }
    let newComments = comments;
    newComments.forEach(obj => {      
      addReplyWithID(obj,replyId,newTextReply);
    });
    console.log(newComments);
    setComments(newComments);
  }

  const deleteComment = (idToDelete) =>{
    let newComments = comments;
    newComments.forEach(obj => {
      deleteCommentByID(obj, idToDelete);
    });
    setComments(newComments);
  }

  const addReplyWithID = (obj,selectedID,newTextReply) =>{
    if(obj.id === selectedID){
      if(!obj.replies){
        obj.replies =[]
      }      
      obj.replies.push(newTextReply);
    } 
    else if(Array.isArray(obj.replies)){
      obj.replies.forEach(reply =>{
        addReplyWithID(reply,selectedID,newTextReply);
      })
    }
  }

  const deleteCommentByID = (obj, selectedID) =>{
    if(obj.replies){
      obj.replies = obj.replies.filter(reply => reply.id !== selectedID);
      obj.replies.forEach(reply => deleteCommentByID(reply, selectedID));
    }
  }


  return (
    <div className="App">
      <AuthContextProvider
        user={jsonData.currentUser}
        openModal={openModal}
        addComment={addComment}
        deleteComment={deleteComment}
        addReply={addReply}
      >
        <CommentsSection comments={comments} currentUser={currentUser} />
        <AddComment currentUser={currentUser} type='comment'/>
        {modalOpen.open && <Modal onClose={closeModal} passID={modalOpen.id}></Modal>}
      </AuthContextProvider>
    </div>
  );
}

export default App;
