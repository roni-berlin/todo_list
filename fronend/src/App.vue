<template>
  <v-app>
    <v-main>
      <v-row justify="center">
        <router-link v-show="!user" to="/">
          <v-btn class="ma-5">
            <v-icon>fa fa-sign-in</v-icon>
          </v-btn>
        </router-link>

        <router-link v-show="!user" to="/register">
          <v-btn class="ma-5">
            <v-icon>fa fa-pencil</v-icon>
          </v-btn>
        </router-link>
      </v-row>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState(["user"]),
  },
};
</script>
