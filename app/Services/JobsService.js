import Job from "../Models/Job.js";
import store from "../store.js";

// @ts-ignore
let _api = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/jobs",
  timeout: 3000
});

class JobsService {
  constructor() {
    console.log("JobsService constructor loaded");
  }
  getAllJobs() {
    console.log("JobsService enter getAllJobs");
    _api
      .get("")
      .then(result => {
        let apiJobs = result.data.data.map(j => new Job(j));
        store.commit("jobs", apiJobs);
      })
      .catch(error => {
        console.error(error);
      });
  }
  addJob(newJob) {
    _api
      .post("", newJob)
      .then(result => {
        let newApiJob = new Job(result.data.data);
        let jobs = [...store.State.jobs, newApiJob];
        store.commit("jobs", jobs);
      })
      .catch(error => {
        console.error(error);
      });
  }
  editJob(id, update) {
    _api
      .put(id, update)
      .then(result => {
        let job = store.State.jobs.find(j => j._id == id)
        for (let prop in update) {
          job[prop] = update[prop];
        }
        store.commit("jobs", store.State.jobs);
      })
      .catch(error => {
        console.error(error);
      });
  }
  delete(id) {
    _api
      .delete(id)
      .then(() => {
        let filteredJobs = store.State.jobs.filter(j => j._id != id)
        store.commit("jobs", filteredJobs);
      })
      .catch(error => {
        console.error(error);
      });
  }
}

const jobsService = new JobsService();
export default jobsService;