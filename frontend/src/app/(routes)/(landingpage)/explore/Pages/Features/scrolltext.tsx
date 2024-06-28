"use client";

import Particles from "@/components/magicui/particles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from './ParticlesDemo.module.css';


const ParticlesDemo = () => {
  
  return (
<>
      <span className={styles.topLeft}>
        <h1>Emoji Detection</h1>
        <ul>
                                <li>Our AI can actively detect emotions while communicating with friends,family,etc.</li>
                                <li>We used a pre trained Machine Learning Model to actively track how thhe user is feeling.</li>
                            </ul>
                          
      </span>
      <Particles
        className={styles.particles}
        quantity={100}
        ease={80}
    
        refresh
      />
    </>
  );
};

export default ParticlesDemo;
