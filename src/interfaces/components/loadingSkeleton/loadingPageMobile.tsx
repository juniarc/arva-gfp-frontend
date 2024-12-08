export default function LoadingPageMobile() {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full p-10">
        <div className="w-full h-60 bg-gray flex items-center justify-center animate-pulse rounded-lg"></div>
      </div>
      <div>
        <div className="tes w-auto bg-white p-5 rounded-lg shadow-lg mx-10">
          <div className="w-full grid grid-cols-5 gap-7 items-center justify-center">
            <div className="w-[63] h-29 animate-pulse flex flex-col items-center justify-center gap-3 bg-secondary rounded p-5"></div>
            <div className="w-[63] h-29 animate-pulse flex flex-col items-center justify-center gap-3 bg-secondary rounded p-5"></div>
            <div className="w-[63] h-29 animate-pulse flex flex-col items-center justify-center gap-3 bg-secondary rounded p-5"></div>
            <div className="w-[63] h-29 animate-pulse flex flex-col items-center justify-center gap-3 bg-secondary rounded p-5"></div>
            <div className="w-[63] h-29 animate-pulse flex flex-col items-center justify-center gap-3 bg-secondary rounded p-5"></div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="">
          <div className=" animate-pulse rounded bg-gray flex h-15 w-32 items-center justify-between mx-10 mb-8"></div>
          <div className="mx-10">
            <div className="animate-pulse w-56 h-[330px] bg-gray rounded-lg flex flex-col relative mr-10"></div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="mx-10 mb-10">
          <div className="bg-gray relative max-w-[350px] w-[70vw]  h-[126px] flex items-center p-10"></div>
        </div>
      </div>
    </div>
  );
}
