import CarsService from "../Services/CarsService.js";
import store from "../store.js";

//Private
function _draw() {
  let cars = store.State.cars;
  let carsElem = document.getElementById("cars");
  let template = "";

  cars.forEach(car => {
    template += car.Template;
  });

  carsElem.innerHTML = template;
}

//Public
export default class CarsController {
  constructor() {
    store.subscribe("cars", _draw);
    this.getAllCars();
  }

  getAllCars() {
    CarsService.getCars();
  }

  addCar(event) {
    event.preventDefault();

    // NOTE formData is an alias for our submitted form from our html
    let formData = event.target;
    // NOTE newcar is an object with all the inputted values from our form
    let newCar = {
      make: formData.make.value,
      model: formData.model.value,
      year: formData.year.value,
      price: formData.price.value,
      imgUrl: formData.imgUrl.value,
      description: formData.description.value
    };
    console.log(newCar);
    CarsService.addCar(newCar);
    formData.reset();
    // @ts-ignore
    $("#car-form").modal("toggle");
  }

  bid(id, price) {
    debugger;
    CarsService.editCar(id, { price });
  }

  removeImg(id) {
    debugger;
    CarsService.editCar(id, { imgUrl: "//placehold.it/200x200" });
  }

  delete(id) {
    CarsService.deleteCar(id);
  }
}
