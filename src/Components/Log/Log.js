import ReactDOM from "react-dom";
import { Fragment } from "react";
import Card from "../UI/Card/Card";
import styles from './Log.module.scss';

const LogModule = (props) => {
  return <div className={`${styles.errorModal} ${(props.error!=='') ? styles.error : styles.success} ${(props.active) ? styles.on : ''}`}>
    <Card className={styles.errorCard}>
        <p>{props.message + props.error}</p>
        <button onClick={()=>props.dismiss()}>dismiss</button>
    </Card>
    </div>;
};

const Log = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <LogModule active={props.active} message={props.message} error={props.error} dismiss={()=>props.dismiss()}/>,
        document.getElementById("error-root")
      )}
    </Fragment>
  );
};

export default Log;
