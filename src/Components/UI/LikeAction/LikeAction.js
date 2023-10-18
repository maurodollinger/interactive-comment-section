import styles from './LikeAction.module.scss';

const LikeAction = (props) => {
    return(
        <div className={styles.likeContainer}>
            <button className={styles.plus}><img src='./images/icon-plus.svg' alt='plus'/></button>
            <label className={styles.label}>5</label>
            <button className={styles.minus}><img src='./images/icon-minus.svg' alt='minus'/></button>
        </div>
    )
}

export default LikeAction;