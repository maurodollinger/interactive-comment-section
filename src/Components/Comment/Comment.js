import { Fragment, useContext, useRef, useState ,useEffect} from "react";
import { formatDistanceToNow } from 'date-fns';
import AuthContext from "../../Context/auth-context";
import Card from "../UI/Card/Card";
import LikeAction from "../LikeAction/LikeAction";
import SmallButton from "../UI/SmallButton/SmallButton";
import Button from "../UI/Button/Button";
import styles from "./Comment.module.scss";

const Comment = ({
  data,
  path,
  onActiveReply,
  closeActiveReply,
  activeReply,
  onActiveEdit,
  activeEdit,
  closeActiveEdit
}) => {
  const { username, openModal, onUpdateComment , updateScore} = useContext(AuthContext);
  const [enableScore,setEnableScore] = useState(true);
  const [fadeIn,setFadeIn] = useState(false);
  const textareaRef = useRef(null);

  const handleDelete = () => {
    openModal(data.id,path);
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
    if(textareaRef.current.value !== ''){
      onUpdateComment(textareaRef.current.value, data.id,path);
      closeActiveEdit(data.id);
    }   
  }

  const handleVote = (value) =>{
    updateScore(data.score+value, data.id, path);
    setEnableScore(false);
  }

  useEffect(() => {
    setFadeIn(true);
  }, []);
  
  return (
    data && 
    <Card className={`${styles.commentContainer} ${fadeIn ? styles.fadeIn : ''}`}>
      <div className={styles.leftSide}>
        <LikeAction score={data.score} vote={handleVote} enabled={enableScore}/>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.author}>
          <img src={data.user.image.webp} alt="author"></img>
          <div>{data.user.username}</div>
          <span>{            
          formatDistanceToNow(new Date(data.createdAt))
          }</span>
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
