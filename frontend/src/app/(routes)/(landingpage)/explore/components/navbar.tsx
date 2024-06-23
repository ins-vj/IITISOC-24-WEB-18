import Image from 'next/image'
import { cn } from "@/lib/utils";
import Link from 'next/link'
import AnimatedGradientText from './gradienttext'
export default function Navbar() {
    return (

        <div className=" flex justify-between items-center w-[100%] h-[5rem] p-[10px]">
            <Image src="/data/logos/logo.png" width={150} height={50} alt='Expresso' className='p-[10px]'></Image>

            <div className=' flex '>
                <div>
                    <div className="z-10 flex min-h-[16rem] items-center justify-center p-[15px] text-[#d0d0d0]" >
                       <Link href="/login">Login</Link>
                    </div>
                </div>
                <div>
                <Link href="/signup">
                    <div className="z-10 flex min-h-[16rem] items-center justify-center p-[15px]">
                        <AnimatedGradientText>
                        
                            <span
                                className={cn(
                                    `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                                )}
                            >
                                Sign Up
                            </span>
                           

                        </AnimatedGradientText>
                    </div>
                    </Link>
                </div>
            </div>
        </div>


    );
}