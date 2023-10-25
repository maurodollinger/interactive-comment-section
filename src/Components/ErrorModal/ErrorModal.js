import ReactDOM from "react-dom";
import { Fragment } from "react";
import Card from "../UI/Card/Card";
import styles from './ErrorModal.module.scss';

const ErrorLog = (props) => {
  return <div className={`${styles.errorModal} ${(props.active) ? styles.on : ''}`}>
    <Card className={styles.errorCard}>
        <p>{props.message + props.error}</p>
        <button onClick={()=>props.dismiss()}>dismiss</button>
    </Card>
    </div>;
};

const ErrorModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ErrorLog active={props.active} message={props.message} error={props.error} dismiss={()=>props.dismiss()}/>,
        document.getElementById("error-root")
      )}
    </Fragment>
  );
};

export default ErrorModal;
