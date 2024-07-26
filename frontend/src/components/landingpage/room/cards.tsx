


export default function Cards(props:any){
    return(
        <div className="  flex w-[100%] h-[100%] justify-around  hover:scale-[1.01] transition-all duration-300 flex-col items-center   backdrop-blur-md bg-[rgb(253,204,146,0.3)] gap-[20px] p-[20px] rounded-3xl">
        {props.children}
        </div>
    );

}