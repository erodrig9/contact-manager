<template>
  <v-dialog v-model="showConfirmDialog" max-width="350px" @keydown.esc="close" @click:outside="cancel">
    <v-card>
      <v-card-text v-show="!!message" class="pa-6 black--text font-weight-medium">{{ message }}</v-card-text>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click.native="cancel" text>Cancel</v-btn>
          <v-btn color="primary" @click.native="agree" text>{{ action }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      showConfirmDialog: false,
      resolve: null,
      reject: null,
      message: null,
      action: null
    }
  },
  methods: {
    open(message, action) {
        this.showConfirmDialog = true
        this.message = message
        this.action = action
        return new Promise((resolve, reject) => {
            this.resolve = resolve
            this.reject = reject
        })
    },
    agree() {
        this.resolve(true)
        this.showConfirmDialog = false
    },
    cancel() {
        this.resolve(false)
        this.showConfirmDialog = false
    }
  }
}
</script>