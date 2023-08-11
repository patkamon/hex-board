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
      return  l.contract_name != null ? <div key={l.contract_name + index}>
       <img src={l.logo_url} width={40}></img>
     {l.contract_name}<br/>
      {l.balance / 10 ** l.contract_decimals}

      </div> : <></>
 })
  }


  useEffect(()=>{
    fetchData("optimism-goerli",account.account, setOpList).catch(console.error);
    fetchData("matic-mumbai",account.account,  setPolyList).catch(console.error);
    fetchData("base-testnet",account.account,  setBaseList).catch(console.error);
    fetchData("zora-testnet",account.account,  setZoraList).catch(console.error);


  },[])

  return (
    <div>
      <h2>Balances</h2>

      <h2>OPTIMISM GOERLI</h2>{mapBalance(oplist) }

      <h2>POLYGON MUMBAI</h2> {mapBalance(polylist)}


      <h2>BASE</h2>{mapBalance(baselist) }

      <h2>ZORA</h2>{mapBalance(zoralist) }

      <button onClick={()=>onGetEndpoint()}>HELLO</button>

    </div>
  );
}

