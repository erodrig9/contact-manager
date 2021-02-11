<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Email
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(contact, index) in contacts">
            <v-hover v-slot="{ hover }">
              <tr>
                <td>{{ fullName(contact.firstName, contact.lastName) }}</td>
                <td>{{ contact.email }}</td>
                <td>
                  <div :class="['action-column', {'visibility-hidden': !hover}]">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon color="primary" class="mx-2" @click="onEditClick(contact, index)" v-bind="attrs" v-on="on">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>edit</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon color="primary" class="mx-2" @click="onDeleteClick(index)" v-bind="attrs" v-on="on">
                          <v-icon>mdi-delete-forever</v-icon>
                        </v-btn>
                      </template>
                      <span>delete</span>
                    </v-tooltip>
                  </div>
                </td>
              </tr>
            </v-hover>
          </template>
        </tbody>
      </template>
    </v-simple-table>

    <ConfirmAction ref="confirmAction"></ConfirmAction>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ConfirmAction from '@/components/ConfirmAction'

export default {
  components: {
    ConfirmAction
  },
  methods: {
    ...mapActions(['openContactForm', 'deleteContact']),
    fullName(firstName, lastName) {
      return `${firstName} ${lastName}`
    },
    onEditClick(contact, index) {
      this.openContactForm({contact, index})
    },
    async onDeleteClick(index) {
      const confirmDelete = await this.$refs.confirmAction.open("Delete this contact?", "Delete")
      if (confirmDelete) {
        this.deleteContact(index)
      }
    }
  },
  computed: {
    ...mapState(['contacts'])
  },
}
</script>

<style scoped>
.action-column {
  width: 110px;
  padding: 0 !important;
  position: absolute;
  right: 12px;
  margin-top: -18px;
}

.visibility-hidden {
  visibility: hidden;
}
</style>