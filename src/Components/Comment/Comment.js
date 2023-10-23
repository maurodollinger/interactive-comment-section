import {Fragment, useContext} from 'react';
import AuthContext from '../../Context/auth-context';
import Card from "../UI/Card/Card";
import LikeAction from "../UI/LikeAction/LikeAction";
import SmallButton from "../UI/SmallButton/SmallButton";
import styles from "./Comment.module.scss";

const Comment = ({ data , onActiveReply, closeActiveReply, activeReply }) => {
  const {username, openModal} = useContext(AuthContext);
  
  const handleDelete = ()=>{
    openModal(data.id);
  }

  const handleActiveReply = () =>{
    if(!activeReply){
      onActiveReply(data.id);
    } else{
      closeActiveReply(data.id);
    }
    
  }

  const handleEdit = () =>{
    
  }
  
  return (
    <Card className={styles.commentContainer} >
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
          {(data.user.username === username) ?
            <Fragment>
              <SmallButton type="delete" onClick={handleDelete}/>
              <SmallButton type="edit" onClick={handleEdit}/>
             </Fragment>
             : <SmallButton active={activeReply} type="reply" onClick={handleActiveReply}/>
          }          
          
        </div>
        <div className={styles.comment}>
          <p>{data.content}</p>
        </div>
      </div>
     
    </Card>
  );
};

export default Comment;
