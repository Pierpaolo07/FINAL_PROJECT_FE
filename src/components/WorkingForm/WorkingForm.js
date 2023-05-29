import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePut, usePost } from "../_Hooks/Customs";
import Alert from "../Alert/Alert";
import { URL_WORKINGS, URL_ORDER_PRODUCTS } from "../_Utils/Constants";
import Form from 'react-bootstrap/Form';
import FetchSelectForWorking from '../FetchSelect/FetchSelectForWorking'
const WorkingForm = ({ data = {} }) => {


    const [working, setWorking] = useState({
        idOrderProduct: 0,
        description: "",
        processingHours: 0.0,
        priceHours: 0.0,
        processingStatus: 0
    })

    const [alertShow, setAlertShow] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const putData = usePut(URL_WORKINGS, data.id);

    const postData = usePost(URL_WORKINGS);

    const navigate = useNavigate();

    useEffect(() => {
        if (data.id > 0) {
            setWorking({
                idOrderProduct: data.idOrderProduct,
                description: data.description,
                processingHours: data.processingHours,
                priceHours: data.priceHours,
                processingStatus: data.processingStatus
            });
        }
    }, [data])

    const handleChange = (e) => {
        setWorking((prevValues) => {
            return {
                ...prevValues,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.id > 0) {
            putData(working, submitSucces);
        }
        else {
            postData(working, submitSucces);
        }
    }

    const alertDismiss = () => {
        setAlertShow(false);
        navigate("/workings", { replace: true });
    }


    const submitSucces = () => {
        setAlertMessage("Salvataggio completato!");
        setAlertShow(true);
    }

    return (
        <>
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-12">
                    <label className="form-label">Odine/Prodotti n.</label>
                    <FetchSelectForWorking className="form-control form-control-sm" name="idOrderProduct" value={working.idOrderProduct} onChange={handleChange} url={URL_ORDER_PRODUCTS} />
                </div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descrizione</Form.Label>
                    <Form.Control as="textarea" name="description" value={working.description} onChange={handleChange} rows={3} />
                </Form.Group>

                <div className="col-4">
                    <label className="form-label">Ore lavorazione</label>
                    <input className="form-control form-control-sm" type="number" name="processingHours" value={working.processingHours} onChange={handleChange} />
                </div>
                <div className="col-2">
                    <label className="form-label">Tariffa lavoro</label>
                    <input className="form-control form-control-sm" type="number" min={0} name="priceHours" value={working.priceHours} onChange={handleChange} />
                </div>
                <div className="col-2">
                    <label className="form-label">Stato lavorazione</label>
                    <input className="form-control form-control-sm" type="number" min={0} name="processingStatus" value={working.processingStatus} onChange={handleChange} />
                </div>
                <div className="col-12">
                    <div className="d-flex justify-content-around mt-3">
                        <button className="btn btn-success" type="submit">Salva</button>
                        <Link className="btn btn-outline-danger" to="/workings">Annulla</Link>
                    </div>
                </div>
            </form>
            <Alert show={alertShow} onHide={alertDismiss} message={alertMessage} />
        </>
    );
}


export default WorkingForm;