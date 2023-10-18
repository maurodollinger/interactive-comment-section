import Button from '../UI/Button/Button';
import Card from '../UI/Card/Card';
import styles from './AddComment.module.scss';

const AddComment = ({data}) =>{
    return <section className={styles.addcomment}>
        <div className={styles.container}>
            <Card className={styles.card}>
                <div className={styles.leftSide}>
                    <img src={data.image.webp} alt="user"></img>
                </div>
                <textarea placeholder='Add a comment...'></textarea>
                <div className={styles.rightSide}>
                    <Button>SEND</Button>
                </div>
            </Card>
        </div>
    </section>
}

export default AddComment;