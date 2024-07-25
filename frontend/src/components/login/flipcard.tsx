import styles from  './flipcard.module.css';
import Image from 'next/image';
export default function flipCard(){
    return(

        <div  className={styles.card}>
        <div className={`${styles.cardside} ${styles.front} `}>
         <Image src="/data/logos/expresslogin.png" alt="expresso" width={500} height={100} className=' brightness-0 invert'/>

        </div>
        <div className={`${styles.cardside} ${styles.back}`}>
        <Image src="/data/logos/expresssignup.png" alt="expresso" width={500} height={100} className=' brightness-0 invert'/>
  
        </div>
    </div>


    );


}