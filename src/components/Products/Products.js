import Alert from "../Alert/Alert";
import { useGet } from "../_Hooks/Customs";
import { Link } from "react-router-dom";
import { useState } from "react";
import { URL_PRODUCTS } from "../_Utils/Constants";
import ProductItem from "./ProductItem";


const Products = () => {

    const { data, mutate } = useGet(URL_PRODUCTS);


    const [alertShow, setAlertShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const alertDismiss = () => {
        setAlertShow(false);
        mutate();
    }

    const deleteSuccess = () => {
        setAlertMessage("Eliminazione completata!")
        setAlertShow(true);
    }

    if (data) {
        return (
            <>
                <div className="container my-4">
                    <h4 className=" text-center font">Elenco Prodotti</h4>

                    <Link to="new" className="btn btn-sm my-4 btn-outline-warning">Nuovo Prodotto
                    </Link>


                    <div className="row">
                        {data.map((product) => (
                            <ProductItem key={product.id} product={product} deleteSuccess={deleteSuccess} />
                        ))}
                    </div>
                </div>
                <Alert show={alertShow} onHide={alertDismiss} message={alertMessage} />
            </>
        );
    }
}

export default Products;