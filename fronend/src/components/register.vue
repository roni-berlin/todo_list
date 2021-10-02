<template>
  <div>
    <v-card :loading="loading" class="mx-auto my-12" max-width="374">
      <form>
        <v-container fluid>
          <v-row>
            <v-col>
              <v-text-field
                v-model="user.username"
                :rules="usernameRules"
                label="Username"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.password"
                :rules="passwordRules"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                label="Passowrd"
                hint="At least 8 characters"
                @click:append="show = !show"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn
            class="mr-4"
            type="submit"
            :disabled="!valid"
            @click="register()"
          >
            הירשם
          </v-btn>
        </v-container>
      </form>
    </v-card>
  </div>
</template>
<script>
import { addNewUser } from "../api";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      show: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is Required.",
        (v) => v.length >= 8 || "Min 8 characters",
      ],
      usernameRules: [(v) => !!v || "Username is required"],
    };
  },
  computed: {
    valid() {
      return (
        /.+@.+\..+/.test(this.user.email) &&
        this.user.password.length >= 8 &&
        this.user.username.length > 0
      );
    },
  },
  methods: {
    ...mapMutations(["setUser"]),
    async register() {
      await addNewUser(this.user);
      this.setUser(this.user);
      this.$router.push("/todo");
    },
  },
};
</script>
