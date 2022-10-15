export default function Container({ children }: any) {
  return (
    <>
      <div className="flex flex-col items-center bg-slate-100 h-screen justify-center">
        {children}
      </div>
    </>
  );
}
