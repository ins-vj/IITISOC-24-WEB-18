import AnimatedCursor from "react-animated-cursor"

export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <>
    <AnimatedCursor
      innerSize={50}
      outerSize={50}
      color='131, 87, 11'
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={3}
     trailingSpeed={1}

      
    />
    <div className=" min-h-[100vh] ">
      {children}
      </div>
    </>
  );
}