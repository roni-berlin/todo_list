<template>
  <v-app class=" text-center mt-12">
    <h1>שלום {{ user.username }}</h1>
    <v-flex>
      <v-col>
        <v-text-field label="הכנס משימה" v-model="ms"></v-text-field>
        <v-btn
          @click="
            addNewList();
            ms = '';
          "
          color="primary"
          elevation="2"
          small
        >
          <v-icon>fa fa-plus</v-icon>
        </v-btn>
      </v-col>
    </v-flex>
    <v-container fluid ma-0 pa-0 fill-height>
      <v-row v-for="(msg, index) in toDoList" :key="index">
        <v-col v-bind:class="{ 'text-decoration-line-through': msg.done }">
          {{ msg.content }}
        </v-col>
        <v-col>
          <v-btn
            v-if="msg.done"
            color="blue"
            small
            @click="undone(msg.list_id)"
          >
            <v-icon color="white">fa fa-eye</v-icon>
          </v-btn>
          <v-btn v-else color="red" small @click="done(msg.list_id)">
            <v-icon color="white">fa fa-check</v-icon>
          </v-btn>
          <v-btn color="green" small @click="deleteListById(msg.list_id)">
            <v-icon color="white">fa fa-trash</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-flex>
      <v-col>
        <v-btn color="primary" @click="logOut()">
          <v-icon color="white">fa fa-sign-out</v-icon>
        </v-btn>
      </v-col>
    </v-flex>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import {
  getListsByEmail,
  addNewList,
  done,
  undone,
  deleteListById,
} from "../api";
export default {
  async mounted() {
    this.updateToDo();
    this.intervalFetchData();
  },
  data() {
    return {
      toDoList: [],
      ms: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["setUser"]),
    async updateToDo() {
      this.toDoList = await getListsByEmail(this.user?.email);
    },
    intervalFetchData() {
      setInterval(() => {
        this.updateToDo();
      }, 1000);
    },
    async addNewList() {
      addNewList({
        email: this.user.email,
        content: this.ms,
        done: false,
      });
    },
    async done(id) {
      done(id);
    },
    async undone(id) {
      undone(id);
    },
    async deleteListById(id) {
      deleteListById(id);
    },
    logOut() {
      this.setUser(null);
      this.$router.push("/");
    },
  },
};
</script>
