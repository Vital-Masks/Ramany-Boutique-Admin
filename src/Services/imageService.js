// import axios from "axios";
import api from "./api";

class ImageService {
    static getAllImages(){
        let url = 'images'
        return api.get(url)
    }

    static updateImageById(imageId, imageObj){
        let url = 'images/'+imageId
        return api.put(url,imageObj)
    }

    static getImageById(){
        let url = 'images/63cb9bdbe52bc4c5035dfe4a'
        return api.get(url)
    }
}

export default ImageService;