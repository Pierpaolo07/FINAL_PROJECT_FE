import WorkingForm from "./WorkingForm";
//import  { useOutletContext } from "react-router-dom";

const NewWorking = () => {

    //const {mutate} = useOutletContext();       // useOutletContext permette di reperire le proprietà e/o funzioni passate al "context" dell'Outlet (vedi Songs.js) 

        return(
            <>
                    <div className="m-2 p-2 border">
                    <h5 className="text-center font">Nuova Lavorazione</h5>
                    <WorkingForm />
                    </div>
            </>
        );
    }


export default NewWorking;