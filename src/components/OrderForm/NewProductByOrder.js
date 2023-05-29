import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePost } from "../_Hooks/Customs";
import Alert from "../Alert/Alert"
import { URL_ORDER_PRODUCTS, URL_PRODUCTS } from "../_Utils/Constants";

import FetchSelect from "../FetchSelect/FetchSelect";

const NewProductByOrder = ({ data = {} }) => {


    const [orderProduct, setOrderProduct] = useState({
        idProduct: 0,
        quantity: 0
    })

    const [alertShow, setAlertShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const postData = usePost(URL_ORDER_PRODUCTS);

    const navigate = useNavigate();

    useEffect(() => {
        if (data.id > 0) {
            setOrderProduct({

                idProducts: data.idProduct,
                quantity: data.quantity
            });
        }
    }, [data])

    const handleChange = (e) => {
        setOrderProduct((prevValues) => {
            return {
                ...prevValues,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.id === 0) {
            postData(orderProduct, submitSucces);
        }
    }

    const alertDismiss = () => {
        setAlertShow(false);
        navigate("/orders", { replace: true });
    }


    const submitSucces = () => {
        setAlertMessage("Salvataggio completato!");
        setAlertShow(true);
    }

    return (
        <>
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label className="form-label">Prodotti</label>
                    <FetchSelect className="form-control form-control-sm" name="idProduct" value={orderProduct.idProduct} onChange={handleChange} url={URL_PRODUCTS} />
                </div>
                <div className="col-4">
                    <label className="form-label">Quantità</label>
                    <input className="form-control form-control-sm" type="number" name="quantity" value={orderProduct.quantity} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <div className="d-flex justify-content-around mt-3">
                        <button className="btn btn-success" type="submit">Salva</button>
                    </div>
                </div>
            </form>
            <Alert show={alertShow} onHide={alertDismiss} message={alertMessage} />
        </>
    );
}

export default NewProductByOrder;