<template>
  <div class="pt-12 d-flex justify-center align-center">
    <v-card class="pa-6" elevation="6" width="450" height="650">
      <v-card-title class="d-flex justify-center">
        <!-- <v-icon>mdi-account-lock</v-icon> -->
        ฝ่ายบุคคล
      </v-card-title>

      <!-- Picture -->
      <div class="mt-5 d-flex justify-center">
        <img height="220" src="~/assets/Logo.jpg" />
      </div>

      <v-card-text class="mt-4">
        <v-form>
          <v-container>
            <v-row>
              <v-col col="12">
                <!-- Input Username -->
                <v-text-field
                  prepend-inner-icon="mdi-email"
                  v-model="email"
                  label="อีเมล"
                  :rules="emailRules"
                  required
                  @keydown.enter="login"
                  v-on:click="login"
                ></v-text-field>

                <!-- Input Password -->
                <v-text-field
                  prepend-inner-icon="mdi-lock"
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="รหัสผ่าน"
                  hint="At least 8 characters"
                  @click:append="show1 = !show1"
                  @keydown.enter="login"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <!-- Button -->
      <div class="mt-4 px-6">
        <v-btn
          class="white--text rounded-lg"
          block
          color="primary darken-2"
          v-on:click="login"
          >เข้าสู่ระบบ</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Index',
  layout: 'default',

  mounted() {
    setTimeout(() => {
      this.$store.dispatch('Auth/setAdminFalse')
    }, 250)
  },

  data() {
    return {
      email: '',
      password: '',
      show1: false,
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => `The email and password you entered don't match`,
      },
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid',
      ],
    }
  },
  methods: {
    async login() {
      if (this.email != '' && this.password != '') {
        await this.$store.dispatch('Auth/setAuthTrue')
        await this.$store.dispatch('Auth/setAdminTrue')
        this.$router.push('/HR/Dashbord')
      } else {
        this.$store.dispatch('Auth/setAdminFalse')
      }
    },
  },
}
</script>

<style lang="scss"></style>
