<template>
  <div>
    <b-progress :max="max" class="mb-3">
      <b-progress-bar variant="primary" :value="values[0]"></b-progress-bar>
      <b-progress-bar variant="success" :value="values[1]"></b-progress-bar>
      <b-progress-bar variant="info" :value="values[2]"></b-progress-bar>
    </b-progress>
    <div>
      <font-awesome-icon :icon="['fas', 'circle']" style="color: blue;"/>
      <font-awesome-icon :icon="['fas', 'circle']" style="color: green;"/>
      <font-awesome-icon :icon="['fas', 'circle']" style="color: red;"/>
    </div>
  </div>
</template>

<script>
import { BProgress, BProgressBar } from 'bootstrap-vue-3';

export default {
  components: {
    BProgress,
    BProgressBar,
  },
  data() {
    return {
      values: [50, 30, 20],
      max: 100
    };
  }
};
</script>