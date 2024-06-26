
"use client";


import { useEffect, useState } from 'react';
import styles from './loading.module.css'
import Image from 'next/image'
import Logo from './logo'
import Flip from './flip'
export default function Loader(props:any) {

   
        return (
            <div className='  absolute top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center'>
<div className=' flex flex-col gap-6'>
  
            <div className=' '>
            <Flip
      className="text-4xl font-bold tracking-[-0.1em] text-black dark:text-white md:text-7xl md:leading-[5rem]"
      word={`Welcome, ${props.user}`}
    />
            </div>
            </div>

            </div>
        )
    
}










