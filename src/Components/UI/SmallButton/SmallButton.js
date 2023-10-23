import styles from "./SmallButton.module.scss";

const SmallButton = (props) => {
  let imgUrl;
  let classType;

  switch (props.type) {
    case "edit":
    default:
      imgUrl = "./images/icon-edit.svg";
      classType = styles.edit;
      break;
    case "delete":
      imgUrl = "./images/icon-delete.svg";
      classType = styles.delete;
      break;
    case "reply":
      imgUrl = "./images/icon-reply.svg";
      classType = styles.reply;
      break;
  }

  return (
    <button className={`${styles.smallbutton} ${classType} ${(props.active) ? styles.active : ''}`} onClick={props.onClick}>
      <img src={imgUrl} alt={props.type}></img>
      {props.type === "edit" && "Edit"}
      {props.type === "delete" && "Delete"}
      {props.type === "reply" && "Reply"}
    </button>
  );
};

export default SmallButton;
