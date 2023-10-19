import styles from './Button.module.scss';

const Button = (props) =>{
    let classType;
    switch(props.type){
        case 'blue':
        default:
            classType = styles.blue;
        break;
        case 'red':
            classType = styles.red;
        break;
        case 'gray':
            classType = styles.gray;
        break;
    }
    
    return <button className={`${styles.button} ${classType}`} onClick={props.onClick}>
        {props.children}
    </button>
}

export default Button;