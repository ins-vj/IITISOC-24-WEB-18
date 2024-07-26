"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import AnimatedGradientText from "./gradienttext";
import { logOut } from "@/helpers/auth";

export default function Navbar() {
  return (
    <div className=" flex justify-between items-center w-[100%] h-[5rem] p-3  ">
      <Image
        src="/data/logos/logo.png"
        width={200}
        height={70}
        alt="Expresso"
      ></Image>

      <div className=" flex">
        <div>
          <Link href="/login" className=" w-[200px] h-[100px] relative z-50">
            <div className="z-10 flex items-center justify-center px-[1rem] text-[1.3rem]">
                  Log In
            </div>
          </Link>
        </div>
        <div>
          <Link href="/login" className=" w-[200px] h-[100px] relative z-50">
            <div className="z-10 rounded-full border-[2px] flex items-center justify-center px-[1rem] text-[1.3rem]">
                  Sign Up
            </div>
          </Link>
        </div>
        {/* <div className="relative flex w-[100%] justify-between  gap-9 px-3 flex-col-reverse items-start md:flex-row md:items-center">
          

          <Link href="/signup" className="relative w-[100%] " >

            <div className="z-100  relative flex justify-center items-center w-[50%] rounded-full border-[2px] px-10  border-white  text-white uppercase text-[5rem] font-extrabold max-[825px]:text-[4rem] "> Sign Up</div>
          </Link>


        </div> */}
        {/* <div>
          <Link href="/signup">
            <div className="z-10 flex min-h-[16rem] items-center justify-center p-[15px]">
              <AnimatedGradientText>
                <span
                  className={cn(
                    `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent font-semibold text-lg`
                  )}
                >
                  Sign Up
                </span>
              </AnimatedGradientText>
            </div>
          </Link>
        </div> */}
        {/* <div>
          <div
            className="z-10 flex min-h-[16rem] items-center justify-center p-[15px]"
            onClick={() => {
              console.log("triggered");
              logOut();
            }}
          >
            <AnimatedGradientText>
              <span
                className={cn(
                  `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent font-semibold text-lg`
                )}
              >
                Logout
              </span>
            </AnimatedGradientText>
          </div>
        </div> */}
      </div>
    </div>
  );
}
