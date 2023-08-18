// components/ProductListByCategory.js
import React, { useEffect, useState, useContext } from 'react';
import api from '@api';
import { Link, useParams } from 'react-router-dom';
import { RootContext } from '../../../App';
import { Logger } from 'sass';

export default function ProductItem() {
  const { id } = useParams()

  const [products, setProducts] = useState(null);
  const { userStore, cartActions, dispatch } = useContext(RootContext);


  const [quantity, setQuantity] = useState(1);
  function addToCart() {
    let user_id = userStore.data?.id;
    let data = {
      product_id: products.id,
      quantity,
      note: "Hello"
    }
    api.purchase.addToCart(user_id, data).then(res => {
      api.purchase.findCart(userStore.data?.id)
        .then(res => {
          if (res.status == 200) {
            dispatch(cartActions.setCartData(res.data.data))
            alert("Thêm sản phẩm thành công")
          } else {
            alert(res.data.message)
          }
        })
        .catch(err => {
          alert("Server bảo trì!")
        })

    }).catch(err => {
      alert("Sập!")
    })
  }
  useEffect(() => {
    api.products.findById(id)
      .then(res => {
        // console.log("find id",res.data);
        setProducts(res.data.data)
      })
      .catch(err => {
        alert("Lỗi server")
      })

  }, [id]);

  useEffect(() => {
    api.products.findMany()
      .then(res => {
        setProducts(res.data.data)
      })
      .catch(err => {
        alert("sap server")
      })
  }, [])
  // console.log("PRODUCT",products);
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "50px" }}>Product</h1>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div >

          <img width={500}
            height={500}
            src={products?.avatar} alt="" />
        </div>
        <div style={{ margin: "20px 60px" }}>
          <h2>{products?.name}</h2>
          <p>{products?.des}</p>
          <p className='p_price'>Price: ${products?.price}
          </p>
          <p>Sweet, juicy strawberries generously hand-dipped and covered in our finest milk Belgian chocolate.
            When you want to make a grand gesture to show your appreciation for someone truly special, milk chocolate
            covered strawberries are a great choice. Covered with GODIVA's signature milk chocolate and featuring ripe fresh strawberries, no one can resist this perfect treat. Surprise them for Valentine's Day, their birthday, or just because! And if they are more of a dark chocolate person, give them the equally special dark chocolate covered strawberries instead.
            What could be sweeter than receiving this special delivery, elegantly presented in our iconic gold gift box?</p>
          <button onClick={() => { addToCart() }} type="button" style={{ padding: "0 100px", backgroundColor: "hsl(35, 53%, 56%) " }}>ADD TO CART </button>
        </div>
        <div>
        </div>
      </div>
      <Link to ="/gifts" style={{textAlign:"center",marginLeft:"600px"}}>Shopping Card</Link>
      <Link to ="/pay"style={{marginLeft:"20px"}}>Payment page</Link>

    </>
  );
}
