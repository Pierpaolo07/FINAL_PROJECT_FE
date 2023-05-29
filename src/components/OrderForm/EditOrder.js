import  { useOutletContext, useParams } from "react-router-dom";
import { useGet } from "../_Hooks/Customs";
import { URL_ORDERS } from "../_Utils/Constants";
import OrderForm from "./OrderForm";

const EditOrder = () => {
    const { id } = useParams();

    const {data} = useGet(URL_ORDERS, id);

    const {mutate} = useOutletContext();

    if(data) {
        return(
            <>
                    <div className="m-2 p-2 border">
                    <h5 className="text-center">Modifica Ordine</h5>
                    <OrderForm data={data} mutate={mutate} />
                    </div>
            </>
        );
    }
}

export default EditOrder;