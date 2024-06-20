

import styles from './hero.module.css';
type HeroProps = {
    prop: any;
};

export default function Hero() {
    

    return (
        <div id={styles.hero} >
            <div className="heroContainer">
                <div className={styles.hero1}></div>
                <div className={styles.hero2}></div>
                <div className={styles.hero3}></div>
               
            </div>
        </div>
    );
}

