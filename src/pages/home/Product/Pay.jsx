import React, { useEffect, useState, useContext } from "react";
import { RootContext } from "@/App";
import api from "@api";
import './Pay.scss'
import { Link } from "react-router-dom";
import Qr from "./qrs/Qr";
import axios from "axios";
import { message } from "antd";

export default function Pay() {
    const [qrShow, setQrShow] = useState(false);
    const [qrData, setQrData] = useState(null);
    const { cartStore, userStore, cartActions, dispatch } =
        useContext(RootContext);
    const [cartItems, setCartItems] = useState(null);
    useEffect(() => {
        if (cartStore.data) {
            setCartItems(cartStore.data.cart_details);
        }
    }, [cartStore.data]);
    function deleteItem(type, id) {
        api.purchase
            .updateCart(userStore.data?.id, {
                type,
                cart_detail_record_edited: {
                    id,
                },
            })
            .then((res) => {
                // gọi hàm kéo cart detail về lại!
                api.purchase
                    .findCart(userStore.data?.id)
                    .then((res) => {
                        if (res.status == 200) {
                            dispatch(cartActions.setCartData(res.data.data));
                        } else {
                            alert(res.data.message);
                        }
                    })
                    .catch((err) => {
                        alert("sập!");
                    });
            })
            .catch((err) => { });
    }

    function updateCart(e, item) {
        // 1 update, 0 delete
        /* req.body = {type, cart_detail_record_edited} */
        let quantityEl = e.target.parentNode.querySelector(".quantity");
        let quantity = Number(quantityEl.innerText);
        if (e.target.innerText == "-") {
            if (quantity == 1) {
                if (window.confirm("Xóa ok?!")) {
                    // xóa
                    deleteItem(0, item.id);
                } else {

                }

            }
            // cập nhật -
            api.purchase
                .updateCart(userStore.data?.id, {
                    type: 1,
                    cart_detail_record_edited: {
                        id: item.id,
                        quantity: --quantity,
                    },
                })
                .then((res) => {
                    // gọi hàm kéo cart detail về lại!
                    api.purchase
                        .findCart(userStore.data?.id)
                        .then((res) => {
                            if (res.status == 200) {
                                dispatch(
                                    cartActions.setCartData(res.data.data)
                                );
                            } else {
                                alert(res.data.message);
                            }
                        })
                        .catch((err) => {
                            alert("sập!");
                        });
                })
                .catch((err) => { });
        } else {
            // cập nhật +
            api.purchase
                .updateCart(userStore.data?.id, {
                    type: 1,
                    cart_detail_record_edited: {
                        id: item.id,
                        quantity: ++quantity,
                    },
                })
                .then((res) => {
                    // gọi hàm kéo cart detail về lại!
                    api.purchase
                        .findCart(userStore.data?.id)
                        .then((res) => {
                            if (res.status == 200) {
                                dispatch(
                                    cartActions.setCartData(res.data.data)
                                );
                            } else {
                                alert(res.data.message);
                            }
                        })
                        .catch((err) => {
                            alert("sập!");
                        });
                })
                .catch((err) => { });
        }
    }
    function saveReceipt(eventForm) {
        /* Reset Form Action */
        eventForm.preventDefault();

        /* Req.body.receiptInfor */
        let receiptInfor = {
            receipt_code: cartStore.data.id,
            total: cartStore.data.cart_details.reduce((result, nextItem) => {
                return (result += nextItem.quantity * nextItem.product.price);
            }, 0),
            pay_mode: eventForm.target.payment.value,
            paid: eventForm.target.payment.value == "CASH" ? false : true,
        };
        /* Req.body.receiptDetails */
        let receiptDetails = [];
        for (let i in cartStore.data.cart_details) {
            receiptDetails.push({
                product_id: cartStore.data.cart_details[i].product_id,
                quantity: cartStore.data.cart_details[i].quantity,
                note: cartStore.data.cart_details[i].note,
            });
        }

        /* Cash */
        axios
            .post("http://localhost:4000/apis/v1/purchase/order", {
                receiptInfor,
                receiptDetails,
            })
            .then((res) => {
                message.success("Cảm ơn bạn đã mua hàng!");
                // chuyển trang receipt
                console.log("Đã save receipt", res.data);
            })
            .catch((err) => {
                console.log("err",err);
                alert("Bị lỗi trong quá trình thanh toán");
            });
        return;
    }
    function checkOut(eventForm) {
        /* Zalo */
        if (eventForm.target.payment.value == "ZALO") {
            axios
                .post("http://localhost:4000/apis/v1/purchase/zalo-create", {
                    receiptCode: cartStore.data.id,
                    receiptTotal: cartStore.data.cart_details.reduce(
                        (result, nextItem) => {
                            return (result +=
                                nextItem.quantity * nextItem.product.price);
                        },
                        0
                    ),
                    userName:
                        userStore.data.first_name + userStore.data.last_name,
                })
                .then((res) => {
                    if (res.status == 200) {
                        /* 
                        - khi thành công sẽ nhận được QR code
                        - orderId, url
                        - Lặp vô tận trong 5 phút liên tục kiểm tra tiền đã vào túi chưa.
                        - show QRCODE
                        */
                        setQrData({
                            url: res.data.url,
                            title: `Scan with ZaloPay`,
                            orderId: res.data.orderId,
                        });
                        setQrShow(true);
                        /* 
                            Check kết quả giao dịch
                        */
                        let tradeInterval;
                        let cancelTrade = setTimeout(() => {
                            // sau 10' hủy giao dịch (600000)
                            clearInterval(tradeInterval);
                            setQrShow(false);
                            setQrData(null);
                            alert("Giao dịch đã bị hủy vì quá lâu!");
                        }, 60000);
                        tradeInterval = setInterval(() => {
                            //console.log("đang kiểm tra thanh toán mỗi 5s");
                            axios
                                .get(
                                    `http://localhost:4000/apis/v1/purchase/zalo-confirm/${res.data.orderId}`
                                )
                                .then((checkRes) => {
                                    if (checkRes.status == 200) {
                                        // chuyển qua trang hóa đơn
                                        clearInterval(tradeInterval);
                                        // thu hồi QR
                                        setQrShow(false);
                                        setQrData(null);
                                        clearTimeout(cancelTrade);
                                        // xử lý database
                                        saveReceipt(eventForm);
                                    }
                                })
                                .catch((err) => {
                                    alert("zalo sập!");
                                });
                        }, 5000);
                    }
                })
                .catch((err) => {
                    console.log("err", err);
                    alert("Tạm thời không thể thanh toán phương thức này!");
                });
            return;
        } else {
            saveReceipt(eventForm);
        }
    }
    return (
        <div className="pay">
         {cartItems?.length>0 ?(    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100 py-5">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card shopping-cart" style={{ borderRadius: 15 }}>

                                <div className="card-body text-black">
                                    <div className="row">
                                        <div className="col-lg-6 px-5 py-4">
                                            <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
                                                Your products
                                            </h3>
                                        
                                            {cartItems?.map((item, index) => (
                                                <div className="d-flex align-items-center mb-5" key={Date.now() * Math.random()}>
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            src={`${item.product.avatar}`}
                                                            className="img-fluid"
                                                            style={{ width: 150, height: 120 }}
                                                            alt="Generic placeholder image"
                                                        />
                                                    </div>
                                                    <div className="flex-grow-1 ms-3" style={{ margin: "20px 80px" }}>
                                                        <div className="name-price">
                                                            <h5 className="text-primary">{item.product.name}</h5>
                                                            <div>
                                                                <i
                                                                    onClick={() => {
                                                                        if (
                                                                            window.confirm("Xóa ok?!")
                                                                        ) {
                                                                            // xóa
                                                                            deleteItem(0, item.id);
                                                                        }
                                                                    }}
                                                                    style={{
                                                                        color: "red",
                                                                        fontSize: "20px",
                                                                    }}

                                                                >X</i>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center">

                                                            <div className="def-number-input number-input safari_only">
                                                                <div style={{ display: "flex" }}>
                                                                    <div >
                                                                        <button className="b_quantity"
                                                                            onClick={(e) => {
                                                                                updateCart(e, item);
                                                                            }}
                                                                        >
                                                                            -
                                                                        </button>
                                                                        <span className="quantity">
                                                                            {item.quantity}
                                                                        </span>
                                                                        <button className="b_quantity"
                                                                            onClick={(e) => {
                                                                                updateCart(e, item);
                                                                            }}
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </div>
                                                                    <div>
                                                                        <p className="fw-bold mb-0 me-5 pe-3">${item.product.price}</p>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            ))}
                                            <hr
                                                className="mb-4"
                                                style={{ height: 2, backgroundColor: "#1266f1", opacity: 1 }}
                                            />

                                            <div className="d-flex justify-content-between px-x" >
                                                <p className="fw-bold">Item:</p>
                                                <p className="fw-bold">
                                                    {
                                                        cartItems ?
                                                            (cartItems?.reduce((item, nextitem) => {
                                                                return item + nextitem.quantity
                                                            }, 0)) : 0
                                                    }
                                                </p>
                                            </div>
                                            <div
                                                className="d-flex justify-content-between p-2 mb-2"
                                                style={{ backgroundColor: "#e1f5fe" }}
                                            >
                                                <h5 className="fw-bold mb-0">Total:</h5>
                                                <h5 className="fw-bold mb-0">${
                                                    cartItems ?
                                                        (cartItems?.reduce((total, items) => {
                                                            return total + (items.quantity * items.product.price)
                                                        }, 0)) : 0
                                                }</h5>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 px-5 py-4">
                                            {/* <h3 className="mb-5 pt-2 text-center fw-bold text-uppercase">
                                                Payment
                                            </h3>
                                            <form className="mb-5">
                                                <div className="form-outline mb-5">
                                                    <input
                                                        type="text"
                                                        id="typeText"
                                                        className="form-control form-control-lg"
                                                        siez={17}
                                                        defaultValue="1234 5678 9012 3457"
                                                        minLength={19}
                                                        maxLength={19}
                                                    />
                                                    <label className="form-label" htmlFor="typeText">
                                                        Card Number
                                                    </label>
                                                </div>
                                                <div className="form-outline mb-5">
                                                    <input
                                                        type="text"
                                                        id="typeName"
                                                        className="form-control form-control-lg"
                                                        siez={17}
                                                        defaultValue="John Smith"
                                                    />
                                                    <label className="form-label" htmlFor="typeName">
                                                        Name on card
                                                    </label>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-5">
                                                        <div className="form-outline">
                                                            <input
                                                                type="text"
                                                                id="typeExp"
                                                                className="form-control form-control-lg"
                                                                defaultValue="01/22"
                                                                size={7}
                                                                minLength={7}
                                                                maxLength={7}
                                                            />
                                                            <label className="form-label" htmlFor="typeExp">
                                                                Expiration
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 mb-5">
                                                        <div className="form-outline">
                                                            <input
                                                                type="password"
                                                                id="typeText"
                                                                className="form-control form-control-lg"
                                                                defaultValue="●●●"
                                                                size={1}
                                                                minLength={3}
                                                                maxLength={3}
                                                            />
                                                            <label className="form-label" htmlFor="typeText">
                                                                Cvv
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="mb-5">
                                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit{" "}
                                                    <a href="#!">obcaecati sapiente</a>.
                                                </p>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary btn-block btn-lg"
                                                >
                                                    Buy now
                                                </button>
                                                <h5
                                                    className="fw-bold mb-5"
                                                    style={{ position: "absolute", bottom: 0 }}
                                                >
                                                    <Link to="/Best Sellers">
                                                        <i className="fas fa-angle-left me-2" />
                                                        Back to shopping
                                                    </Link>
                                                </h5>
                                            </form> */}
                                            <div>
                                                <div>
                                                    <div className="shipping">
                                                        <div
                                                            onSubmit={(eventForm) => {
                                                                eventForm.preventDefault();
                                                            }}
                                                            className="form-group"
                                                            style={{ position: "relative" }}
                                                        >
                                                            <h2>Information</h2>
                                                            <div className="form-groupInput">
                                                                <input
                                                                    id="name"
                                                                    className="form-group-input"
                                                                    type="text"
                                                                    placeholder="Name"
                                                                    name="userName"
                                                                />
                                                                <br />
                                                                <input
                                                                    id="phone"
                                                                    className="form-group-input"
                                                                    type="text"
                                                                    placeholder="Phone Number"
                                                                    name="userPhoneNumber"
                                                                />
                                                                <br />
                                                                <input
                                                                    id="address"
                                                                    className="form-group-input"
                                                                    type="text"
                                                                    placeholder="Address"
                                                                    name="userAddress"
                                                                />
                                                                <br />
                                                            </div>
                                                            {/* Xử lý tại đây */}
                                                            <form
                                                                onSubmit={(eventForm) => {
                                                                    checkOut(eventForm);
                                                                }}
                                                            >
                                                                <div className="shippingDetails">
                                                                    <p>Payment methods</p>
                                                                    <input
                                                                        className="payment"
                                                                        type="radio"
                                                                        name="payment"
                                                                        value="CASH"
                                                                    />
                                                                    <span>Cash</span>

                                                                    <input
                                                                        className="payment"
                                                                        type="radio"
                                                                        name="payment"
                                                                        value="ZALO"
                                                                    />
                                                                    <span> Zalo</span>

                                                                    <input
                                                                     className="payment"
                                                                        type="radio"
                                                                        name="payment"
                                                                        value="MOMO"
                                                                    />
                                                                    <span>Momo</span>
                                                                 </div>
                                                                <button
                                                                    type="submit"
                                                                    className="form-group-checkout"
                                                                >
                                                                    Check Out
                                                                </button>
                                                            </form>
                                                            <p className="validate-email" />
                                                            {qrShow && qrData != null ? <Qr {...qrData} /> : <></>}
                                                <Link to="/Best Sellers" style={{color:"white",fontFamily:"cursive"}}><i className="fa-solid fa-backward">Back Shopping Card</i></Link>

                                                        </div>
                                                        {/* <div className="informationLine">
                        {cartItems?.map((item, index) => (
                            <div>
                                <div className="informationLine_product">
                                    <img src={`${item.product.avatar}`} />
                                    <div className="informationLine_text">
                                        <h4>{item.product.name}</h4>
                                        <p>
                                           (item.product.price)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="informationLine_total">
                            <h3>Total:</h3>
                            <span>
                                {convertToUSD(
                                    cartItems?.reduce((value, nextItem) => {
                                        return (value +=
                                            nextItem.quantity *
                                            nextItem.product.price);
                                    }, 0)
                                )}
                            </span>
                        </div>
                                                            </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
):( <div><h1 style={{textAlign:"center",marginTop:"50px"}}>Cart is empty</h1>
 <Link to="/Best Sellers" style={{color:"black",fontFamily:"cursive"}}><i className="fa-solid fa-backward">Back Shopping Card</i></Link>
            
</div>)}

        
        </div>
    )
}
