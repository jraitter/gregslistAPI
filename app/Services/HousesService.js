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
  addHouse(newHouse) {
    _api
      .post("", newHouse)
      .then(result => {
        let newApiHouse = new House(result.data.data);
        let houses = [...store.State.houses, newApiHouse];
        store.commit("houses", houses);
      })
      .catch(error => {
        console.error(error);
      });
  }

  editHouse(id, update) {
    // in this case update = { price: price }
    _api
      .put(id, update)
      .then(result => {
        let house = store.State.houses.find(h => h._id == id);
        // loop thru properties of this house or keep all and the updated property.
        // house = { ...house, ...update };
        for (let prop in update) {
          house[prop] = update[prop];
        }
        store.commit("houses", store.State.houses);
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteHouse(id) {
    _api
      .delete(id)
      .then(() => {
        let filteredHouses = store.State.houses.filter(h => h._id != id);
        store.commit("houses", filteredHouses)
      })
      .catch(error => {
        console.error(error);
      });
  }
}

const houseService = new HousesService();
export default houseService;