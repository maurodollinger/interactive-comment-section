import { useState, useEffect, Fragment } from "react";
import AddComment from "../AddComment/AddComment";
import Modal from "../Modal/Modal";
import CommentsSection from "../CommentsSection/CommentsSection";
import { AuthContextProvider } from "../../Context/auth-context";
import Log from "../Log/Log";
import { database } from "../../firebaseConfig";
import {
  getDatabase,
  ref,
  child,
  push,
  get,
  update,
  set,
  remove,
} from "firebase/database";

function Home() {
  const [modalOpen, setModalOpen] = useState({ open: false, id: 0, path: "" });
  const [messageLog, setMessageLog] = useState({
    open: false,
    message: "",
    error: "",
  });
  const [comments, setComments] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, "/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setComments(Object.values(data.comments));
          // get a random user
          const users = Object.values(data.users);
          const randomUser = users[Math.floor(Math.random()*users.length)];
          setCurrentUser(randomUser);
         //printMessageLog("You have succesfully logged in as " + randomUser.username, "");
        } else {
            printMessageLog("No data available: ", "error");
        }
      })
      .catch((error) => {
        printMessageLog("Error loading content: ", error);
      });
  }, []);

  const printMessageLog = (message,error) =>{
    setMessageLog({
        open: true,
        message: message,
        error: error,
    });
    setTimeout(() => {
    setMessageLog({ open: false, message: message, error: error });
    }, 3000);
  }

  const openModal = (id, path) => {
    setModalOpen({ open: true, id: id, path: path });
  };

  const closeModal = () => {
    setModalOpen({ open: false, id: 0, path: "" });
  };

  const addComment = (newValue) => {
    const db = getDatabase();
    const commentsRef = ref(db, "comments");
    const newCommentRef = push(commentsRef);
    const newCommentKey = newCommentRef.key;

    const newComment = {
      id: newCommentKey,
      content: newValue,
      createdAt: getActualDate(),
      score: 1,
      user: currentUser,
      replies: [],
    };

    set(newCommentRef, newComment)
      .then(() => {
        setComments([...comments, newComment]);
      })
      .catch((error) => {
        printMessageLog("Error adding content: ", error);
      });
  };

  const addReply = (newValue, replyPath, parentCommentID, replyUser) => {
    const newReplyKey = push(ref(database, "comments/" + replyPath)).key;
    const newPath = replyPath + newReplyKey;

    let newTextReply = {
      id: newReplyKey,
      content: newValue,
      createdAt: getActualDate(),
      replyingTo:replyUser,
      score: 1,
      user: currentUser,
      replies: [],
    };

    update(ref(database, "comments/" + newPath), newTextReply)
      .then(() => {
        const newComments = [...comments];
        newComments.forEach((obj) => {
          addReplyWithID(obj, parentCommentID, newTextReply);
        });
        setComments(newComments);
      })
      .catch((error) => {
        printMessageLog("Error adding response: ", error);
      });
  };

  const addReplyWithID = (obj, selectedID, newTextReply) => {
    if (obj.id === selectedID) {
      if (!obj.replies) {
        obj.replies = [];
      } else {
        obj.replies = Object.values(obj.replies);
      }
      obj.replies.push(newTextReply);
    } else if (obj.replies) {
      Object.values(obj.replies).forEach((reply) => {
        addReplyWithID(reply, selectedID, newTextReply);
      });
    }
  };

  const deleteComment = (idToDelete, pathToDelete) => {
    const db = getDatabase();
    const refDelete = ref(db, "comments/" + pathToDelete);

    remove(refDelete)
      .then(() => {
        const newComments = [...comments];
        newComments.forEach((comment, index) => {
          newComments[index] = deleteCommentByID(comment, idToDelete);
        });
        const filteredComments = newComments.filter(
          (comment) => comment !== null
        );
        setComments(filteredComments);
      })
      .catch((error) => {
        printMessageLog("Error deleting data: ", error);
      });
  };

  const deleteCommentByID = (obj, selectedID) => {
    if (obj.replies && Object.values(obj.replies).length) {
      obj.replies = Object.values(obj.replies).filter(
        (reply) => reply.id !== selectedID
      );
      obj.replies.forEach((reply) => deleteCommentByID(reply, selectedID));
    } else {
      if (obj.id === selectedID) {
        return null;
      }
    }
    return obj;
  };

  const updateComment = (value, idToUpdate, pathToUpdate) => {
    const db = getDatabase();
    const commentRef = ref(db, "comments/" + pathToUpdate);
    update(commentRef, {
      content: value,
    })
      .then(() => {
        const newComments = updateCommentById([...comments], idToUpdate, value);
        setComments(newComments);
      })
      .catch((error) => {
        printMessageLog("Error updating comment: ", error);
      });
  };

  const updateCommentById = (comments, id, newValue) => {
    return comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, content: newValue };
      } else if (comment.replies) {
        const newReplies = updateCommentById(
          Object.values(comment.replies),
          id,
          newValue
        );
        return { ...comment, replies: newReplies };
      }
      return comment;
    });
  };

  const handleVote = (newScore, idToUpdate, path) => {
    const db = getDatabase();
    const commentRef = ref(db, "comments/" + path);
    update(commentRef, {
      score: newScore,
    })
      .then(() => {
        const newComments = updateScoreById(
          [...comments],
          idToUpdate,
          newScore
        );
        setComments(newComments);
      })
      .catch((error) => {
        printMessageLog("Error updating comment: ", error);
      });
  };

  const updateScoreById = (comments, id, newScore) => {
    return comments.map((comment) => {
      if (comment.id === id) {
        return { ...comment, score: newScore };
      } else if (comment.replies && Object.values(comment.replies).length > 0) {
        const newReplies = updateScoreById(
          Object.values(comment.replies),
          id,
          newScore
        );
        return { ...comment, replies: newReplies };
      }
      return comment;
    });
  };

  return (
    <Fragment >
      {comments && comments.length > 0 && currentUser ? (
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
          <AddComment currentUser={currentUser} type="comment" />
          {modalOpen.open && (
            <Modal
              onClose={closeModal}
              passID={modalOpen.id}
              path={modalOpen.path}
            ></Modal>
          )}
          <Log
            active={messageLog.open}
            message={messageLog.message}
            error={messageLog.error}
            dismiss={() => setMessageLog({ open: false, message: "", error: "" })}
          ></Log>
        </AuthContextProvider>
      ) : (
        <section className="loading">Loading comments...</section>
      )}
    </Fragment>
  );
}

export default Home;

function getActualDate() {
  const actualDate = new Date();
  const year = actualDate.getFullYear();
  const month = String(actualDate.getMonth() + 1).padStart(2, "0");
  const day = String(actualDate.getDate()).padStart(2, "0");
  const hours = String(actualDate.getHours()).padStart(2, "0");
  const minutes = String(actualDate.getMinutes()).padStart(2, "0");
  const seconds = String(actualDate.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
