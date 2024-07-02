import AnimatedCursor from "react-animated-cursor"
import Particles from "@/components/landingpage/particles";
export default function landingPageLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
    return (
        <>
    
        <div className=" bg-[rgba(10,10,10)] relative min-h-[100vh] p-0 w-[100vw] overflow-x-clip">
       
         
<AnimatedCursor
      innerSize={50}
      outerSize={50}
      color='248, 100, 0'
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={3}
     trailingSpeed={1}

      
    />
          {children}

          </div>

       
  
         
        </>
    );
  }