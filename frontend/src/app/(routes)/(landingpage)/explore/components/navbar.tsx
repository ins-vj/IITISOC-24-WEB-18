"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import AnimatedGradientText from "./gradienttext";
import { logOut } from "@/helpers/auth";

export default function Navbar() {
  return (
    <div className=" flex justify-between items-center w-[100%] h-[5rem]  ">
      <Image
        src="/data/logos/logo.png"
        width={200}
        height={70}
        alt="Expresso"
      ></Image>

      <div className=" flex">
        <div>
          <Link href="/login">
            <div className="z-10 flex items-center justify-center px-[2rem]">
              
                  Log In
                
            </div>
          </Link>
        </div>
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
