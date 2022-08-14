// import axios from "axios";
import api from "./api";

class OrdersService {

    static getAllOrders(){
        let url = 'orders'
        return api.get(url)
    }

     static deleteOrder(orderId){
        let url = 'orders/'+orderId
        return api.delete(url)
    }

     static getOrderById(orderId){
        let url = 'orders/'+orderId
        return api.get(url)
    }

    // static getAllOccasionTypes(categoryType){
    //     let url = 'category'
    //     return api.get(url,{ params: { categoryType } })
    // }

    // static async getAllCategories(){
    //     let url = 'category/mainCategory'
    //     const response = await api.get(url)
    //     return response
    // }

    // static saveJewellerys(jewellery){
    //     console.log("jewellery",jewellery)
    //     let url = 'jewellerys'
    //     return api.post(url,jewellery)
    // }

    // static getJewelleryById(id){
    //     let url = 'jewellerys/'+id
    //     return api.get(url)
    // }

    // static updateJewelleryById(jewelleryId, jewelleryObj){
    //     let url = 'jewellerys/'+jewelleryId
    //     return api.put(url,jewelleryObj)
    // }

   


}

export default OrdersService; 
