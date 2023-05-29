import { useParams } from "react-router-dom";
import { useGet } from "../_Hooks/Customs";
import { URL_PRODUCTS } from "../_Utils/Constants";
import ProductForm from "./ProductForm";


const EditProduct = () => {

    const { id } = useParams();

    const {data, error} = useGet(URL_PRODUCTS, id);

   if(data) {
    return (
        <div className="container">
            <h5>Modifica Prodotti</h5>
            <ProductForm data={data} />
        </div>
        );
   }
}

export default EditProduct;