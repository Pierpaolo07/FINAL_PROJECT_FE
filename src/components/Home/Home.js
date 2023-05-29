import { Table } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useGet } from "../_Hooks/Customs";
import { URL_ORDERS } from "../_Utils/Constants";
import OrderRowHome from "../Orders/OrderRowHome";
const Home = () => {



    const { data, error, isLoading } = useGet(URL_ORDERS);


    if (data) {

        return (
            <div className="container">
                <h5 className=" text-center my-4 font">Ultimi Ordini</h5>
                <Outlet />
                <Table responsive className="colorstyle1">
                    <thead>
                        <tr>
                            <th>Ordine n.</th>
                            <th>Cliente</th>
                            <th>Data ordine</th>
                            <th>Data consegna</th>
                            <th>Fattura</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((order) => (
                            <OrderRowHome key={order.id} order={order} />
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
    else if (isLoading) {
        <div>Caricamento in corso...</div> 
    }
    else if (error) {
        <div>ERRORE DI CARICAMENTO</div> 
    }

}

export default Home;