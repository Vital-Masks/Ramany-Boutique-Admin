// import axios from "axios";
import api from "./api";

class ClothService {

    static getAllCloths(){
        let url = 'cloths'
        return api.get(url)
    }

    static getAllOccasionTypes(categoryType){
        let url = 'category'
        return api.get(url,{ params: { categoryType } })
    }

    static async getAllCategories(){
        let url = 'category/mainCategory'
        const response = await api.get(url)
        return response
    }

    static saveCloths(cloth){
        console.log("clotyh",cloth)
        let url = 'cloths'
        return api.post(url,cloth)
    }

    static getClothById(id){
        let url = 'cloths/'+id
        return api.get(url)
    }

    static updateClothById(clothId, clothObj){
        let url = 'cloths/'+clothId
        return api.put(url,clothObj)
    }

    static deleteCloth(clothId){
        let url = 'cloths/'+clothId
        return api.delete(url)
    }


}

export default ClothService; 
