import { Fragment } from "react";
import styles from "./CommentsSection.module.scss";
import Comment from "../Comment/Comment";
import RepliesContainer from "../UI/RepliesContainer/RepliesContainer";

const CommentsSection = ({ comments }) => {
  console.log(comments);
  return (
    <section id={styles.commentsContainer}>
      <div className={styles.container}>
        {comments.map((el) =>
         {
          return <Fragment>
            <Comment data={el}/>
            {(el.replies.length >0) && 
            <RepliesContainer>
              {el.replies.map((reply =>{
                return <Comment data={reply}/>
              }))}
            </RepliesContainer>
            }
          </Fragment>
           
        })}
      </div>
    </section>
  );
};

export default CommentsSection;
