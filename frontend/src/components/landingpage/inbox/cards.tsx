


export default function Cards(props:any){
    return(
        <div className=" relative h-[100%] flex w-[100%]  justify-start  hover:scale-[1.01] transition-all duration-300 bg-[rgb(253,204,146,0.3)] flex-col items-center   backdrop-blur-md  gap-[20px] p-[20px] rounded-3xl">
        {props.children}
        </div>
    );

}