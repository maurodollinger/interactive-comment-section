import ReactDOM from "react-dom";
import { Fragment } from "react";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import styles from "./Modal.module.scss";

const Backdrop = () => {
  return <div className={styles.backdrop}></div>;
};

const OverlayModal = (props) => {
  return (
    <div className={styles.modal}  onClick={props.onClose}>
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
          <Button type='red'>YES, DELETE</Button>
        </footer>
      </Card>
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop/>,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <OverlayModal onClose={props.onClose} />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default Modal;