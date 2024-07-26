


export default function Logo( props:any) {
    return (

        <div className={` flex justify-center bg-transparent border-transparent items-center p-0 m-0`} style={{width: `${props.width}px`,height: `${props.width}px`}}> 

        <div style={{borderWidth: `${props.width/40}px`}} className={`w-[95%] h-[95%] p-0 m-0 flex justify-center items-center  rounded-[50%] border-[4px] border-customorange-700 relative`}>

        <div style={{borderWidth: `${props.width/60}px`}} className="h-[40%] w-[100%]  border-customorange-700 rounded-[50%] absolute transform rotate-[45deg]"></div>

        <div style={{borderWidth: `${props.width/60}px`}} className="h-[40%] w-[100%]  border-customorange-700 rounded-[50%] absolute transform rotate-[-45deg]"></div>

        <div style={{borderWidth: `${props.width/60}px`}} className="h-[37%] w-[37%]  bg-transparent border-transparent  relative transform rotate-[-45deg]">

        <div className="  bg-customorange-700 rounded-[50%] absolute top-[0] left-[0] " style={{width: `${props.width/13}px`,height: `${props.width/13}px `, translate : `-${props.width/23}px -${props.width/23}px`}}></div>
        <div className="  bg-customorange-700 rounded-[50%] absolute top-[0] right-[0] " style={{width: `${props.width/13}px`,height: `${props.width/13}px`,translate : `${props.width/23}px -${props.width/23}px`}}></div>
        <div className="  bg-customorange-700 rounded-[50%] absolute bottom-[0] left-[0] " style={{width: `${props.width/13}px`,height: `${props.width/13}px`,translate : `-${props.width/23}px ${props.width/23}px`}}></div>
        <div className="  bg-customorange-700 rounded-[50%] absolute bottom-[0] right-[0] " style={{width: `${props.width/13}px`,height: `${props.width/13}px`,translate : `${props.width/23}px ${props.width/23}px`}}></div>
        </div>



        </div>





        </div>




    );
}