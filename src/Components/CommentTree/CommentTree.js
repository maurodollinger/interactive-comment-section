import { Fragment, useState } from "react";
import Comment from "../Comment/Comment";
import AddComment from "../AddComment/AddComment";
import RepliesContainer from "../UI/RepliesContainer/RepliesContainer";

const CommentTree = ({ comments, currentUser }) => {
  const [activeReplies, setActiveReplies] = useState([]);

  const openActiveReply = (id) => {
    setActiveReplies((prevState) => [...prevState, id]);
  };

  const closeActiveReply = (id) => {
    setActiveReplies((prevState) => prevState.filter((replyId) => replyId !== id));
    console.log('close')
  };


  return (
      <Fragment>
        {comments.map((comment)=>{
          return (
            <Fragment key={comment.id}>
              <Comment data={comment} onActiveReply={openActiveReply} closeActiveReply={()=>closeActiveReply(comment.id)}  activeReply={activeReplies.includes(comment.id)}/>
              {activeReplies.includes(comment.id) && (
                  <AddComment currentUser={currentUser} replyId={comment.id} replyUser={comment.user} type="reply" closeActiveReply={()=>closeActiveReply(comment.id)} />
              )}
              {comment.replies && comment.replies.length > 0 && (
                <RepliesContainer>
                  <CommentTree comments={comment.replies} currentUser={currentUser} />
                </RepliesContainer>
              )}
            </Fragment>
          )
        })}
      </Fragment>
  );
};

export default CommentTree;
