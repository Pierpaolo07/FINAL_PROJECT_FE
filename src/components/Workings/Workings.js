import { Table } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useGet } from "../_Hooks/Customs";
import { useState } from "react";
import Alert from "../Alert/Alert";
import { URL_WORKINGS } from "../_Utils/Constants";
import WorkingRow from "./WorkingRow";


const Workings = () => {

    const { data, mutate } = useGet(URL_WORKINGS);

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
                <h4 className=" text-center font">Elenco Lavorazioni</h4>

                <Link className="btn btn-sm my-4 btn-outline-primary" to="new">Nuova Lavorazione</Link>
                <Outlet context={{ mutate }} />
                <Table responsive className="colorstyle1">
                    <thead>
                        <tr>
                            <th>Gestisci</th>
                            <th>Descrizione lavorazione</th>
                            <th>Ore lavorazione</th>
                            <th>Tariffa lavoro</th>
                            <th>Stato lavorazione</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((working) => (
                            <WorkingRow key={working.id} working={working} deleteSuccess={deleteSuccess} />
                        ))}


                    </tbody>
                </Table>
                <Alert show={alertShow} onHide={alertDismiss} message={alertMessage} />
            </div>
        );
    }
}

export default Workings;