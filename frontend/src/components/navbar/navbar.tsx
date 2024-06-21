import Chipcustom from "../../components/chip/chip";
import { Chip, Image } from "@nextui-org/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className=" flex w-[100%] h-[4rem] justify-between items-center p-6 gap-5  bg-customorange-700 absolute opacity-40">
      <Image
        src="/data/logos/logo.png"
        width={150}
        className=" brightness-0 invert"
      ></Image>
      <div className=" flex gap-5">
        <Link href="/login">
          {" "}
          <Chip
            color="warning"
            variant="light"
            size="lg"
            className=" text-white border-customorange-700/50 hover:underline"
          >
            Login
          </Chip>
        </Link>
        <Link href="/signup">
          {" "}
          <Chip
            color="warning"
            variant="light"
            size="lg"
            className=" text-white border-customorange-700/50 hover:underline"
          >
            Sign Up
          </Chip>
        </Link>
        {/* <Chipcustom link="/signup"  >Sign Up</Chipcustom> */}
      </div>
    </div>
  );
}
