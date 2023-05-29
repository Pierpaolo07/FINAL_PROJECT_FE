import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDelete } from "../_Hooks/Customs";
import { URL_WORKINGS } from "../_Utils/Constants";

import Form from 'react-bootstrap/Form';

const WorkingRow = ({ working, deleteSuccess }) => {


    const deleteData = useDelete(URL_WORKINGS, working.id)

    const performDelete = () => {
        deleteData(deleteSuccess);
    }

    return (
        <tr>
            <td className="align-middle">
                <Link className="btn text-info" to={"edit/" + working.id}>
                    <FontAwesomeIcon icon={faBriefcase} style={{ color: "#0d6efd", }} />
                </Link>
                <button className="btn text-danger" onClick={performDelete}>
                    <FontAwesomeIcon icon={faTrash} style={{ color: "#000d4d", }} />
                </button>
            </td>

            {/*<td>
                <div>{orderProduct ? orderProduct.id : working.idOrderProduct}</div>
                </td>*/}
            <td className="align-middle">{working.description}</td>
            <td className="align-middle">{working.processingHours}</td>
            <td className="align-middle">{working.priceHours + " €"}</td>
            <td className="align-middle">{working.processingStatus} <Form.Label></Form.Label>
                <Form.Range /> </td>
        </tr>
    );
}

export default WorkingRow;