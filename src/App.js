import { useState , useEffect } from "react";
import AddComment from "./Components/AddComment/AddComment";
import Modal from "./Components/Modal/Modal";
import CommentsSection from "./Components/CommentsSection/CommentsSection";
import { AuthContextProvider } from "./Context/auth-context";
//import jsonData from "./data/data.json";
import { database } from './firebaseConfig';
import { getDatabase, ref, child, push, get, update,set } from "firebase/database";
//import { commentScheme } from "./data/commentScheme";



function App() {
 // const [data, setData] = useState(null);
  const [modalOpen, setModalOpen] = useState({open:false,id:0});
  const [comments, setComments] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const dbRef = ref(database); 
    get(child(dbRef, '/')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        const data = snapshot.val();
        setComments(Object.values(data.comments));
        setCurrentUser(data.currentUser);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const openModal = (id) => {
    setModalOpen({open:true,id:id});
  };

  const closeModal = () => {
    setModalOpen({open:false,id:0});
  };

  const addComment = (newValue) => {
    const db = getDatabase();
    const commentsRef = ref(db, 'comments'); 
    const newCommentRef = push(commentsRef); 
    const newCommentKey = newCommentRef.key; 

    const newComment = {
      id: newCommentKey,
      content: newValue,
      createdAt: 'Today',
      score: 1,
      user: currentUser,
      replies: [],
    };

    set(newCommentRef, newComment)
    .then(() => {
      setComments([...comments, newComment]);
    })
    .catch((error) => {
      console.error('Error al agregar el comentario:', error);
    });
  };

  const addReply = (newValue, replyPath, parentCommentID) =>{
   const newReplyKey = push(ref(database, 'comments/' + replyPath)).key;
   const newPath = replyPath + newReplyKey ;
    
    let newTextReply = {
      id:newReplyKey,
      content:newValue,
      createdAt:'Today',
      score:1,
      user:currentUser,
      replies:[]
    }     
    update(ref(database, 'comments/' + newPath), newTextReply)
    .then(() => {
      let newComments = [...comments];
      newComments.forEach(obj => {      
        addReplyWithID(obj,parentCommentID,newTextReply);
      });
      setComments(newComments);
    })
    .catch((error) => {
      console.error('Error al agregar la respuesta:', error);
    });
    /*
    let newComments = [...comments];
    newComments.forEach(obj => {      
      addReplyWithID(obj,replyId,newTextReply);
    });
    setComments(newComments);*/
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

  const deleteComment = (idToDelete) =>{
    let newComments = [...comments];
    newComments.forEach(obj => {
      deleteCommentByID(obj, idToDelete);
    });
    setComments(newComments);
  }

  const deleteCommentByID = (obj, selectedID) =>{
    if(obj.id === selectedID){

    }
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
      {(comments && comments.length > 0 && currentUser) ? (
        <AuthContextProvider
        user={currentUser}
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
      ) : (
        <section className="loading">Loading content...</section>
      )
      }      
    </div>
  );
}

export default App;
