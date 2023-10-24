import { Fragment, useState } from "react";
import Comment from "../Comment/Comment";
import AddComment from "../AddComment/AddComment";
import RepliesContainer from "../UI/RepliesContainer/RepliesContainer";

const CommentTree = ({ comments, currentUser , path}) => {
  const [activeReplies, setActiveReplies] = useState([]);
  const [activeEdits, setActiveEdits] = useState([]);

  const openActiveReply = (id) => {
    setActiveReplies((prevState) => [...prevState, id]);
  };

  const closeActiveReply = (id) => {
    setActiveReplies((prevState) =>
      prevState.filter((replyId) => replyId !== id)
    );
  };

  const openActiveEdit = (id) =>{
    setActiveEdits((prevState => [...prevState,id]));
  }

  const closeActiveEdit = (id) =>{
    setActiveEdits((prevState)=> 
      prevState.filter((_id)=>_id !== id)
    );
  }

  return (
    <Fragment>
      {comments.map((comment) => {
        return (
          <Fragment key={comment.id}>
            <Comment
              data={comment}
              onActiveReply={openActiveReply}
              closeActiveReply={() => closeActiveReply(comment.id)}
              activeReply={activeReplies.includes(comment.id)}
              onActiveEdit={openActiveEdit}
              activeEdit={activeEdits.includes(comment.id)}
              closeActiveEdit={()=>closeActiveEdit(comment.id)}
            />
            {activeReplies.includes(comment.id) && (
              <AddComment
                currentUser={currentUser}
                replyPath={path + comment.id + '/replies/'}
                parentCommentID={comment.id}
                replyUser={comment.user}
                type="reply"
                closeActiveReply={() => closeActiveReply(comment.id)}
              />
            )}
            {comment.replies && Object.values(comment.replies).length > 0 && (
              <RepliesContainer>
                <CommentTree
                  comments={Object.values(comment.replies)}
                  currentUser={currentUser}
                  path={path+ comment.id + '/replies/'}
                />
              </RepliesContainer>
            )}
          </Fragment>
        );
      })}
    </Fragment>
  );
};

export default CommentTree;
