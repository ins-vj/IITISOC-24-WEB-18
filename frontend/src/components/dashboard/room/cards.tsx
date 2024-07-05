


export default function Card(props:any){
    return(
        <div className=" 2xl:min-w-[500px] xl:min-w-[400px] md:min-w-[350px] min-w-[95%]  min-h-[100vh] flex flex-col gap-[15px] items-center">
        {props.children}

        </div>
    );

}