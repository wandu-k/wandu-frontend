const ChargePage = () => {
  return (
    <>
      <div className=" w-dvw h-dvh content-center text-center px-96 py-32">
        <div className="flex justify-between font-bold text-lg">
          <div>콩 충전</div>
          <div>보유 콩</div>
        </div>
        <div className="grid grid-cols-3 h-full gap-4 rounded-2xl  overflow-hidden">
          <button className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-end p-4 border rounded-2xl w-full h-full font-bold">
              100콩
            </div>
            <div className="flex flex-col justify-center">1,000원</div>
          </button>
          <button className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-end p-4 border rounded-2xl w-full h-full font-bold">
              500콩
            </div>
            <div className="flex flex-col justify-center">5,000원</div>
          </button>
          <button className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-end p-4 border rounded-2xl w-full h-full font-bold">
              1000콩
            </div>
            <div className="flex flex-col justify-center">10,000원</div>
          </button>
          <button className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-end p-4 border rounded-2xl w-full h-full font-bold">
              1500콩
            </div>
            <div className="flex flex-col justify-center">15,000원</div>
          </button>
          <button className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-end p-4 border rounded-2xl w-full h-full font-bold">
              2000콩
            </div>
            <div className="flex flex-col justify-center">20,000원</div>
          </button>
          <button className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-end p-4 border rounded-2xl w-full h-full font-bold">
              4000콩
            </div>
            <div className="flex flex-col justify-center">4,000원</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default ChargePage;
