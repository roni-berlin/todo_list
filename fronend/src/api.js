const axios = require("axios");
const url = "http://localhost:3000";

module.exports = {
  async getByUserData(user) {
    const res = await axios.get(`${url}/login`, { params: user });
    return res.data[0];
  },
  getAll() {
    axios.get(`${url}/getall`).then((res) => res);
  },
  addNewUser(user) {
    axios.post(`${url}/register`, { user });
  },
  async getListsByEmail(email) {
    const res = await axios.get(`${url}/lists/${email}`);
    return res.data;
  },
  addNewList(list) {
    axios.post(`${url}/lists`, { list });
  },
  done(id) {
    axios.patch(`${url}/done/${id}`);
  },
  undone(id) {
    axios.patch(`${url}/undone/${id}`);
  },
  deleteListById(id) {
    axios.delete(`${url}/lists/${id}`);
  },
};
