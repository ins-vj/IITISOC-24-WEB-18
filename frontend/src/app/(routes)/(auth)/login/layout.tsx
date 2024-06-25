export default function LoginLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
    return (
        <>
        <div className=" min-h-[100vh] ">{children}</div>
        </>
    );
  }