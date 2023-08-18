import { useRef, useState, useEffect, useContext } from 'react';
import './Admin.scss';
import axios from 'axios';
import { message } from 'antd';
import api from "@api"
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';

message.config({ top: 60, duration: 1, maxCount: 1, rtl: true, prefixCls: 'my-message', });
export default function Admin() {
    const urlPreviewRef = useRef();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState(null)
    const [users,setUsers]=useState(null)
    const [editingProduct, setEditingProduct] = useState(null);
    const [originalProduct, setOriginalProduct] = useState(null);
    const [searchStatus, setSearchStatus] = useState(false)
    const [searchData, setSearchData] = useState([])
    try {
        useEffect(() => {
            axios.get("http://localhost:4000/apis/v1/categories")
                .then(res => {
                    setCategories(res.data.data)
                })
        }, [])
    } catch (err) {

    }
    useEffect(() => {
        api.products.findMany()
            .then(res => {
                setProducts(res.data.data)
            })
            .catch(err => {
                alert("sap server")
            })
    }, [])
    useEffect(() => {
       // console.log("da vao roi ");
        api.users.findMany()
            .then(res => {
                setUsers(res.data)
            })
            .catch(err => {
                alert("sap server")
            })
    }, [])
    //console.log("users",users);
    const handleDeleteUserClick = async (user) => {
        if (window.confirm("Bạn có muốn xóa không ?")) {
            try {
                const result = await api.users.delete(user.id);
                if (result && result.status) {
                    alert("Xóa người dùng thành công");
                    const updatedUsers = users.filter(p => p.id !== user.id);
                    setUsers(updatedUsers);
                } else {
                    alert("Xóa người dùng thất bại");
                }
            } catch (error) {
                console.log("Delete Error:", error);
                // if (error.response) {
                //     console.log("Response Data:", error.response.data);
                //     console.log("Status Code:", error.response.status);
                // }
                alert("Lỗi khi xóa người dùng");
            }
        }
    };
    const handleDeleteClick = async (product) => {
        if (window.confirm("Bạn có muốn xóa không ?")) {
            try {
                const result = await api.products.delete(product.id);
                if (result.status) {
                    alert("Xóa sản phẩm thành công");
                    // Cập nhật danh sách sản phẩm sau khi xóa thành công
                    const updatedProducts = products.filter(p => p.id !== product.id);
                    setProducts(updatedProducts);
                } else {
                    alert("Xóa sản phẩm thất bại");
                }
            } catch (error) {
                alert("Lỗi khi xóa sản phẩm");
            }
        }
    };
    const handleEditClick = (product) => {
        const editingProductCopy = { ...product };
        setEditingProduct(editingProductCopy);
        setOriginalProduct(product);
    };
    const handleCancelEdit = () => {
        setEditingProduct(originalProduct);
        setEditingProduct(null);
    };
    const handleSaveEdit = async () => {
        try {
            const result = await api.products.edit(editingProduct.id, editingProduct);
            if (result) {
                alert("Cập nhật sản phẩm thành công");
                const updatedProducts = products.map(p =>
                    p.id === editingProduct.id ? result : p
                );
                setProducts(updatedProducts);
                setEditingProduct(null);
            } else {
                alert("Chưa cập nhật được sản phẩm");
            }
        } catch (error) {
            console.log("AxiosError:", error);
            if (error.response) {
                console.log("Response Data:", error.response.data);
                console.log("Status Code:", error.response.status);
            }
            //alert("Lỗi khi cập nhật sản phẩm");
        }
    };
    const handleNameChange = (event) => {
        const updatedProduct = { ...editingProduct, name: event.target.value };
        setEditingProduct(updatedProduct);
    };
    const handlePriceChange = (event) => {
        const updatedProduct = { ...editingProduct, price: event.target.value };
        setEditingProduct(updatedProduct);
    };
    let timeOut;
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
    return (
        <div>
            <form className='admin_container' onSubmit={async (eventForm) => {
                eventForm.preventDefault();

                let newProductInfor = {
                    category_id: Number(eventForm.target.category_id.value),
                    name: eventForm.target.name.value,
                    des: eventForm.target.des.value,
                    price: Number(eventForm.target.price.value),
                }
                let newProductAvatar = {
                    avatar: eventForm.target.avatar.files[0]
                }

                let fakeForm = new FormData();
                fakeForm.append("imgs", newProductAvatar.avatar);
                fakeForm.append("product_infor", JSON.stringify(newProductInfor));

                try {
                    let result = await api.products.create(fakeForm);
                    if (result.status == 200) {
                        alert("Thêm sản phẩm thành công");

                        // Gọi lại API lấy danh sách sản phẩm sau khi thêm thành công
                        api.products.findMany()
                            .then(res => {
                                setProducts(res.data.data);
                            })
                            .catch(err => {
                                alert("Lỗi khi lấy danh sách sản phẩm sau khi thêm");
                            });
                    } else {
                        alert("Chưa thêm được sản phẩm");
                    }
                } catch (err) {
                    alert("Sập server");
                }
            }}>
                <h2>Add Product</h2>
                <div className='admin_content'>
                    <div className='product_infor'>
                        <div className="form_group">
                            <label htmlFor="">Product Name</label><br />
                            <input type="text" name='name' />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">Description</label><br />
                            <textarea type="text" name='des' />
                        </div>
                        <div className="form_group">
                            <label htmlFor="">Price</label><br />
                            <input type="text" name='price' />
                        </div>
                        <label htmlFor="">Category</label><br />
                        <select name='category_id'>
                            {
                                categories?.map((category, index) => (
                                    <option key={index} value={category.id}>{category.title}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='product_image'>
                        <input name="avatar" onChange={(event) => {
                            if (event.target.files.length == 0) {

                            } else {
                                let blodUrl = URL.createObjectURL(event.target.files[0])
                                urlPreviewRef.current.src = blodUrl;
                            }
                        }} type="file" />
                        <img width={300} ref={urlPreviewRef} src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930" alt="" />
                    </div>

                </div>
                <div>
                    <button className='addProduct_btn' type='submit'>ADD PRODUCT </button>
                </div>
            </form>
            <div>
            <h2> List Users</h2>
            {/* Thông tin người dùng */}
            {users?.data?.map((user) => (
                    <div className="" style={{alignItems:"center",display:"flex"}}key={user.id}  >
                        <img className="" src={user.avatar} alt="Card image cap" width={100} height={100} />
                            <h5 className="user_name">{user.user_name}</h5>
                            <h5 className="user_name">{user.role}</h5>
                            <h5 className="user_email">{user.email}</h5>
                            <button className='b_block' onClick={() => handleBlockClick(user)}>Block</button>
                            <button className='b_delete_user' onClick={() => handleDeleteUserClick(user)}>delete</button>
                    </div>
                ))}
            </div>
            <div style={{ alignItems: "center" }}>
                <h2>List Products</h2>
                <div className="input-group">
                    <div className="form-outline">
                        {/* Tìm kiếm sản phẩm theo tên */}
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
                        <i className="fas fa-search">
                        </i>
                    </button>
                </div>
                {searchData.length > 0 ? (<div>    {searchData.map((product) => (
                    <div style={{ display: "flex" }} key={product.id}>
                        <img src={product.avatar} alt="Card image cap" width={100} height={100} />
                        <div style={{ display: "flex" }}>
                            {/* thông tin sản phẩm */}
                            <h5 className='a_name'>{product.name}</h5>
                            <p className='a_price'>
                               $ {product.price}
                            </p>
                            <button className='b_tedit' onClick={() => handleEditClick(product)}>edit</button>
                            <button className='b_delete' onClick={() => handleDeleteClick(product)}>delete</button>
                        </div>
                    </div>
                ))}</div>) : (<div>   {products?.map((product) => (
                    <div style={{ display: "flex" }} key={product.id}>
                        <img src={product.avatar} alt="Card image cap" width={100} height={100} />
                        {editingProduct && editingProduct.id === product.id ? (
                            <div style={{ marginBottom: "400px" }}>
                                {/*  input chỉnh sửa */}
                                <div className="form_group">
                                    <label>Product Name</label><br />
                                    <input
                                        type="text"
                                        value={editingProduct.name || ""}
                                        onChange={(event) => handleNameChange(event)}
                                    />
                                </div>
                                <div className="form_group">
                                    <label>Price</label><br />
                                    <input
                                        type="text"
                                        value={editingProduct.price || ""}
                                        onChange={(event) => handlePriceChange(event)}
                                    />
                                </div>
                                <button onClick={() => handleSaveEdit(product) }className="b_save">Save</button>
                                <button onClick={() => handleCancelEdit()} className='b_cancel'>Cancel</button>
                            </div>
                        ) : (
                            <div style={{ display: "flex" }}>
                                {/* thông tin sản phẩm */}
                                <h5 className='a_name'>{product.name}</h5>
                                <p className='a_price'>
                                    ${product.price}
                                </p>
                                <button className='b_tedit' onClick={() => handleEditClick(product)}>edit</button>
                                <button className='b_delete' onClick={() => handleDeleteClick(product)}>delete</button>
                            </div>
                        )}
                    </div>
                ))}</div>)}
            </div>
        </div >
    )
}
