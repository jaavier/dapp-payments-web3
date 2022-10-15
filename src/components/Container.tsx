export default function Container({ children }: any) {
  return (
    <>
      <div className="flex flex-col items-center bg-slate-100 h-screen justify-center">
        <div className="shadow-lg border border-slate-300 bg-white p-10 rounded-md w-4/6 h-auto">
          {children}
        </div>
      </div>
    </>
  );
}
