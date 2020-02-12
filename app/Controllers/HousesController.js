import HousesService from "../Services/HousesService.js"
import store from "../store.js";

function _drawHouses() {
  let houses = store.State.houses;
  let dataElem = document.getElementById("current-data");
  let template = "";

  houses.forEach(house => {
    template += house.Template;
  });

  dataElem.innerHTML = template;
}
export default class HousesController {
  constructor() {
    console.log("HousesController constructor has loaded");
    store.subscribe("houses", _drawHouses);
  }
  getAllHouses() {
    HousesService.getAllHouses()
  }
  addHouse(event) {
    event.preventDefault();
    let formData = event.target;
    let newHouse = {
      bedrooms: formData.bedrooms.value,
      bathrooms: formData.bathrooms.value,
      imgUrl: formData.imgUrl.value,
      levels: formData.levels.value,
      year: formData.year.value,
      price: formData.price.value,
      description: formData.description.value
    }
    HousesService.addHouse(newHouse);
    formData.reset();
    // @ts-ignore
    $("#house-form").modal("toggle");
  }
  bid(id, price) {
    // could use {price}, this would assign the key to price and value to value of price
    HousesService.editHouse(id, { price: price });
  }

  delete(id) {
    HousesService.deleteHouse(id);
  }
}