import { Link } from "react-router-dom";
import { useDelete } from "../_Hooks/Customs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Card from 'react-bootstrap/Card';


import { URL_PRODUCTS } from "../_Utils/Constants";


const ProductItem = ({ product, deleteSuccess }) => {

    const base64prefix = "data:image/jpeg;base64,"

    const deleteData = useDelete(URL_PRODUCTS, product.id);

    const performDelete = () => {
        deleteData(deleteSuccess);
    };


    return (
        <>


            <Card className=" mx-3 my-3" style={{ width: '25rem', height: 'auto' }} >
                <Card.Img variant="top" src={base64prefix + (product.cover ? product.cover : "")} style={{ width: "auto", height: "15rem", objectFit: "contain" }} />
                <Card.Body>
                    <Card.Title> {product.name}</Card.Title>
                    <Card.Text>
                        {product.description}
                    </Card.Text>
                    <Link className="btn text-info" to={"edit/" + product.id}>
                <FontAwesomeIcon icon={faPenToSquare} style={{color: "#000000",}} />
                </Link>
                <button className="btn text-danger" onClick={performDelete}>
                    <FontAwesomeIcon icon={faTrashCan } style={{color: "gold"}} />
                </button>
                </Card.Body>
                <div className="bg-color">
                    {"Prezzo: " + product.price + "  €"}
                </div>
                
            </Card>

        </>
    );
}

export default ProductItem;

