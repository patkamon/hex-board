import { useState, useEffect } from "react";




export function Balances(account :{account: string}) {

  const [oplist, setOpList] = useState([])
  const [polylist, setPolyList] = useState([])

  const fetchData = async (chain : string, address: string, setstate: React.Dispatch<React.SetStateAction<never[]>> ) => {
    let headers = new Headers();
    headers.set('Authorization', "Bearer cqt_rQFY9PtDfbqGrmqD7qkbqC9R3ccJ")
    const data = await fetch(`https://api.covalenthq.com/v1/${chain}/address/${address}/balances_v2/?`, {method: 'GET', headers: headers})
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      setstate(data.data.items)
      });
    }

  useEffect(()=>{
    fetchData("optimism-goerli",account.account, setOpList)
    // make sure to catch any error
    .catch(console.error);

    // call the function
    fetchData("matic-mumbai",account.account,  setPolyList)
      // make sure to catch any error
      .catch(console.error);


  },[])

  return (
    <div>
      <h2>Balances</h2>

      <h2>OPTIMISM GOERLI</h2>
      {oplist.map((l,index)=>{
           return  l.contract_name != null ? <div key={l.contract_name + index}>
           {l.contract_name}<br/>
           {l.balance}
           </div> : <></>
      })}

      <h2>POLYGON MUMBAI</h2>
      {polylist.map((l,index)=>{
            return  l.contract_name != null ? <div key={l.contract_name + index}>
              {l.contract_name}<br/>
              {l.balance}
              </div> : <></>
      })}

    </div>
  );
}

