import { Fragment, useContext, useRef } from "react";
import AuthContext from "../../Context/auth-context";
import Card from "../UI/Card/Card";
import LikeAction from "../UI/LikeAction/LikeAction";
import SmallButton from "../UI/SmallButton/SmallButton";
import Button from "../UI/Button/Button";
import styles from "./Comment.module.scss";

const Comment = ({
  data,
  onActiveReply,
  closeActiveReply,
  activeReply,
  onActiveEdit,
  activeEdit,
  closeActiveEdit
}) => {
  const { username, openModal, onUpdateComment } = useContext(AuthContext);
  const textareaRef = useRef(null);

  const handleDelete = () => {
    openModal(data.id);
  };

  const handleActiveReply = () => {
    if (!activeReply) {
      onActiveReply(data.id);
    } else {
      closeActiveReply(data.id);
    }
  };

  const handleEdit = () => {
    onActiveEdit(data.id);
  };

  const handleUpdate = () =>{
    onUpdateComment(textareaRef.current.value, data.id);
    closeActiveEdit(data.id);
  }

  return (
    <Card className={styles.commentContainer}>
      <div className={styles.leftSide}>
        <LikeAction />
      </div>
      <div className={styles.rightSide}>
        <div className={styles.author}>
          <img src={data.user.image.webp} alt="author"></img>
          <div>{data.user.username}</div>
          <span>{data.createdAt}</span>
        </div>
        <div className={styles.actions}>
          {data.user.username === username ? (
            <Fragment>
              <SmallButton disabled={activeEdit} type="delete" onClick={handleDelete} />
              <SmallButton disabled={activeEdit} type="edit" onClick={handleEdit} />
            </Fragment>
          ) : (
            <SmallButton
              active={activeReply}
              type="reply"
              onClick={handleActiveReply}
            />
          )}
        </div>
        <div className={styles.comment}>
          {activeEdit ? (
            <textarea
              ref={textareaRef}
              defaultValue={data.content}
            ></textarea>
          ) : (
            <p>{data.content}</p>
          )}        
        </div>
        {activeEdit && <div className={styles.buttonContainer}>
            <Button type='blue' onClick={handleUpdate}>UPDATE</Button>
          </div>}
        
      </div>
    </Card>
  );
};

export default Comment;
