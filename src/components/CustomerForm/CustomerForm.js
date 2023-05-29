import { useEffect, useState } from "react";
import { FloatingLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { usePut, usePost } from "../_Hooks/Customs";
import Alert from "../Alert/Alert"
import { URL_CUSTOMERS } from "../_Utils/Constants";


const CustomerForm = ({data = {}}) => {

    const [customer, setCustomer] = useState({
            name: "",
            surname: "",
            phone: "",
            email: ""
    });

    const [alertShow, setAlertShow] = useState(false);   // Variabile di stato per gestire la visualizzazione dell'alert
    const [alertMessage, setAlertMessage] = useState("");

    const putData = usePut(URL_CUSTOMERS, data.id); // Restituisce la funzione per il salvataggio dei dati

    const postData = usePost(URL_CUSTOMERS); // Restituisce la funzione per la creazione dei dati 
 
    const navigate = useNavigate();  

    useEffect(() => {
        if(data.id > 0) {
            setCustomer({
                name: data.name,
                surname: data.surname,
                phone: data.phone ? data.phone : "",
                email: data.email ? data.email : ""
            })
        }
    }, [data])

    const handleChange = (e) => {
        setCustomer((prevValues) => {
            return {
                ...prevValues,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(data.id > 0) {
            // se l'id è maggiore di 0 siamo in "edit"
            putData(customer, submitSucces);   
        }
        else {
            // se l'id è undefined o 0 siamo in "new"/post
            postData(customer, submitSucces);
        }
    }

    const alertDismiss = () => {
        setAlertShow(false);
        navigate("/customers", { replace: true });  // il replace è come se "interrompesse" la cronologia di navigazione
    }


    const submitSucces = () => {
        setAlertMessage("Salvataggio completato!");                
        setAlertShow(true);
    } 


    return (
        <>
        <form className="row">
            
            <div className="col-12">
                <FloatingLabel controlId="txtName" label="Nome" className="my-2">
                    <input id="txtName" className="form-control" name="name" value={customer.name} onChange={handleChange} placeholder="Nome"></input>
                </FloatingLabel>
            </div>
            <div className="col-12">
                <FloatingLabel controlId="txtSurname" label="Cognome" className="my-2">
                    <input id="txtSurname" className="form-control" name="surname" value={customer.surname} onChange={handleChange} placeholder="Cognome"></input>
                </FloatingLabel>
            </div>
            <div className="col-12">
                <FloatingLabel controlId="txtPhone" label="Telefono" className="my-2">
                    <input id="txtPhone" className="form-control" type="number" name="phone" value={customer.phone} onChange={handleChange} placeholder="Telefono"></input>
                </FloatingLabel>
            </div>
            <div className="col-12">
                <FloatingLabel controlId="txtEmail" label="Email" className="my-2">
                    <input id="txtEmail" className="form-control" type="email" name="email" value={customer.email} onChange={handleChange} placeholder="Email"></input>
                </FloatingLabel>
            </div>
            <div className="col-12">
                <div className="d-flex justify-content-around">
                    <button className="btn btn-sm btn-outline-success" onClick={handleSubmit}>Salva</button>
                    <Link className="btn btn-sm btn-outline-danger" to="/customers">Annulla</Link>
                </div>
            </div>
            
        </form>

        
        <Alert show={alertShow} onHide={alertDismiss} message={alertMessage}/>
        </>
    );
}

export default CustomerForm;