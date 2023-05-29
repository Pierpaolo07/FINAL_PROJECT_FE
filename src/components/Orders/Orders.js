import { Table } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useGet } from "../_Hooks/Customs";
import { useState } from "react";
import Alert from "../Alert/Alert";
import { URL_ORDERS } from "../_Utils/Constants";
import OrderRow from "./OrderRow";

const Orders = () => {

   const { data, error, isLoading, mutate } = useGet(URL_ORDERS);

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
            <div className="container my-4">
                <h4 className=" text-center font">Elenco Ordini</h4>
                <Link className="btn btn-sm btn-outline-danger my-4" to="new">Nuovo Ordine</Link>
                <Outlet context={{mutate}} />  
                <Table responsive className="colorstyle1">
                    <thead>
                        <tr>
                            <th>Gestisci</th>
                            <th>Ordine n.</th>
                            <th>Cliente</th>
                            <th>Data ordine</th>
                            <th>Data consegna</th>
                            <th>Fattura</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((order) => (
                        <OrderRow key={order.id} order={order} deleteSuccess={deleteSuccess}/>
                    ))}
                    </tbody>
                </Table>
                <Alert show={alertShow} onHide={alertDismiss} message={alertMessage} />
            </div>
        );
    }
    else if(isLoading) {
        <div>Caricamento in corso...</div> 
    }
    else if(error) {
        <div>ERRORE DI CARICAMENTO</div> 
    }
}

export default Orders;