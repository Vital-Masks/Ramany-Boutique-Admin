import api from "./api";

class ProductService {

    static getAllProducts(){
        let url = 'products'
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

    static saveProducts(cloth){
        console.log("clotyh",cloth)
        let url = 'category/mainCategory'
    }


}

export default ProductService; 
