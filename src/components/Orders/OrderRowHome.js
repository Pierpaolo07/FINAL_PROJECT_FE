
import { useGet } from "../_Hooks/Customs";
import { URL_CUSTOMERS } from "../_Utils/Constants";

const OrderRowHome = ({ order }) => {

    const { data: customer } = useGet(URL_CUSTOMERS, order.idCustomer);



    return (
        <>
            <tr>
                <tb>
                    <div>{order.id}</div>
                </tb>
                <td>
                    <div>{customer ? customer.surname : order.idCustomer}</div>
                    <div className="small">{customer ? customer.name : order.idCustomer}</div>
                </td>
                <td className="align-middle">{order.dateOrder.substring(0, 10)}</td>
                <td className="align-middle">{order.dateDelivery.substring(0, 10)}</td>
                <td className="align-middle">{order.invoice + " €"}</td>
            </tr>
        </>
    );

}

export default OrderRowHome;