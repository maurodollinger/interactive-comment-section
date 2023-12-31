import { useContext, useRef , useState, useEffect} from "react";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import styles from "./AddComment.module.scss";
import AuthContext from "../../Context/auth-context";

const AddComment = ({ currentUser, replyUser, replyPath, parentCommentID, type , closeActiveReply}) => {
  const { addComment, addReply } = useContext(AuthContext);
  const [fadeIn,setFadeIn] = useState(false);
  const textareaRef = useRef(null);

  const handleSend = () => {
    if(textareaRef.current.value !== '') addComment(textareaRef.current.value);
  };

  const handleReply = () => {
    addReply(textareaRef.current.value, replyPath, parentCommentID, replyUser.username);
    closeActiveReply();
  };

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <section className={`${styles.addcomment} ${fadeIn ? styles.fadeIn : ''}`}>
      <div className={styles.container}>
        <Card className={styles.card}>
          <div className={styles.leftSide}>
            <img src={currentUser.image.webp} alt="user"></img>
          </div>
          {!replyUser && (
            <textarea
              ref={textareaRef}
              placeholder="Add a comment..."
            ></textarea>
          )}
          {replyUser && (
            <textarea
              ref={textareaRef}
             /* placeholder={`@${replyUser.username}`}
              defaultValue={`@${replyUser.username} `}*/
            ></textarea>
          )}
          <div className={styles.rightSide}>
            {type === "comment" && (
              <Button type="blue" onClick={handleSend}>
                SEND
              </Button>
            )}
            {type === "reply" && (
              <Button type="blue" onClick={handleReply}>
                REPLY
              </Button>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default AddComment;
