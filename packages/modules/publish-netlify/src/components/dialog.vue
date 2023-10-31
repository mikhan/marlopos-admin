<template>
  <v-dialog v-model="props.show" persistent>
    <v-card>
      <v-card-title>{{ props.title }}</v-card-title>
      <v-card-text v-html="props.message"></v-card-text>
      <v-card-actions>
        <v-button outlined v-if="props.close" v-on:click="this.$emit('close')">{{ props.close }}</v-button>
        <v-button v-if="props.action" v-on:click="this.$emit('action')">{{ props.action }}</v-button>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: String,
  message: String,
  close: {
    type: String,
    default: undefined,
  },
  action: {
    type: String,
    default: undefined
  }
});
</script>
