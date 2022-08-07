import axios from "axios";

export default axios.create({
	baseURL: `http://localhost:3001/`,
	// baseURL:`https://dev-ramany-boutique-api.herokuapp.com/`
});
