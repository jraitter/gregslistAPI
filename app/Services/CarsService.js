import store from "../store.js";
import Car from "../Models/Car.js";

// @ts-ignore
let _api = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/cars",
  timeout: 3000
});

class CarsService {
  getCars() {
    _api
      .get("")
      .then(res => {
        let apiCars = res.data.data.map(c => new Car(c));
        store.commit("cars", apiCars);
      })
      .catch(error => {
        console.error(error);
      });
  }

  getCarById(id) {
    _api.get(id);
  }

  addCar(newCar) {
    _api
      .post("", newCar)
      .then(res => {
        let newApiCar = new Car(res.data.data);
        //NOTE Gets cars from the state and adds additional car into new array
        let cars = [...store.State.cars, newApiCar];
        store.commit("cars", cars);
      })
      .catch(error => {
        console.error(error);
      });
  }

  editCar(id, update) {
    _api
      .put(id, update)
      .then(res => {
        debugger;
        let car = store.State.cars.find(c => c._id == id);
        //NOTE both these methods apply the changes to the original object
        //car = { ...car, ...update };
        for (let prop in update) {
          car[prop] = update[prop];
        }
        store.commit("cars", store.State.cars);
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteCar(id) {
    _api
      .delete(id)
      .then(() => {
        let filteredCars = store.State.cars.filter(c => c._id != id);
        store.commit("cars", filteredCars);
      })
      .catch(error => {
        console.error(error);
      });
  }
}

const service = new CarsService();
export default service;

//GETALL
//site/api/COLLECTIONNAME

//GETONE
//site/api/COLLECTIONNAME/ID

//CREATE
//site/api/COLLECTIONNAME

//EDIT
//site/api/COLLECTIONNAME/ID

//DELETE
//site/api/COLLECTIONNAME/ID
