import {useContext} from 'react';
import AuthContext from '../../Context/auth-context';
import Card from "../UI/Card/Card";
import LikeAction from "../UI/LikeAction/LikeAction";
import SmallButton from "../UI/SmallButton/SmallButton";
import styles from "./Comment.module.scss";

const Comment = ({ data }) => {
  const {openModal} = useContext(AuthContext);

  const handleClick = ()=>{
    openModal();
  }
  
  return (
    <Card className={styles.commentContainer}>
      <div className={styles.leftSide}>
          <LikeAction/>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.author}>
          <img src={data.user.image.webp} alt="author"></img>
          <div>{data.user.username}</div>
          <span>{data.createdAt}</span>
        </div>
        <div className={styles.actions}>
          <SmallButton type="edit" onClick={handleClick}/>
          <SmallButton type="delete" onClick={handleClick}/>
          <SmallButton type="reply" onClick={handleClick}/>
        </div>
        <div className={styles.comment}>
          <p>{data.content}</p>
        </div>
      </div>
     
    </Card>
  );
};

export default Comment;
