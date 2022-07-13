// import axios from "axios";
import api from "./api";

class CategoryService {

    // static getAllCategorys(){
    //     let url = 'jewellerys'
    //     return api.get(url)
    // }

    static getAllOccasionTypes(categoryType){
        let url = 'category'
        return api.get(url,{ params: { categoryType } })
    }

    static async getAllCategories(){
        let url = 'category/mainCategory'
        const response = await api.get(url)
        return response
    }

    static saveCategory(categoryObj){
        console.log("category/mainCategory",categoryObj)
        let url = 'category/mainCategory'
        return api.post(url,categoryObj)
    }

    static getCategoryById(categoryId){
        let url = 'category/mainCategory/'+categoryId
        return api.get(url)
    }

    static updateCategoryById(categoryId, categoryObj){
        let url = 'category/'+categoryId
        return api.put(url,categoryObj)
    }

    static deleteCategory(categoryId){
        let url = 'category/'+categoryId
        return api.delete(url)
    }


}

export default CategoryService; 
