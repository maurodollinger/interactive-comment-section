import styles from "./LikeAction.module.scss";

const LikeAction = (props) => {
  return (
    <div
      className={`${styles.likeContainer} ${
        !props.enabled ? styles.disabled : ""
      }`}
    >
      <button className={styles.plus} onClick={() => props.vote(1)}>
        <img src="./images/icon-plus.svg" alt="plus" />
      </button>
      <label className={styles.label}>{props.score}</label>
      <button className={styles.minus} onClick={() => props.vote(-1)}>
        <img src="./images/icon-minus.svg" alt="minus" />
      </button>
    </div>
  );
};

export default LikeAction;
