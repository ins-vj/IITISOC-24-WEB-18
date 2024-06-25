
import Dot from '../components/dot'
import Sidebar from '../components/sidebar'
import Topbar from '../components/topbar'
import Ripple from '../components/ripple'





export default function userLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
    return (
        <>
          <Ripple/>
        <div className="  relative z-10 w-[100vw] h-[100vh] p-[5px] overflow-hidden flex flex-row justify-center  text-customtextblack-500">
    <Sidebar />
    <div className=' flex flex-col w-[100%] h-[100%]'>
    <Topbar />
      {children}
      </div>
 

{/* <div className="w-[10%] h-[10%] bg-customorange-700 absolute left-0  bottom-[0] blur-[100px]  "></div> */}
    </div>
   
        </>
    );
  }