import { useState, useEffect } from "react";




export function Balances(account :Object) {

  const [oplist, setOpList] = useState([])
  const [polylist, setPolyList] = useState([])

  useEffect(()=>{
    console.log("Hello", account.account)
    let headers = new Headers();
    headers.set('Authorization', "Bearer ")

    const fetchData = async () => {
      const data = await fetch(`https://api.covalenthq.com/v1/optimism-goerli/address/${account.account}/balances_v2/?`, {method: 'GET', headers: headers})
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data)
        setOpList(data.data.items)
        });
      }

    const fetchData2 = async () => {
          const data = await fetch(`https://api.covalenthq.com/v1/matic-mumbai/address/${account.account}/balances_v2/?`, {method: 'GET', headers: headers})
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data)
            setPolyList(data.data.items)
            });


    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);

  // call the function
    fetchData2()
    // make sure to catch any error
    .catch(console.error);

  },[])

  return (
    <div>
      <h2>Balances</h2>

      <h2>OPTIMISM GOERLI</h2>
      {oplist.map((l)=>{
          return <div key={l.contract_name}>
              {l.contract_name}<br/>
              {l.balance}
              </div>
      })}

      <h2>POLYGON MUMBAI</h2>
      {polylist.map((l)=>{
            return  l.contract_name != null ? <div key={l.contract_name}>
              {l.contract_name}<br/>
              {l.balance}
              </div> : <></>
      })}

    </div>
  );
}

