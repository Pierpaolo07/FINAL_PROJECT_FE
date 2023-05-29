import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useGet, useDelete } from "../_Hooks/Customs";
import { URL_CUSTOMERS, URL_ORDERS } from "../_Utils/Constants";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import NewProductByOrder from "../OrderForm/NewProductByOrder";

const OrderRow = ({ order, deleteSuccess }) => {

    const { data: customer } = useGet(URL_CUSTOMERS, order.idCustomer);
    const [open, setOpen] = useState(false);

    const deleteData = useDelete(URL_ORDERS, order.id)

    const performDelete = () => {
        deleteData(deleteSuccess);
    }

    return (
        <tr>
            <td className="align-middle">
                <Link className="btn text-info" to={"edit/" + order.id}>
                    <FontAwesomeIcon icon={faPenNib} style={{ color: "#0f8500", }} />
                </Link>
                <button className="btn text-danger" onClick={performDelete}>
                    <FontAwesomeIcon icon={faTrash} style={{ color: "#ff0000", }} />
                </button>
                <button
                    className="btn"
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    <FontAwesomeIcon icon={faGear} spin spinReverse style={{ color: "blue", }} />
                </button>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        <NewProductByOrder />
                    </div>
                </Collapse>
            </td>
            <td>
                <div>{order.id}</div>
            </td>
            <td>
                <div>{customer ? customer.surname : order.idCustomer}</div>
                <div className="small">{customer ? customer.name : order.idCustomer}</div>
            </td>
            <td className="align-middle">{order.dateOrder.substring(0, 10)}</td>
            <td className="align-middle">{order.dateDelivery.substring(0, 10)}</td>
            <td className="align-middle">{order.invoice + " €"}</td>
        </tr>
    );
}

export default OrderRow;