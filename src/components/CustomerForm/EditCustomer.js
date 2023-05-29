import { useParams } from "react-router-dom";
import { useGet } from "../_Hooks/Customs";
import { URL_CUSTOMERS } from "../_Utils/Constants";
import CustomerForm from "./CustomerForm";


const EditCustomer = () => {

    const { id } = useParams();

    const {data} = useGet(URL_CUSTOMERS, id);

   if(data) {
    return (
        <div className="container">
            <h5>Modifica Cliente</h5>
            <CustomerForm data={data} />
        </div>
        );
   }
}

export default EditCustomer;