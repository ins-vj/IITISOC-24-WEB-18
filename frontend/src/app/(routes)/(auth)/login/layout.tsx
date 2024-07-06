import AnimatedCursor from "react-animated-cursor"

export default function LoginLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
    return (
        <>
        <AnimatedCursor
      innerSize={50}
      outerSize={50}
      color='3, 59, 85'
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={3}
     trailingSpeed={1}

      
    />
        <div className=" min-h-[100vh] ">{children}</div>
        </>
    );
  }