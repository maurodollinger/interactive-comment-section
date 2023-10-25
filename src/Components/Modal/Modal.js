import { useContext ,useState, useEffect} from "react";
import AuthContext from "../../Context/auth-context";
import ReactDOM from "react-dom";
import { Fragment } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import styles from "./Modal.module.scss";

const Backdrop = (props) => {
  return <div className={`${styles.backdrop} ${props.className}`}></div>;
};

const OverlayModal = (props) => {
  return (
    <div className={`${styles.modal} ${props.className}`}  onClick={props.onClose}>
      <Card className={styles.modalContent}>
        <header>
          <h2>Delete comment</h2>
        </header>
        <div>
          <p>
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </p>
        </div>
        <footer className={styles.actions}>
          <Button type='gray' onClick={props.onClose}>NO, CANCEL</Button>
          <Button type='red' onClick={()=>props.onDelete()}>YES, DELETE</Button>
        </footer>
      </Card>
    </div>
  );
};

const Modal = (props) => {
  const [fadeIn,setFadeIn] = useState(false);

  const {deleteComment} = useContext(AuthContext);

  const handleDelete = () =>{
    deleteComment(props.passID,props.path);
  }

  useEffect(() => {
  setFadeIn(true);
}, []);
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop className={fadeIn ? styles.fadeIn : ''}/>,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <OverlayModal className={fadeIn ? styles.fadeIn : ''} onClose={props.onClose} onDelete={handleDelete}/>,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Modal;
