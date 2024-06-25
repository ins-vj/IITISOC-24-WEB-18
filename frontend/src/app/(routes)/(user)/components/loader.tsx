
"use client";


import { useEffect, useState } from 'react';
import styles from './loading.module.css'
import Image from 'next/image'
import Logo from './logo'

export default function Loader() {

   
        return (
            <div className='w-[100%] h-[100%] flex justify-center items-center '>
<div className=''>
  
            <div className=' animate-spin '>
            <Logo width={80}/>
            </div>
            </div>

            </div>
        )
    
}










