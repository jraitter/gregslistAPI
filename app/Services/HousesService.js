import store from "../store.js";
import House from "../Models/house.js";

// @ts-ignore
let _api = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/houses",
  timeout: 3000
});

class HousesService {
  constructor() {
    console.log("HousesService constructor loaded");
  }
  getAllHouses() {
    console.log("getting all houses");
    _api
      .get("")
      .then(res => {
        let apiHouses = res.data.data.map(h => new House(h));
        store.commit("houses", apiHouses);
      })
      .catch(error => {
        console.error(error);
      });
  }
}

const houseService = new HousesService();
export default houseService;