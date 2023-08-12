import { useState, useEffect } from "react";
import omniMessage from '../../contracts/out/omni.sol/OmniMessage.json'
import { ethers } from 'ethers'
import { LineChart } from "./Line";
import { PieChart } from "./Pie";
import { fetchTransaction } from "wagmi/dist/actions";
import { Popup } from "./Popup";



export function Balances(account :{account: string}) {

  const [oplist, setOpList] = useState([])
  const [polylist, setPolyList] = useState([])
  const [baselist, setBaseList] = useState([])
  const [zoralist, setZoraList] = useState([])

  const [trans, setTrans] = useState([])


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

  const fetchTransaction = async (address: string) => {
    let headers = new Headers();
    // EXPOSE API KEY
    headers.set('Authorization', "Bearer cqt_rQFY9PtDfbqGrmqD7qkbqC9R3ccJ")

    const data = await fetch(`  https://api.covalenthq.com/v1/optimism-goerli/address/${address}/transactions_v3/`, {method: 'GET', headers: headers})
    .then((resp) => resp.json())
    .then((data) => {
      setTrans(data.data.items.slice(0,4))
      });
    }


  const fetchData = async (chain : string, address: string, setstate: React.Dispatch<React.SetStateAction<never[]>> ) => {
    let headers = new Headers();
    // EXPOSE API KEY
    headers.set('Authorization', "Bearer cqt_rQFY9PtDfbqGrmqD7qkbqC9R3ccJ")
    const data = await fetch(`https://api.covalenthq.com/v1/${chain}/address/${address}/balances_v2/?`, {method: 'GET', headers: headers})
    .then((resp) => resp.json())
    .then((data) => {
      setstate(data.data!.items)

      });
    }

  function mapBalance(list : never[]){
    console.log(list)
    return list.map((l,index)=>{
      return  l.contract_name != null ? <div className="flex justify-around ml-[40vh] mr-[30vh] mt-1 hover:bg-yellow-50" key={l.contract_name + index}>
      <div className="flex mr-auto w-1/3 " >

      <img src={l.contract_name == "Ether" || l.contract_name == "Matic Token" || l.contract_name == "ETH" ? l.logo_url : "../../logo.png"} alt={l.logo_url} width={22}></img>

      {l.contract_name}
      </div>
      <div className="flex justify-end w-1/2">

      <div className="mr-auto">{l.balance / 10 ** l.contract_decimals}
      </div>

      </div>

      <div className="flex gap-2">
      <Popup/>
         <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Swap</button>
         <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Bridge</button>
      </div>


      </div> : <></>

 })
  }

  function chain(st, f, list){
    return (     <div className="bg-cyan-100 pb-6 pt-4  my-3 rounded-2xl ">
    <h2 className="ml-32 text-blue-700 font-bold">{st}</h2>
    <hr className="mb-2  mx-8"></hr>
    {f(list)}
    </div>)
  }


  useEffect(()=>{
    fetchData("optimism-goerli",account.account, setOpList).catch(console.error);
    fetchData("matic-mumbai",account.account,  setPolyList).catch(console.error);
    fetchData("base-testnet",account.account,  setBaseList).catch(console.error);
    fetchData("zora-testnet",account.account,  setZoraList).catch(console.error);

    fetchTransaction(account.account)


  },[])



  // line chart


  const [tk, setTk] = useState([])
  const [time, setTime] = useState([])
  const [tk2, setTk2] = useState([])

  const fetchDataLine = async (chain : string, address: string ) => {
    let headers = new Headers();
    // EXPOSE API KEY
    headers.set('Authorization', "Bearer cqt_rQFY9PtDfbqGrmqD7qkbqC9R3ccJ")


    const data = await fetch(` https://api.covalenthq.com/v1/optimism-goerli/address/${address}/portfolio_v2/`, {method: 'GET', headers: headers})
    .then((resp) => resp.json())
    .then((data) => {
      let timeI = data.data.items[0].holdings.map((x)=>x.timestamp.slice(0,10))
      let list1 = data.data.items[0].holdings.map((x)=>x.close.balance)
      let list2 = data.data.items[1].holdings.map((x)=>x.close.balance)
      setTk(list1)
      setTk2(list2)
      setTime(timeI)
      });
    }


    useEffect(()=>{
      fetchDataLine("optimism-goerli",account.account).catch(console.error);


    },[])


  return (
    <div >
<div className="flex justify-between gap-2">
<div className="bg-cyan-100 h-80 w-[32%]  my-2 rounded-2xl flex mb-4">
  <div className="mx-8 my-2 h-full w-full">
    {trans.map((t)=>{
      return(<div className={t.successful ? "mt-3 rounded-2xl bg-green-100": " border mt-6 rounded-2xl bg-red-50" } >
        <div className="flex justify-center">{t.to_address}</div>
        <div className="flex justify-start w-3/4 mx-auto">
          <div>{t.block_signed_at}</div>
          <div className={t.successful ? "text-green-600 ml-auto": "text-red-500 ml-auto" }>status: {t.successful ? "SUCCESS": "FAIL"}</div>
        </div>
        </div>)
    })}
  </div>
</div>

<div className="bg-cyan-100 h-80 w-[32%] -pr-2 my-2 rounded-2xl flex  mb-4 ">
<div className="my-2 mx-2 h-4/5 w-full mt-8">
    <PieChart oplist={oplist} />

  </div>
</div>


<div className="bg-cyan-100 h-80 w-[32%]   my-2 rounded-2xl flex mb-4">
  <div className="mx-8 my-8 h-full w-full">
  <LineChart time={time} tk1={tk} tk2={tk2}/>
  </div>
</div>

</div>


      <div className="bg-cyan-100  h-8  my-2 rounded-2xl flex justify-between mb-4">
          <div className="opacity-100 pt-1 border-black  w-1/5 rounded-2xl text-center bg-white"> All </div>
          <div className="opacity-70  text-center   w-1/5 rounded-2xl pt-1 hover:bg-yellow-50"> Optimism </div>
          <div className="opacity-70  text-center  w-1/5 rounded-2xl pt-1 hover:bg-yellow-50"> Base </div>
          <div className="opacity-70  text-center   w-1/5 rounded-2xl pt-1 hover:bg-yellow-50"> Zora </div>
          <div className="opacity-70  text-center  w-1/5 rounded-2xl  pt-1 hover:bg-yellow-50"> Polygon </div>

      </div>



          <div className="bg-cyan-100 pb-2 pt-2 my-3  rounded-2xl">
    <h2 className="ml-32 text-black font-bold">{"Chain name"}</h2>
    <div className="flex justify-around mx-[40vh] font-bold -mt-6">
      <div className="flex mr-auto w-1/3">
       {"Name"} </div>
       <div className="flex justify-end w-1/2">
              <div className="mr-auto">{"Balances"}</div>
       </div>
      <div className="ml-auto" >{"Manange"}</div>

      </div>

    </div>





     {chain("OPTIMISM", mapBalance, oplist)}
        {chain("BASE", mapBalance, baselist)}
        {chain("ZORA", mapBalance, zoralist)}
        {chain("POLYGON", mapBalance, polylist)}


    <div className="pt-24 pb-16 flex gap-4 justify-center text-gray-600">
        <div className="hover:text-gray-200">Ecosystem</div>
        <div className="hover:text-gray-200">Community</div>
        <div className="hover:text-gray-200">Governance</div>
        <div className="hover:text-gray-200"> Developers</div>
        <div className="hover:text-gray-200"> Blog</div>
        <div className="hover:text-gray-200">FAQ</div>
        <div className="hover:text-gray-200">Policy</div>
        <div className="hover:text-gray-200">Security</div>
    </div>




    </div>

  );
}

