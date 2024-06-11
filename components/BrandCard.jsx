import { consumeToken, buyOption } from "../utils";

const BrandCard = ({ array }) => {
  console.log(array[9]);
  // for(let i = 0;i<array.length;i++){
  //   console.log(i)
  // }
  return (
    <div className="flex mx-8 w-3/7 justify-center content-center pb-5">
      <div class="w-full   border-2 border-gray-800 rounded-xl shadow bg-gray-400 mt-14  backdrop-blur-lg pt-5">
        <span className="ml-5 mt-5 font-semibold text-xl">Seller</span>
        <div className=" border-2 rounded-lg m-2 ml-5 text-xl w-3/7 px-3">
          {array[0]}
        </div>

        <span className="ml-5 font-semibold text-xl">Price</span>
        <div className="border-2 rounded-lg m-2 ml-5 w-4/12 text-2xl px-3">
          {Number(array[3] / BigInt("1000000000000000")) / 1000}
        </div>
        {Number(array[8]) > 0 ? (
          <>
            <span className="ml-5 font-semibold text-xl">Option Duration</span>
            <div className="border-2 rounded-lg m-2 ml-5 w-1/3 text-2xl px-3">
              {Number(array[8])}
            </div>
            <span className="ml-5 font-semibold text-xl">Option Price</span>
            <div className="border-2 rounded-lg m-2 mb-5 ml-5 w-1/3 text-2xl px-3">
              {Number(array[7] / BigInt("1000000000000000")) / 1000}
            </div>
          </>
        ) : (
          <></>
        )}

        <span className="ml-5 font-semibold text-xl">SLR Tokens</span>
        <div className="border-2 rounded-lg m-2 mb-5 ml-5 w-1/3 text-2xl px-3">
          {Number(array[10])}
        </div>

        <div class="px-5 pb-5">
          <div class=" items-center justify-between">
            <button
              onClick={() =>
                consumeToken(Number(array[2]), array[3].toString())
              }
              className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-md px-8 py-1.5 text-center dark:focus:ring-black"
            >
              Consume
            </button>

            {Number(array[8]) > 0 ? (
              <button
                onClick={() => buyOption(Number(array[2]), array[7].toString())}
                className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-8 py-2.5 text-center dark:focus:ring-black ml-20"
              >
                Buy Option
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
