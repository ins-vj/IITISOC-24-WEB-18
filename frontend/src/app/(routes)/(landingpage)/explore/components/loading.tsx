
"use client";


import { useEffect, useState } from 'react';
import styles from './loading.module.css'
import Image from 'next/image'
import { NeonGradientCard } from "./neongrad";


export default function Loader() {

    const [loading1, setLoading1] = useState(true)
    useEffect(() => {
        setTimeout(() => setLoading1(false), 1000)
    }, [])
    const [loading2, setLoading2] = useState(true)
    useEffect(() => {
        setTimeout(() => setLoading2(false), 2000)
    }, [])
    
   

    if (loading1) {
        return (
            <div className=' flex justify-center items-center w-[100vw] h-[100vh] p-0 m-0   '>

                <div className={' gradient text-[5rem] '}>Connect</div>


            </div>
        )
    }
    else {

        if (loading2) {
            return (
                <div className=' flex justify-center items-center w-[100vw] h-[100vh] p-0 m-0   '>

                    <div className={' gradient text-[5rem] '}>Express</div>

                </div>
            )
        }
        else {

    
                return (
                    <div className=' flex justify-center items-center w-[100vw] h-[100vh] p-0 m-0 gap-[70px]  '>

<NeonGradientCard className=" max-w-md items-center justify-center text-center">
      <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
        AI
      </span>
    </NeonGradientCard>

                    </div>
                )
            
           
               

            }

        }

    }













