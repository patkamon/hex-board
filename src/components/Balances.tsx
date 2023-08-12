import { useState, useEffect } from "react";
import omniMessage from '../../contracts/out/omni.sol/OmniMessage.json'
import { ethers } from 'ethers'


export function Balances(account :{account: string}) {

  const [oplist, setOpList] = useState([])
  const [polylist, setPolyList] = useState([])
  const [baselist, setBaseList] = useState([])
  const [zoralist, setZoraList] = useState([])

  async function onGetEndpoint(){
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner();
      // const sessionAddress = getSessionAddress(network.factoryAddress)
			const contract = new ethers.Contract( "0x4637e0249e4A8bB885ee891674F42B08A04d74f1", omniMessage.abi, provider)
			try {
				const data = await contract.lzEndpoint()
				// fix this to decimal
        console.log(data)
      } catch (err) {
        console.log("Error: ", err)
			}
		}
	}


  const fetchData = async (chain : string, address: string, setstate: React.Dispatch<React.SetStateAction<never[]>> ) => {
    let headers = new Headers();
    // EXPOSE API KEY
    headers.set('Authorization', "Bearer cqt_rQFY9PtDfbqGrmqD7qkbqC9R3ccJ")
    const data = await fetch(`https://api.covalenthq.com/v1/${chain}/address/${address}/balances_v2/?`, {method: 'GET', headers: headers})
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      setstate(data.data!.items)
      });
    }

  function mapBalance(list : never[]){
    return list.map((l,index)=>{
      return  l.contract_name != null ? <div className="flex justify-around mx-80" key={l.contract_name + index}>
      <div className="flex mr-auto">

      <img src={l.contract_name == "Ether" || l.contract_name == "Matic Token" || l.contract_name == "ETH" ? l.logo_url : "../../logo.png"} alt={l.logo_url} width={22}></img>

      {l.contract_name} </div>
      <div>{l.balance / 10 ** l.contract_decimals}</div>

      </div> : <></>

 })
  }

  function chain(st, f, list){
    return (     <div className="bg-cyan-100 pb-6 pt-4 my-3 rounded-2xl ">
    <h2 className="ml-8 text-blue-700 font-bold">{st}</h2>
    <hr className="mb-2  mx-8"></hr>
    {f(list)}
    </div>)
  }


  useEffect(()=>{
    fetchData("optimism-goerli",account.account, setOpList).catch(console.error);
    fetchData("matic-mumbai",account.account,  setPolyList).catch(console.error);
    fetchData("base-testnet",account.account,  setBaseList).catch(console.error);
    fetchData("zora-testnet",account.account,  setZoraList).catch(console.error);


  },[])

  return (
    <div >
      <div className="bg-cyan-100  h-8  my-2 rounded-2xl flex justify-between mb-4">
          <div className="opacity-100 pt-1 border-black  w-1/5 rounded-2xl text-center bg-white"> All </div>
          <div className="opacity-70  text-center   w-1/5 rounded-2xl pt-1"> Optimism </div>
          <div className="opacity-70  text-center  w-1/5 rounded-2xl pt-1"> Base </div>
          <div className="opacity-70  text-center   w-1/5 rounded-2xl pt-1"> Zora </div>
          <div className="opacity-70  text-center  w-1/5 rounded-2xl  pt-1"> Polygon </div>

      </div>

          <div className="bg-cyan-100 pb-2 pt-2 my-3 rounded-2xl ">
    <h2 className="ml-8 text-black font-bold">{"Chain name"}</h2>
    <div className="flex justify-around mx-80 font-bold -mt-6">
      <div className="flex mr-auto">
      {/* <img src={} width={22}></img> */}
       {"Name"} </div>
      <div>{"Balances"}</div>

      </div>

    </div>

     {chain("OPTIMISM", mapBalance, oplist)}
        {chain("BASE", mapBalance, baselist)}
        {chain("ZORA", mapBalance, zoralist)}
        {chain("POLYGON", mapBalance, polylist)}



      <button className="" onClick={()=>onGetEndpoint()}>HELLO</button>

    </div>
  );
}

