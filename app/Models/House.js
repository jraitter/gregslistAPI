export default class House {
  constructor(data) {
    this._id = data._id;
    this.bedrooms = data.bedrooms;
    this.bathrooms = data.bathrooms;
    this.imgUrl = data.imgUrl;
    this.levels = data.levels;
    this.year = data.year;
    this.price = data.price;
    this.description = data.description;

  }
  get Template() {
    return `
              <div class="col-3">
              <div class="card">
              <img class="card-img-top" src="${this.imgUrl}" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">${this.bedrooms} - ${this.bathrooms} - ${this.year} - ${this.levels} - ${this.price} - ${this.description}</h5>
                <p class="card-text">${this.description} <b>$${this.price}</b></p>
                <button class="btn btn-info" onclick="app.carsController.bid('${this._id}', ${this.price + 500})">BID $500</button>
                <button class="btn btn-danger" onclick="app.carsController.delete('${this._id}')">DELETE</button>
              </div>
            </div>
              </div>
      `;
  }
}
