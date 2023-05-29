import { useEffect, useState } from "react";
import { FloatingLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { usePut, usePost } from "../_Hooks/Customs";
import Alert from "../Alert/Alert"
import { URL_PRODUCTS } from "../_Utils/Constants";
import { render } from "react-dom";
import Form from 'react-bootstrap/Form';


const ProductForm = ({data = {}}) => {
    const base64prefix = "data:image/jpeg;base64,"

    const [product, setProduct] = useState({
            name: "",
            description: "",
            price: "",
            cover: ""
    });

    const [imgPreview, setImgPreview] = useState((data.cover ? base64prefix + data.cover : ""))

    const [alertShow, setAlertShow] = useState(false);   // Variabile di stato per gestire la visualizzazione dell'alert
    const [alertMessage, setAlertMessage] = useState("");

    const putData = usePut(URL_PRODUCTS, data.id); // Restituisce la funzione per il salvataggio dei dati

    const postData = usePost(URL_PRODUCTS); // Restituisce la funzione per la creazione dei dati 
 
    const navigate = useNavigate();  

    useEffect(() => {
        if(data.id > 0) {
            setProduct({
                name: data.name,
                description: data.description,
                price: data.price,
                cover: ""
            })
        }
    }, [data])

    const getBase64 = async (file) => {

        var reader = new FileReader(); // Creo il file reader per leggere il file
        
        await reader.readAsDataURL(file); // con il metodo "readAsDataURL" leggo i dati del file passato come parametro
        reader.onload = function () {  // creo una funzione di load, che viene eseguita in modo asincrono quando il caricamento è completato
            setImgPreview(render.result)
            setProduct((prevValues) => {   // quando il file è stato caricato viene eseguito il "setSong" sul campo apposito
                return {
                    ...prevValues,
                    "cover":  reader.result.replace(base64prefix, "")  // con replace su .result, rimuovo il prefisso dal base64
                }
            });
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }


    const handleChange = (e) => {
        if(e.target.name === 'cover') {
            getBase64(e.target.files[0])
        }
        else {  
            setProduct((prevValues) => {
            return {
                ...prevValues,
                [e.target.name]: e.target.value
            }
        });
    }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Codice per il salvataggio
        if(data.id > 0) {
            // se l'id è maggiore di 0 siamo in "edit"
            putData(product, submitSucces);   // data -> song; successFn -> submitSuccess (vedi Customs.js / usePut)   
        }
        else {
            // se l'id è undefined o 0 siamo in "new"/post
            postData(product, submitSucces);
        }
    }

    const alertDismiss = () => {
        setAlertShow(false);
        navigate("/products", { replace: true });  // il replace è come se "interrompesse" la cronologia di navigazione
        //mutate();
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
                    <input id="txtName" className="form-control" name="name" value={product.name} onChange={handleChange} placeholder="Nome"></input>
                </FloatingLabel>
            </div>
            <div className="col-12">
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descrizione</Form.Label>
        <Form.Control as="textarea" name="description" value={product.description} onChange={handleChange} placeholder="Descrizione" rows={3} />
      </Form.Group>
                
            </div>
            <div className="col-12">
                <FloatingLabel controlId="txtPrice" label="Prezzo" className="my-2">
                    <input id="txtPrice" className="form-control" type="number" name="price" value={product.price} onChange={handleChange} placeholder="Prezzo al pezzo"></input>
                </FloatingLabel>
            </div>
            <div className="col-12">
                        <label className="form-label">Immagine</label>
                        <img src={imgPreview} style={{width: "100px"}} />
                        <input className="form-control form-control-sm" type="file" name="cover" onChange={handleChange} />
                        
                    </div>
            <div className="col-12">
                <div className="d-flex justify-content-around">
                    <button className="btn btn-sm btn-outline-success" onClick={handleSubmit}>Salva</button>
                    <Link className="btn btn-sm btn-outline-danger" to="/products">Annulla</Link>
                </div>
                
            </div>
           
        </form>
        <Alert show={alertShow} onHide={alertDismiss} message={alertMessage}/>
        </>
    );
}

export default ProductForm;