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
}