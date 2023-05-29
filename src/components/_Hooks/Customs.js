import axios from "axios";
import useSWR from "swr"; 

const fetcher = (url) => axios.get(url).then(result => result.data);
// INIZIO - useGet -> Hook per il fetching dei dati
const useGet = (url, id = 0) => {

    let finalUrl = url;               
    if(id > 0) {
        finalUrl += ("/" + id);
    }
    
    const {data, error, mutate} = useSWR(finalUrl, fetcher);

    return {
        data: data,
        error: error,
        isLoading: !data && !error,
        mutate: mutate
    }

}
// Fine - useGet

// INIZIO - usePut -> Hook per la modifica dei dati
const usePut = (url, id) => {
    const finalUrl = url + "/" + id;
    // usePut restituisce una funzione da eseguire in fase di submit
    return (data, successFn) => {  // data -> l'oggetto con i dati da salvare; successFn -> la funzione da eseguire nel then
        axios.put(finalUrl,data).then(result => {
            if(result.data) {
                successFn();   // se il salvataggio va a buon fine, il "then" verrà eseguita la funzione "successFn"
            }
        })
    }
}
// Fine - usePut


// INIZIO - usePost -> Hook per la creazione dei dati
const usePost = (url) => {
    return (data, successFn) => {
        axios.post(url, data).then(result => {
            if(result.data) {
                successFn();
            }
        })
    }
}
// Fine - usePost

// INIZIO - useDelete -> Hook per l'eliminazione dei dati
const useDelete = (url, id) => {
    const finalUrl = url + "/" + id;

    return (successFn) => {
        axios.delete(finalUrl).then(result => {
            if(result.data) {
                successFn();
            }
        })    
    }
}
// Fine - useDelete
export {useGet, usePut, usePost, useDelete};