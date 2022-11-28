<template>
  <div>
    <div>
      <h1 class="mt-2">นัดหมายการทำงาน</h1>
      <v-divider class="mt-3"></v-divider>
    </div>

    <!-- Add/Check appointment -->
    <div>
      <v-row class="pt-10">
        <v-col cols="6">
          <v-card nuxt @click=";(checkTable = true), (addTable = false)">
            <v-card-title class="d-flex justify-center">
              รับนัดหมาย
            </v-card-title>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card nuxt @click=";(addTable = true), (checkTable = false)">
            <v-card-title class="d-flex justify-center">
              เพิ่มนัดหมาย
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Search -->
    <div class="mt-10">
      <v-row class="pb-2">
        <v-spacer></v-spacer>
        <v-col cols="4"
          ><v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            label="ค้นหา"
            single-line
            hide-details
            class="mb-4"
          ></v-text-field
        ></v-col>
      </v-row>
    </div>

    <!-- Table -->
    <div v-if="checkTable">
      <CheckAp :s="search" />
    </div>
    <div v-else>
      <AddAp :s="search" />
    </div>
  </div>
</template>

<script>
import CheckAp from '~/components/Employee/CheckAp.vue'
import AddAp from '~/components/Employee/AddAp.vue'
export default {
  name: 'Appointment',
  async asyncData({ store }) {
    store.dispatch('Auth/setAuthTrue')
  },

  components: { CheckAp, AddAp },

  data() {
    return {
      checkTable: false,
      addTable: false,
      search: '',
    }
  },
}
</script>
<style lang="scss"></style>
