import { ethers } from 'ethers';
import React, { useState } from 'react';
import omniMessage from '../../contracts/out/omni.sol/OmniMessage.json'

export function Popup() {



async function onGetEndpoint(){

}

  async function submit(e){
  e.preventDefault()
  console.log(e.target[0].value)
  console.log(e.target[1].value)

  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    // const sessionAddress = getSessionAddress(network.factoryAddress)
    const contract = new ethers.Contract( "0x4637e0249e4A8bB885ee891674F42B08A04d74f1", omniMessage.abi, signer)
    try {
      const data = await contract.send("0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",e.target[0].value,e.target[1].value, {value: ethers.utils.parseEther("0.00005")})
      // fix this to decimal
      console.log(data)
    } catch (err) {
      console.log("Error: ", err)
    }
  }
}


  const [pop, setPop] = useState(false)

  return (<div>

<button type="button" onClick={()=>setPop(true)} className="text-white py-[4px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Send</button>

    <div id="defaultModal"   className={`fixed top-1/2 right-1/2 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-[1.5rem]   max-h-full ${pop ? '' : 'hidden'}`}>
        <div className="relative w-full max-w-2xl max-h-full">

            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Sending
                    </h3>
                    <button type="button" onClick={()=>setPop(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span onClick={()=>setPop(false)} className="sr-only">Close modal</span>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <form onSubmit={(e)=>submit(e)} className='flex flex-col justify-center w-1/2 mx-auto'>
                        Address: <input className='border my-2'></input> <br/>
                        Amount: <input className='border' type="number"></input>
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button type="submit" onClick={()=>setPop(false)} data-modal-hide="defaultModal"  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
                    <button onClick={()=>setPop(false)} data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Decline</button>
                </div>
                    </form>
                </div>

            </div>
        </div>
  </div>
    </div>)
}
