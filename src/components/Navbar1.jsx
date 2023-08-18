import React, { useState } from 'react'
import './Navbar1.scss'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { RootContext } from '@/App'
import api from "@api"
export default function Navbar1() {
    const { cartStore, userStore } = useContext(RootContext);
    let timeOut;
    const [searchStatus, setSearchStatus] = useState(false)
    const [searchData, setSearchData] = useState([])
    async function searchKeyWords(searchValue) {
        clearTimeout(timeOut);
    
        timeOut = setTimeout(async () => {
            setSearchStatus(true);
            try {
                if (searchStatus) {
                    return;
                }
                const result = await api.products.search(searchValue);
                if (result.status === 200) {
                    setSearchStatus(false);
                    setSearchData(result.data.data);
                }
            } catch (err) {
                console.log("Error calling API:", err);
            }
        }, 250);
    }


    function handleLogout() {
        if (window.confirm("Bạn có muốn đăng xuất không")) {
            localStorage.removeItem('token');
        }


    }


    return (
        <div>
            <div className="main__navigation">
                <div className="header container">
                    <div className="row">
                        <div>
                            <Link className="fa-regular fa-user" to="/profile"></Link>

                            {userStore.data == null ?
                                (<Link to="/login"><button className='btl'>Login</button></Link>) :
                                (<button onClick={handleLogout} className="btl1">Logout</button>)
                            }
                        </div>
                        <div className='home'>
                            <a
                                href="/admin"
                                aria-label="Home"
                                title="GODIVA Logo"
                            >
                                <h1 className="logo-home">GODIVA</h1>
                                <p className='p'>Belgium 1926</p>
                            </a>
                        </div>
                        <div className="search-bar">


                            <div className="site-search">

                                <div className="input-group">
                                    <div className="form-outline">
                                        <input id="search-focus" type="search" className="form-control" placeholder="Search (keywords,etc)" onChange={(event) => {
                                            const searchValue = event.target.value;
                                            if (searchValue.trim() !== "") {
                                                searchKeyWords(searchValue);
                                            } else {
                                                setSearchData([]);
                                            }
                                        }} />
                                    </div>
                                    <button type="button" className="btn ">
                                        <Link to="" ><i className="fas fa-search">
                                        </i></Link>
                                    </button>
                                </div>

                            </div>


                            <div
                                className="minicart"
                                data-action-url="/on/demandware.store/Sites-Godiva-Site/en_US/Cart-MiniCartShow"
                                data-ahref="https://www.godiva.com/cart"
                            >
                                <div className="minicart-total hide-link-md">
                                    <Link
                                        className="minicart-link"
                                        to="/pay"
                                        title="Cart 0 Items"
                                        aria-label="Cart 0 Items"
                                        aria-haspopup="true"
                                    ><div className='spc'>
                                            <i className="fa-solid fa-bag-shopping"></i>

                                            <span style={{ color: "red" }} className="minicart-quantity "> {
                                                cartStore.data?.cart_details?.reduce((result, nextItem) => {
                                                    return result += nextItem.quantity
                                                }, 0)
                                            }</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="popover popover-bottom" />
                                <div
                                    className="modal fade"
                                    id="removeProductModal"
                                    tabIndex={-1}
                                    role="dialog"
                                    aria-labelledby="removeProductLineItemModal"
                                >
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header delete-confirmation-header">
                                                <h2 className="modal-title" id="removeProductLineItemModal">
                                                    Remove Product?
                                                </h2>
                                                <button
                                                    type="button"
                                                    className="close"
                                                    data-dismiss="modal"
                                                    aria-label="Close"
                                                >
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                            </div>
                                            <div className="modal-body-remove delete-confirmation-body">
                                                Are you sure you want to remove the following product from
                                                the cart?
                                                <p className="product-to-remove" />
                                            </div>
                                            <div className="modal-footer-remove">
                                                <button
                                                    type="button"
                                                    className="btn btn-brown-outline"
                                                    data-dismiss="modal"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-brown-custom cart-delete-confirmation-btn"
                                                    data-dismiss="modal"
                                                >
                                                    Yes
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div
                    className="main-menu navbar-toggleable-sm menu-toggleable-left multilevel-dropdown d-none d-md-block"
                    id="sg-navbar-collapse"
                >
                    <div className="container top-navigation">
                        <div className="row">
                            <nav
                                className="navbar navbar-expand-md bg-inverse col-12"
                                aria-label="Main"
                            >
                                <div className="menu-group">
                                    <ul className="nav navbar-nav" role="menu">
                                    <li className="nav-item" role="presentation">
                                    
                                    <Link
                                        to="/"
                                        id="best-selling-chocolate-desktop"
                                        className="nav-link"
                                        role="link"
                                        tabIndex={0}
                                    >
                                       home
                                    </Link>
                                    </li>
                                        <li className="nav-item" role="presentation">
                                    
                                            <Link
                                                to="/Best Sellers"
                                                id="best-selling-chocolate-desktop"
                                                className="nav-link"
                                                role="link"
                                                tabIndex={0}
                                            >
                                                Best Sellers
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown" role="presentation">
                                            <Link
                                                to="/Chocolate"
                                                id="best-selling-chocolate-desktop"
                                                className="nav-link"
                                                role="link"
                                                tabIndex={0}
                                            >
                                                Chocolate
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown" role="presentation">
                                            <Link
                                                to="/Gifts"
                                                id="best-selling-chocolate-desktop"
                                                className="nav-link"
                                                role="link"
                                                tabIndex={0}
                                            >
                                                Gifts
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown" role="presentation">
                                            <Link
                                                to="/Sales&Deals"
                                                id="best-selling-chocolate-desktop"
                                                className="nav-link"
                                                role="link"
                                                tabIndex={0}
                                            >
                                                Sales &amp; Deals
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown" role="presentation">
                                            <Link
                                                to="/about"
                                                id="best-selling-chocolate-desktop"
                                                className="nav-link"
                                                role="link"
                                                tabIndex={0}
                                            >
                                                About GODIVA
                                            </Link>
                                        </li>

                                        <li className="nav-item" role="presentation">
                                            <Link
                                                to="/grocery"
                                                id="godiva-in-the-aisle-desktop"
                                                className="nav-link"
                                                role="link"
                                                tabIndex={0}
                                            >
                                                Grocery Aisle
                                            </Link>
                                        </li>

                                    </ul>
                                </div>

                            </nav>
                        </div>
                    </div>
                </div>

            </div>
            {searchData?.length > 0 && (
                <div style={{
                    display: "flex",
                    flexWrap: 'wrap-reverse',
                    justifyContent: "center",
                    padding: "30px",
                    backgroundColor: "white"
                }}>
                    {searchData.map((product) => (
                        <div className="card" style={{ width: "18rem", margin: "25px 25px", alignItems: "center" }} key={product.id}
                            onClick={() => {
                                window.open("/products/" + product.id, "_blank");
                            }}>
                            <img className="card-img-top" src={product.avatar} alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className='p_price'>
                                ${product.price}

                                </p>
                                <button onClick={() => navigate(`/products/${product.id}`)} className="btgr">
                                   VIEW FULL DETAILS
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}


        </div>
    )
}
