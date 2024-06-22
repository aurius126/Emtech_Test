<template>
  <div class="input-group">
    <div class="input-group-prepend" v-if="icon">
      <font-awesome-icon :icon="['fas', icon]" style="color: grey; padding-right: 10px;"/>
    </div>
    <input :name="name" :type="type" :placeholder="placeholder" :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)" class="form-control"
      :class="{ 'is-invalid': invalid }" />
  </div>
</template>

<script>
export default {
  name: 'uiIconInput',
  props: {
    icon: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    modelValue: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    invalid: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.input-group-prepend {
  display: flex;
  align-items: center;
}
</style>
