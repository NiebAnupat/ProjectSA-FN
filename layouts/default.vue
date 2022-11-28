<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      expand-on-hover
      v-if="isAuth"
      color="white"
    >
      <v-list-item class="my-2 black--text">
        <v-list-item-avatar class="ml-n2"
          ><v-img
            :src="isAdmin ? admin.avatar : user.avatar"
          ></v-img></v-list-item-avatar
        ><v-list-item-content
          ><v-list-item-title>{{
            isAdmin ? admin.name : user.name
          }}</v-list-item-title></v-list-item-content
        ></v-list-item
      >

      <v-divider color="black" class="ma-4"></v-divider>

      <v-list>
        <v-list-item
          v-for="item in isAdmin ? adminItems : userItems"
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
export default {
  name: 'DefaultLayout',

  async asyncData({ store }) {
    const isAuth = await store.getters['Auth/isAuth']
    const isAdmin = await store.getters['Auth/isAdmin']

    return {
      isAuth,
      isAdmin,
    }
  },

  computed: {
    isAuth() {
      return this.$store.getters['Auth/isAuth']
    },

    isAdmin() {
      return this.$store.getters['Auth/isAdmin']
    },
  },

  data() {
    return {
      drawer: true,
      user: {
        name: 'นาย ธนพล สุขสวัสดิ์',
        avatar: 'https://ui-avatars.com/api/background=random',
      },
      admin: {
        name: 'นางสาว ธนพล สุขสวัสดิ์',
        avatar: 'https://ui-avatars.com/api/background=random',
      },

      userItems: [
        {
          title: 'หน้าหลัก',
          icon: 'mdi-home',
          action: () => this.$router.push('/Employee/Checkin'),
        },
        {
          title: 'นัดหมาย',
          icon: 'mdi-calendar',
          action: () => this.$router.push('/Employee/Appointment'),
        },
      ],

      adminItems: [
        {
          title: 'หน้าหลัก',
          icon: 'mdi-home',
          action: () => this.$router.push('/HR/Dashbord'),
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
    logout() {
      this.$store.dispatch('Auth/setAuthFalse')
      this.$router.push('/')
    },
  },
}
</script>
