import  { useParams } from "react-router-dom";
import { useGet } from "../_Hooks/Customs";
import { URL_WORKINGS } from "../_Utils/Constants";
import WorkingForm from "./WorkingForm";

const EditWorking = () => {
    const { id } = useParams();

    const {data, error} = useGet(URL_WORKINGS, id);

   // const {mutate} = useOutletContext();       // useOutletContext permette di reperire le proprietà e/o funzioni passate al "context" dell'Outlet (vedi Songs.js) 

    if(data) {
        return(
            <>
                    <div className="m-2 p-2 border">
                    <h5 className="text-center">Modifica Lavorazione</h5>
                    <WorkingForm data={data}  />
                    </div>
            </>
        );
    }
}

export default EditWorking;