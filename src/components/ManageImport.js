import React from 'react';

const ManageImport = (props) => {

   

  async function AddStockpriceApi(element) {
    const res = await fetch('http://localhost:8084/addStockPrice', {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "exchangename": element[1], "companycode": element[0], "datee": element[3], "timee": element[4].toString().trim(), "shareprice": element[2] })
    });
    return res;
  }

  props.data.forEach((element, index) => {
    if (index != 0)
      myFunction(element);
  });

  function myFunction(element) {
    console.log(element);

    AddStockpriceApi(element);
    
  }

  return (
    <h2> </h2>
  );
}

export default ManageImport;