
"use client";


import { useEffect, useState } from 'react';
import styles from './loading.module.css'
import Image from 'next/image'
import Logo from './logo'

export default function Loader(props:any) {

   
        return (
            <div className='  absolute top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center'>

  
            <div className=' animate-spin flex justify-center items-center'>
            <Logo width={80} />
            </div>
      

            </div>
        )
    
}










