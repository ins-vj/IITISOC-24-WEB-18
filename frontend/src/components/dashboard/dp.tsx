import Image from 'next/image';

export default function Dp(props: any) {

return(

    <Image src={props.photo}  width={props.size} height={props.size} alt="user" className=" object-cover rounded-[50%] bg-customorange-300" />


);


}