import styles from './Features.module.css';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ParticlesDemo from './scrolltext';

export default function Features() {
    const targetRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const text = "Diving into the world of AI with expresso";
    const letters = text.split(' ').map(word => `${word}  `);

    const textAnimations = letters.map((letter, index) => {
        const start = index / letters.length / 3;
        const end = start + 1 / letters.length / 3;
        const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
        const y = useTransform(scrollYProgress, [start, end], [20, 0]);
        return { opacity, y };
    });

   
    const particlesStart = 1 / 3;
    const particlesOpacity = useTransform(scrollYProgress, [particlesStart, particlesStart + 0.1 / 3], [0, 1]);
    const particlesY = useTransform(scrollYProgress, [particlesStart, particlesStart + 0.1 / 3], [80, 0]);

   
    const cards = Array(3).fill(0).map((_, index) => {
        const start = particlesStart + 0.1 / 3 + (index * 0.1 / 3);
        const end = start + 0.1 / 3;
        const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
        const x = useTransform(scrollYProgress, [start, end], [60, 0]);
        return { opacity, x };
    });

    return (
        <div className={styles.wrapper} ref={targetRef}>
            <motion.div className={styles.features} style={{ position: 'sticky', top: 0 }}>
                <div className={styles.left}>EXPRESSO</div>
                <div className={styles.right}>
                    <div className={styles.top}>
                        <motion.div className={styles.topLeftWrapper} style={{ opacity: particlesOpacity, y: particlesY }}>
                            <ParticlesDemo />
                        </motion.div>
                        <div className={styles.topRight}>
                            {cards.map((animation, index) => (
                                <motion.div key={index} className={styles.card} style={{ opacity: animation.opacity, x: animation.x }}>
                                    <h2>Latency</h2>
                                    <p>Dive into the world of AI with expresso </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.textContainer}>
                            {letters.map((letter, index) => (
                                <motion.span key={index} style={{ opacity: textAnimations[index].opacity, y: textAnimations[index].y }} className={styles.letter}>
                                    {letter}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
