<template>
  <v-app>
    <v-navigation-drawer
      app
      expand-on-hover
      v-if="!!$store.getters['Auth/user'].EM_ID"
      color="white"
    >
      <v-list-item class="my-2 black--text">
        <v-list-item-avatar class="ml-n2"
          ><v-img
            :src="user.avatar"
          ></v-img></v-list-item-avatar
        ><v-list-item-content
          ><v-list-item-title>{{ $store.getters['Auth/user'].EM_FNAME }} &nbsp {{ $store.getters['Auth/user'].EM_LNAME }}</v-list-item-title></v-list-item-content
        ></v-list-item
      >

      <v-divider color="black" class="ma-4"></v-divider>

      <v-list>
        <v-list-item
          v-for="item in $store.getters['Auth/isAdmin'] ? adminItems : userItems"
          :key="item.title"
          link
          v-on:click="item.action"
          class="black--text"
        >
          <v-list-item-icon>
            <v-icon color="black">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-list>
          <v-list-item link v-on:click="logout" class="black--text">
            <v-list-item-icon>
              <v-icon color="black">mdi-logout</v-icon>
              <v-list-item-content>
                <v-list-item-title>ออกจากระบบ</v-list-item-title>
              </v-list-item-content>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-container class="ma-auto" style="height: 95%">
      <nuxt class="ml-10 pb-5" />
    </v-container>
  </v-app>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: 'DefaultLayout',


  data() {
    return {
      user: {
        name: 'นางสาว สุชานาถ คุ้มบุ่งคล้า',
        avatar: 'https://ui-avatars.com/api/background=random',
      },

      userItems: [
        {
          title: 'หน้าหลัก',
          icon: 'mdi-home',
          action: () => this.$router.push('/Employee/Checkin'),
        },
        {
          title: 'เอกสารลางาน',
          icon: 'mdi-calendar',
          action: () => this.$router.push('/Employee/LeaveEmp'),
        },
      ],

      adminItems: [
        {
          title: 'หน้าหลัก',
          icon: 'mdi-home',
          action: () => this.$router.push('/HR/Dashboard'),
        },
        {
          title: 'ข้อมูลพนักงาน',
          icon: 'mdi-account',
          action: () => this.$router.push('/HR/Info'),
        },
        {
          title: 'เอกสารลางาน',
          icon: 'mdi-calendar-remove',
          action: () => this.$router.push('/HR/LeaveWork'),
        },
      ],
    }
  },

  methods: {
    async logout(n) {
      this.$store.commit('Auth/setUser', { EM_ID: '' })
      this.$store.commit('Auth/setAdmin', false)
      await Cookies.remove('token')
      await this.$router.go(n);
    },
  },
}
</script>
