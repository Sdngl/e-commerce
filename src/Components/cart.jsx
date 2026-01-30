import React from 'react'

export default function Cart() {
  return (
    <>
    {Cart.map((item)=>(
      <div key={item.id} >
        <h3>{item.name}</h3>
        <p>Price: ${item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    ))}
    </>
  )
}
