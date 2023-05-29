import { Link } from "react-router-dom";
import { useGet, useDelete } from "../_Hooks/Customs";
import Alert from 'react-bootstrap/Alert';
import { useState } from "react";
import { URL_CUSTOMERS } from "../_Utils/Constants";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const CustomerItem = ({ customer, deleteSuccess }) => {

  const [showDelete, setShowDelete] = useState(false);

  const { data: orders } = useGet(URL_CUSTOMERS + "/" + customer.id + "/orders");

  const deleteData = useDelete(URL_CUSTOMERS, customer.id);

  const performDelete = () => {
    deleteData(deleteSuccess);
  };


  return (
    <>
      {[
        'success'
      ].map((variant) => (
        <Card
          bg={variant.toLowerCase()}
          key={variant}
          text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
          style={{ width: '18rem' }}
          className="mb-2 m-4"
        >
          <Card.Title className="my-2">{customer.surname}</Card.Title>
          <Card.Title className="my-2">{customer.name}</Card.Title>
          <Card.Body className=" text-center m-1">
            <Card.Text>
              <FontAwesomeIcon icon={faPhone} style={{ color: "#ffffff", }} /> {customer.phone} <br /><br />
              <FontAwesomeIcon icon={faEnvelope} style={{ color: "#ffffff", }} />{customer.email}
            </Card.Text>
          </Card.Body>
          <div className="d-grid gap-2 ">
            <Link className=" text-center" to={"edit/" + customer.id}>
              <Button variant="success" size="lg">Modifica
              </Button>
            </Link>
            <Button variant="success" size="lg" onClick={() => { setShowDelete(true) }}>
              Elimina
            </Button>
          </div>
          <div className="col-12">
            <Alert className="mt-2" show={showDelete} variant="danger">
              <Alert.Heading>Eliminare <br />{customer.name + " " + customer.surname} ?</Alert.Heading>
              {orders && orders.length > 0 ?
                (<p>
                  Verranno eliminati anche: {orders.length} ordini/e. Vuoi procedere?
                </p>)
                : ""}
              <hr />
              <div className="d-flex justify-content-end">
                <button className="btn btn-sm btn-outline-success me-2" onClick={performDelete}>
                  Conferma
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => setShowDelete(false)}>
                  Annulla
                </button>
              </div>
            </Alert>
          </div>

        </Card>

      ))}
    </>
  );
}

export default CustomerItem;