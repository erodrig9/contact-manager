<template>
  <v-dialog v-model="showContactForm" max-width="600px" @keydown.esc="onCloseClick" @click:outside="onCloseClick">
    <v-card>
      <v-card-title>
        <span class="headline">
          <template v-if="isEditForm">Edit Contact</template>
          <template v-else>Create New Contact</template>
        </span>
      </v-card-title>
      <v-card-text class="mt-2">
        <v-form ref="form" v-model="isValid">
          <v-text-field ref="firstName" label="First Name" v-model="contact.firstName"></v-text-field>
          <v-text-field ref="lastName" label="Last Name" v-model="contact.lastName"></v-text-field>
          <v-text-field ref="email" label="Email" v-model="contact.email" :rules="emailRule" validate-on-blur></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="onCloseClick">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="onSaveClick" :disabled="!isValid || isFormEmpty">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      isValid: false,
      emailRule: [ 
        v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  computed: {
    ...mapState(['showContactForm', 'contact', 'isEditForm', 'contactIndex']),
    isFormEmpty() {
      for (var key in this.contact) {
        if (key !== 'id' && this.contact[key] !== null && this.contact[key] != '') {
            return false
        }
      }
      return true
    }
  },
  methods: {
    ...mapActions(['closeContactForm', 'createContact', 'updateContact']),
    onCloseClick() {
      this.closeContactForm()
    },
    onSaveClick() {
      if (this.$refs.form.validate()) {
        if(this.isEditForm) {
          this.updateContact()
        } else {
          this.createContact()
        }

        this.closeContactForm()
      }
    }
  },
  watch: {
    showContactForm(value) {
      if(value) {
        setTimeout(() => {
            this.$refs['firstName'].focus()
        }, 500)
      }
    }
  }
}
</script>
