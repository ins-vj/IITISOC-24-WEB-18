


export default function Cards(props:any){
    return(
        <div className=" relative h-[100%] flex w-[100%]  justify-start  hover:scale-[1.01] transition-all duration-300 flex-col items-center   backdrop-blur-md bg-[rgba(20,20,20,1)] gap-[20px] p-[20px] rounded-3xl">
        {props.children}
        </div>
    );

}