import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart()
    const priceRef = useRef();

    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty,setQty] = useState(1);
    const [size, setSize] = useState("");
    const handleaddtocart = async () => {
        let food = [];
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;
                break;
            }
        }
    
        if (food.length !== 0) {
            if (food.size === size) {
                await dispatch({type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty});
            } else if (food.size !== size) {
                await dispatch({type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size});
            }
        } else {
            await dispatch({type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size});
        }
    };
    


        let finalPrice = qty * parseInt(options[size]);
        useEffect(()=> {
            setSize(priceRef.current.value)
        },[])
        return (
        <div>
            <div
                className="card mt-3  border-2 border-danger"
                style={{ width: "20rem", maxHeight: "380px" }}
            >
                <img className="card-img-top " src={props.foodItem.img}
                alt="pizza" style={{height:"200px",objectFit: "fill"}}/>
                <div className="card-body">
                    <h5 className="card-title " style={{color: "orangered", background: "aliceblue",  padding: "5px",textAlign: 'center', fontFamily: "sans-serif",  }}>{props.foodItem.name} </h5>
                    <div className="container w-100">
                        <select className="m-2 h-100  rounded" style={{color: "white",  background: "tomato", border: "none",fontFamily: "sans-serif", color: "white", padding: "4px",cursor: "pointer"}} onChange={(e)=> setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                );
                            })}
                        </select>
                        <select className="m-2 h-100  rounded" style={{background: "coral", border: "none", fontFamily: "sans-serif",  color: "white", padding: "4px",cursor: "pointer"}} ref={priceRef} onChange={(e)=> setSize(e.target.value)}>
                            {priceOptions.map((data)=>{
                            return <option key ={data} value={data}>{data}</option>
                            })}
                        </select>
                       

                        <div className="d-inline h-100 fs-s">₹{finalPrice}/-</div>
                        
                        <hr/>
                        <button className="btn btn-success justify-center ms-2" style={{ cursor: "cell", fontFamily: "sans-serif",}} onClick={handleaddtocart}>
                        Add to Cart</button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}
