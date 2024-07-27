
import Dot from '../../../../components/dashboard/dot'
import Sidebar from '../../../../components/dashboard/sidebar'
import Topbar from '../../../../components/dashboard/topbar'
import Ripple from '../../../../components/dashboard/ripple'
import styles from './dashboard.module.css'
import Particles from "@/components/landingpage/particles";
import AnimatedCursor from "react-animated-cursor"


export default function userLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    
    
    return (
        <>

        <AnimatedCursor
      innerSize={30}
      outerSize={30}
      color='248, 100, 0'
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={3}
     trailingSpeed={1}

      
    />
        
 
        
        <div className=" relative w-[100vw]  overflow-x-clip p-[15px] flex justify-center ">
        <Particles className='absolute w-[100vw] h-[100vh]'/>
          
      {children}
   
      </div>
 


   
        </>
    );
  }