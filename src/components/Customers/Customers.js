import Alert from "../Alert/Alert";
import { useGet } from "../_Hooks/Customs";
import { Link } from "react-router-dom";
import { useState } from "react";
import { URL_CUSTOMERS } from "../_Utils/Constants";
import CustomerItem from "./CustomerItem";

const Customers = () => {

    const {data, mutate} = useGet(URL_CUSTOMERS);


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

    if(data) {
        return (
            <>
            <div className="container my-4">
                <h5 className=" text-center font">Clienti</h5>
                <Link className="btn btn-sm btn-outline-success" to="new">Nuovo Cliente</Link>
                <div className="row">
                    {data.map(customer => (
                        <CustomerItem key={customer.id} customer={customer} deleteSuccess={deleteSuccess}/>
                    ))}
                </div>    
            </div>
            <Alert show={alertShow} onHide={alertDismiss} message={alertMessage} />
            </>
        );
    }
}

export default Customers;