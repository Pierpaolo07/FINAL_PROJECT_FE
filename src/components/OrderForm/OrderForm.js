import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePut, usePost } from "../_Hooks/Customs";
import FetchSelect from "../FetchSelect/FetchSelect";
import Alert from "../Alert/Alert";
import { URL_CUSTOMERS, URL_ORDERS } from "../_Utils/Constants";

const OrderForm = ({data = {}, mutate}) => {


    const [order, setOrder] = useState({
        dateOrder: "",
        dateDelivery: "",
        invoice: 0.0,
        idCustomer: 0
    })

    const [alertShow, setAlertShow] = useState(false);   // Variabile di stato per gestire la visualizzazione dell'alert
    const [alertMessage, setAlertMessage] = useState("");  // Variabile di stato per gestire il messaggio dell'alert

   
    const putData = usePut(URL_ORDERS, data.id); // Restituisce la funzione per il salvataggio dei dati

    const postData = usePost(URL_ORDERS); // Restituisce la funzione per la creazione dei dati 
 
    const navigate = useNavigate();     // useNavigate genera la funzione per la navigazione tra pagine in modo programmatico

    useEffect(() => {
        if(data.id > 0) {
            setOrder({
                dateOrder: data.dateOrder,
                dateDelivery: data.dateDelivery,
                invoice: data.invoice,
                idCustomer: data.idCustomer
            });
        }
    }, [data])

    const handleChange = (e) => {
        setOrder((prevValues) => {
            return {
                ...prevValues,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Codice per il salvataggio
        if(data.id > 0) {
            // se l'id è maggiore di 0 siamo in "edit"
            putData(order, submitSucces);   // data -> song; successFn -> submitSuccess (vedi Customs.js / usePut)   
        }
        else {
            // se l'id è undefined o 0 siamo in "new"/post
            postData(order, submitSucces);
        }
    }

    const alertDismiss = () => {
        setAlertShow(false);
        navigate("/orders", { replace: true });  // il replace è come se "interrompesse" la cronologia di navigazione
        mutate();
    }


    const submitSucces = () => {
        setAlertMessage("Salvataggio completato!");                
        setAlertShow(true);
    } 

    return (
        <>
                <form className="row" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label className="form-label">Cliente</label>
                        <FetchSelect className="form-control form-control-sm" name="idCustomer" value={order.idCustomer}  onChange={handleChange} url={URL_CUSTOMERS} />
                    </div>
                    <div className="col-4">
                        <label className="form-label">Data ordine</label>
                        <input className="form-control form-control-sm" type="date" name="dateOrder" value={order.dateOrder.substring(0,10)} onChange={handleChange}/>
                    </div>
                    <div className="col-4">
                        <label className="form-label">Data consegna</label>
                        <input className="form-control form-control-sm" type="date" name="dateDelivery" value={order.dateDelivery.substring(0,10)} onChange={handleChange}/>
                    </div>
                    <div className="col-2">
                        <label className="form-label">Fattura</label>
                        <input className="form-control form-control-sm" type="number" min={0} name="invoice" value={order.invoice} onChange={handleChange}/>
                    </div>
                    <div className="col-12">
                        <div className="d-flex justify-content-around mt-3">
                        <button className="btn btn-success" type="submit">Salva</button>
                        <Link className="btn btn-outline-danger" to="/orders">Annulla</Link>
                        </div>
                    </div>
                </form>
            <Alert show={alertShow} onHide={alertDismiss} message={alertMessage} />
        </>
    );
}


export default OrderForm;