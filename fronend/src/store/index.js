import Vue from "vue";
import Vuex from "vuex";
import Swal from "sweetalert2";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    toDoList: [],
    user: null,
  },
  mutations: {
    addToDo(state, toDoToAdd) {
      let error = false;
      if (toDoToAdd.msg == "") {
        error = true;
        Swal.fire({
          icon: "error",
          title: "...אופס",
          text: "!לא הוכנס ערך",
        });
      }
      state.toDoList.forEach((m) => {
        if (m.msg === toDoToAdd.msg) {
          error = true;
          Swal.fire({
            icon: "error",
            title: "...אופס",
            text: "!המשימה כבר קיימת",
          });
        }
      });
      if (!error) {
        state.toDoList.push(toDoToAdd);
      }
    },
    markIsRead(state, msg) {
      state.toDoList.forEach((m) => {
        if (m.msg === msg) {
          m.read = true;
        }
      });
    },
    markIsNotRead(state, msg) {
      state.toDoList.forEach((m) => {
        if (m.msg === msg) {
          m.read = false;
        }
      });
    },
    deleteToDo(state, msg) {
      for (let toDoIndex = 0; toDoIndex < state.toDoList.length; toDoIndex++) {
        if (state.toDoList[toDoIndex].msg === msg) {
          state.toDoList.splice(toDoIndex, 1);
        }
      }
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {},
  modules: {},
});
