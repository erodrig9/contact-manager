<template>
  <v-app>
    <v-app-bar app color="white" light elevate-on-scroll>
      <v-toolbar-title class="mx-lg-4">AmeriSave Contact Manager</v-toolbar-title>
    </v-app-bar>

    <v-main class="mx-2 mx-lg-16">
      <v-btn class="mt-8" color="primary" @click="onCreateContactClick">
        <v-icon dark left>mdi-plus</v-icon>
        Create Contact
      </v-btn>
      <ContactList class="mt-12"></ContactList>
      <ContactForm></ContactForm>
    </v-main>
  </v-app>
</template>

<script>
import ContactList from './components/ContactList'
import ContactForm from './components/ContactForm'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    ContactList,
    ContactForm
  },
  methods: {
    ...mapActions(['openContactForm']),
    onCreateContactClick() {
      this.openContactForm({})
    }
  }
}
</script>
