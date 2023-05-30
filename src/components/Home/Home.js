import { Table } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useGet } from "../_Hooks/Customs";
import { URL_ORDERS } from "../_Utils/Constants";
import OrderRowHome from "../Orders/OrderRowHome";

const Home = () => {
  const { data, error, isLoading } = useGet(URL_ORDERS);

  if (data) {
    // Ordina gli ordini per data in ordine decrescente
    const sortedOrders = data.sort((a, b) => new Date(b.dateOrder) - new Date(a.dateOrder));

    // Imposta un limite per il numero di ordini da visualizzare
    const limit = 3;
    const recentOrders = sortedOrders.slice(0, limit);

    return (
      <div className="container">
        <h5 className="text-center my-4 font">Ultimi Ordini</h5>
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
            {recentOrders.map((order) => (
              <OrderRowHome key={order.id} order={order} />
            ))}
          </tbody>
        </Table>
      </div>
    );
  } else if (isLoading) {
    return <div>Caricamento in corso...</div>;
  } else if (error) {
    return <div>ERRORE DI CARICAMENTO</div>;
  }
};

export default Home;
