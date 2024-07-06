
import Dot from '../../../../components/dashboard/dot'
import Sidebar from '../../../../components/dashboard/sidebar'
import Topbar from '../../../../components/dashboard/topbar'
import Ripple from '../../../../components/dashboard/ripple'
import styles from './dashboard.module.css'
import Particles from "@/components/landingpage/particles";



export default function userLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    
    
    return (
        <>
 
        
        <div className=" relative w-[100vw]  overflow-x-clip p-[15px] flex justify-center ">
        <Particles className='absolute w-[100vw] h-[100vh]'/>
          
      {children}
   
      </div>
 


   
        </>
    );
  }