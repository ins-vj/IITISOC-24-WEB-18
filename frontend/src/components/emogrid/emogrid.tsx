"use client";
import styles from './emogrid.module.css';
import data from './data.json'; 
import Image from 'next/image';
import { useEffect, useState } from 'react';


export default function Emogrid(){

    const [count, setCount] = useState<number>(0);


  const updateCount = () => {
    setCount(prevCount => prevCount + 1);
  };


  useEffect(() => {
    const intervalId = setInterval(updateCount, 1000); 

  
    return () => clearInterval(intervalId);
  }, []);

    function getRandomInteger() {
        return Math.floor(Math.random() * 115) + 1;
      }

 

return(

    <>
    
    <div className={styles.grid}>
    
                            <div className={styles.gridblock}><div><Image src={data[getRandomInteger()]} width={30} height={30} alt=""></Image></div></div>
                            <div className={styles.gridblock}><div></div></div>
                            <div ></div>
                            <div className={styles.gridblock}><div><Image src={data[getRandomInteger()]} width={30} height={30} alt=""></Image></div></div>
                            <div className={styles.gridblock}><div></div></div>

                            <div className={styles.gridblock}><div></div></div>
                            <div className={styles.gridblock}><div></div></div>
                            <div className={styles.gridblock}><div><Image src={data[getRandomInteger()]} width={30} height={30} alt=""></Image></div></div>
                            <div className={styles.gridblock}><div></div></div>
                            <div ></div>
                            
                            {/* <div className={styles.gridblock}><div></div></div>
                            <div className={styles.gridblock}><div></div></div>
                            <div className={styles.gridblock}><div></div></div>
                            <div ></div>
                            <div className={styles.gridblock}><div><Image src={data[getRandomInteger()]} width={30} height={30} alt=""></Image></div></div> */}

                            <div className={styles.gridblock}><div><Image src={data[getRandomInteger()]} width={30} height={30} alt=""></Image></div></div>
                            <div className={styles.gridblock}><div></div></div>
                            <div className={styles.gridblock}><div></div></div>
                            <div ></div>
                            <div ></div>

                            <div className={styles.gridblock}><div></div></div>
                            <div className={styles.gridblock}><div><Image src={data[getRandomInteger()]} width={30} height={30} alt=""></Image></div></div>
                            <div></div>
                            <div className={styles.gridblock}><div></div></div>
                            <div ></div>
                            
                            
                            </div>
    
    
    </>




)










}