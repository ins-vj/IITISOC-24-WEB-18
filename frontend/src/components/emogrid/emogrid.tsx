"use client";
import styles from './emogrid.module.css';
import data from './data.json'; 
import Image from 'next/image';
import { useEffect, useState } from 'react';


export default function Emogrid(){

    const [count, setCount] = useState<number>(0);

  // Function to update the state variable
  const updateCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  // Effect to start interval when component mounts
  useEffect(() => {
    const intervalId = setInterval(updateCount, 1000); // Update count every 5000 milliseconds (5 seconds)

    // Cleanup function to stop interval when component unmounts
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
                            
                            <div className={styles.gridblock}><div></div></div>
                            <div className={styles.gridblock}><div></div></div>
                            <div className={styles.gridblock}><div></div></div>
                            <div ></div>
                            <div className={styles.gridblock}><div><Image src={data[getRandomInteger()]} width={30} height={30} alt=""></Image></div></div>

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