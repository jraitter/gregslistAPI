export default class Job {
  constructor(data) {
    this._id = data._id;
    this.company = data.company;
    this.jobTitle = data.jobTitle;
    this.hours = data.hours;
    this.rate = data.rate;
    this.description = data.description;
  }

  get Template() {
    return `
              <div class="col-3">
              <div class="card">
              <div class="card-body">
                <h5 class="card-title">${this.company} - ${this.jobTitle}</h5>
                <p class="card-text">${this.hours} <b>$${this.rate}</b></p>
                <p class="card-text">${this.description}</p>
                <button class="btn btn-info" onclick="app.jobsController.bid('${this._id}', ${this.rate + 5})">BID $5</button>
                <button class="btn btn-danger" onclick="app.jobsController.delete('${this._id}')">DELETE</button>
              </div>
            </div>
              </div>
      `;
  }

}