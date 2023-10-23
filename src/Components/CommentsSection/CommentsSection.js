import styles from "./CommentsSection.module.scss";
import CommentTree from "../CommentTree/CommentTree";

const CommentsSection = ({ comments, currentUser }) => {
  return (
    <section id={styles.commentsContainer}>
      <div className={styles.container}>
        <CommentTree comments={comments} currentUser={currentUser} />
      </div>
    </section>
  );
};

export default CommentsSection;
