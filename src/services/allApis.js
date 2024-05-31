import { base } from "./base";
import { commonRequests } from "./commonStructure";

//add card (title,about,itinerary,date,image)
export const addDataApi=async(bodyData)=>{
    return await commonRequests('POST',`${base}/cards`,bodyData)
}

//access card (title,about,itinerary,date,image)
export const accessDataApi=async()=>{
    return await commonRequests('GET',`${base}/cards`,{})
}

//delete card
export const deleteDataApi=async(id)=>{
    return await commonRequests('DELETE',`${base}/cards/${id}`,{})
}

//edit card
export const editDataApi=async(id,bodyData)=>{
    return await commonRequests('PUT',`${base}/cards/${id}`,bodyData)
}


