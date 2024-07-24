import React from "react";
import Logo from "./logo";
import { Input, Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { login } from "@/helpers/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "../googleLogin";

export default function Card() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [username, setusername] = React.useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();

  const onSubmit = () => {
    const s1 = async () => {
      const res = await login({ username: username, password: password });
      if (res) {
        toast.success("Logged in SuccessFully");
        router.push("/dashboard");
      } else {
        toast.error("Email or password wrong");
      }
    };
    s1();
  };

  const isInvalid = React.useMemo(() => {
    if (username === "") return false;

    return true;
  }, [username]);

  return (
    <div className="flex flex-col gap-[2.5rem] justify-around items-center relative z-10   backdrop-blur-md  rounded-[20px] border-[2px] border-customblue-600 p-14">
      <div className="flex gap-[20px]">
        <Logo width={60} />
        <Divider
          className="h-[60px] bg-customblue-600"
          orientation="vertical"
        />
        <Link href="/googleauth">
          <Image src="/data/logos/google.png" alt="G" width={60} height={60} />
        </Link>
      </div>

      <div className="w-[20rem] flex flex-col gap-[1.5rem] justify-center items-center">
        <Input
          isClearable
          type="text"
          autoFocus
          label="Username"
          value={username}
          onValueChange={setusername}
          className="max-w-[25rem] dark"
          color="primary"
          errorMessage="Please enter a valid username"
        />
        <Input
          isDisabled={!isInvalid}
          color="primary"
          label="Password"
          value={password}
          onValueChange={setPassword}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="max-w-[25rem] dark"
        />

        <div className=" text-customblue-500 flex justify-between w-[95%]">
          <Link href="/signup">
            <span>Create New Account</span>{" "}
          </Link>
          <span>Forgot?</span>
        </div>
      </div>

      <Button
        isDisabled={password === "" ? true : false}
        color="primary"
        variant="ghost"
        fullWidth={true}
        onClick={onSubmit}
      >
        Login
      </Button>

      <GoogleLoginButton />
    </div>
  );
}
