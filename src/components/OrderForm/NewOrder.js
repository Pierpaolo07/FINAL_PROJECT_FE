import OrderForm from "./OrderForm";
import  { useOutletContext } from "react-router-dom";

const NewOrder = () => {

    const {mutate} = useOutletContext();     
        return(
            <>
                    <div className="m-2 p-2 border">
                    <h5 className="text-center font">Nuovo Ordine</h5>
                    <OrderForm mutate={mutate} />
                    </div>
            </>
        );
    }


export default NewOrder;