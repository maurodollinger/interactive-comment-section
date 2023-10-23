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
    let newComments = [...comments];
    newComments.forEach(obj => {      
      addReplyWithID(obj,replyId,newTextReply);
    });
    setComments(newComments);
  }

  const deleteComment = (idToDelete) =>{
    let newComments = [...comments];
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

  const updateComment = (value, id) =>{
    const newComments = updateCommentById([...comments],id,value);
    setComments(newComments);
  }

  const updateCommentById = (comments, id, newValue) => {
    return comments.map(comment => {
      if (comment.id === id) {
        return { ...comment, content: newValue };
      } else if (comment.replies && comment.replies.length > 0) {
        const newReplies = updateCommentById(comment.replies, id, newValue);
        return { ...comment, replies: newReplies };
      }
      return comment;
    });
  };

  const handleVote = (value ,id) =>{
    const newComments = updateScoreById([...comments],id, value);
    setComments(newComments);
  }
  
  const updateScoreById = (comments,id,newScore) =>{
    return comments.map(comment => {
      if(comment.id === id) {
        return {...comment, score: comment.score + newScore}
      } else if (comment.replies && comment.replies.length >0) {
        const newReplies = updateScoreById(comment.replies,id,newScore);
        return {...comment,replies:newReplies};
      }
      return comment
    })
  }

  return (
    <div className="App">
      <AuthContextProvider
        user={jsonData.currentUser}
        openModal={openModal}
        addComment={addComment}
        deleteComment={deleteComment}
        addReply={addReply}
        onUpdateComment={updateComment}
        updateScore={handleVote}
      >
        <CommentsSection comments={comments} currentUser={currentUser} />
        <AddComment currentUser={currentUser} type='comment'/>
        {modalOpen.open && <Modal onClose={closeModal} passID={modalOpen.id}></Modal>}
      </AuthContextProvider>
    </div>
  );
}

export default App;
