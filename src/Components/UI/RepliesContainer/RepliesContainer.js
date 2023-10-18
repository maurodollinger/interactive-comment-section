import styles from './RepliesContainer.module.scss';

const RepliesContainer = (props) =>{
    return <div className={styles.repliesContainer}>
        <div className={styles.leftSide}>
            <span></span>
        </div>
        <div className={styles.rightSide}>
            {props.children}
        </div>       
    </div>
}

export default RepliesContainer;