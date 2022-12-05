<template>
  <div class="pt-12 d-flex justify-center align-center">
    <v-card class="pa-6" elevation="6" width="450" height="650">
      <v-card-title class="d-flex justify-center">
        <!-- <v-icon>mdi-account-lock</v-icon> -->
        พนักงานทั่วไป
      </v-card-title>

      <!-- Picture -->
      <div class="mt-5 d-flex justify-center">
        <img height="220" src="~/assets/Logo.jpg" />
      </div>

      <div>
        <v-card-text class="mt-4">
          <v-form>
            <v-container>
              <v-row>
                <v-col col="12">
                  <!-- Input Username -->
                  <v-text-field
                    prepend-inner-icon="mdi-email"
                    v-model="id"
                    label="อีเมล"
                    :rules="idRules"
                    required
                    @keydown.enter="login"
                    v-on:click="login"
                  ></v-text-field>

                  <!-- Input Password -->
                  <v-text-field
                    prepend-inner-icon="mdi-lock"
                    v-model="password"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passRules"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="รหัสผ่าน"
                    @click:append="show1 = !show1"
                    @keydown.enter="login"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </div>

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
      this.$store.dispatch('Auth/setAuthFalse')
    }, 250)
  },

  data() {
    return {
      id: '',
      password: '',
      show1: false,
      idRules: [
        (v) => !!v || 'กรุณากรอกรหัสพนักงาน',
        (V) => V.length === 7 || 'รหัสพนักงานต้องมี 7 ตัวอักษร',
        (v) => !isNaN(v) || 'กรุณากรอกตัวเลขเท่านั้น',
      ],
      passRules: [
        (v) => !!v || 'กรุณากรอกรหัสผ่าน',
        (v) => v.length >= 8 || 'รหัสผ่านต้องมี 8 ตัวอักษรขึ้นไป',
        (v) => !isNaN(v) || 'กรุณากรอกตัวเลขเท่านั้น',
      ],
    }
  },
  methods: {
    async login() {
      if (this.id != '' && this.password != '') {
        await this.$store.dispatch('Auth/setAuthTrue')
        await this.$store.dispatch('Auth/setAdminFalse')
        this.$router.push('/Employee/Checkin')
      } else {
        this.$store.dispatch('Auth/setAuthFalse')
      }
    },
  },
}
</script>

<style lang="scss"></style>
