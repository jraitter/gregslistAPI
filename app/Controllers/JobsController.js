import JobsService from "../Services/JobsService.js"
import store from "../store.js";

//Private
function _drawJobs() {
  let jobs = store.State.jobs;
  let dataElem = document.getElementById("current-data");
  let template = "";

  jobs.forEach(job => {
    template += job.Template;
  });

  dataElem.innerHTML = template;
}


export default class JobsController {
  constructor() {
    console.log("JobsController constructor loaded");
    store.subscribe("jobs", _drawJobs);
  }
  getAllJobs() {
    JobsService.getAllJobs();
  }
  addJob(event) {
    event.preventDefault();
    let formData = event.target;
    let newJob = {
      company: formData.company.value,
      jobTitle: formData.jobTitle.value,
      rate: formData.rate.value,
      hours: formData.hours.value,
      description: formData.description.value
    }
    JobsService.addJob(newJob);

    formData.reset();
    // @ts-ignore
    $("#job-form").modal("toggle");
  }
  bid(id, rate) {
    JobsService.editJob(id, { rate });
  }
  delete(id) {
    JobsService.delete(id);
  }

}