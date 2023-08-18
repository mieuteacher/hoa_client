import { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RootContext } from "@/App"
export default function ListProduct() {
    const { categoryStore, categoryActions, dispatch } = useContext(RootContext)
    const { type } = useParams();
    useEffect(() => {
        if (type == "Best Sellers") {
            dispatch(categoryActions.findByCategory(2));
        }
        if (type == "Chocolate") {
            dispatch(categoryActions.findByCategory(3));
        }
        if (type == "Gifts") {
            dispatch(categoryActions.findByCategory(4));
        }
        if (type == "Sales&Deals") {
            dispatch(categoryActions.findByCategory(5));
        }
    }, [type])
    const navigate = useNavigate();

    
    return (
        <div>
            <div style={{
                display: "flex",
                flexWrap: 'wrap-reverse',
                justifyContent:"center",
                padding:"30px"
            }
            }>
                {categoryStore?.data?.map((product, index) => (
                    <div className="card card_hover" style={{ width: "18rem",margin:"25px 25px" ,alignItems:"center"}}key={product.id}  >
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
        </div>
    );
}
