<template>

  <ui-card class="ui-card">
    <h5>Formulario de Períodos</h5>
    <b-form @submit.prevent="handleSubmit">
      <ui-icon-input name="period" icon="calendar-alt" placeholder="Período" v-model="formData.period"
        :invalid="isFieldInvalid('period')" />
      <span v-if="validationMessages.period" class="text-danger">{{ validationMessages.period }}</span>

      <b-form-group>
        <b-form-checkbox v-model="formData.active" name="active">
          Activo
        </b-form-checkbox>
      </b-form-group>

      <b-button type="submit" variant="primary">
        <font-awesome-icon :icon="['fas', 'save']" style="color: white;" /> Guardar
      </b-button>
    </b-form>
  </ui-card>

</template>

<script>
import { ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import uiIconInput from '@/components/ui/inputs/IconInput.vue';
import uiCard from "@/components/ui/cards/uiCard.vue";

export default {
  name: 'FormPeriods',
  components: {
    uiIconInput,
    uiCard
  },
  setup() {
    const formData = ref({
      period: '',
      active: false,
    });

    const rules = {
      period: { required },
      active: {},
    };

    const v$ = useVuelidate(rules, formData);
    const validationMessages = reactive({});

    const errorMessages = {
      required: 'Campo requerido',
    };

    const isFieldInvalid = (field) => {
      return v$.value[field].$error;
    };

    const setValidationMessages = () => {
      Object.keys(rules).forEach(field => {
        if (v$.value[field].$errors.length) {
          const firstError = v$.value[field].$errors[0].$params;
          const ruleName = Object.keys(firstError)[0];
          validationMessages[field] = errorMessages[ruleName] || 'Campo inválido';
        } else {
          validationMessages[field] = '';
        }
      });
    };

    const resetForm = () => {
      formData.value = {
        period: '',
        active: false,
      };
      v$.value.$reset();
      Object.keys(validationMessages).forEach(field => validationMessages[field] = '');
    };

    return {
      formData,
      v$,
      validationMessages,
      isFieldInvalid,
      setValidationMessages,
      resetForm,
    };
  },
  methods: {
    async handleSubmit() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        this.setValidationMessages();
        console.error('Validation failed:', this.v$.$errors);
        return;
      }

      try {
        const response = await this.$axios.post('/_/periods', {
          period: this.formData.period,
          active: this.formData.active,
        });
        alert('Período guardado exitosamente');
        this.resetForm();
      } catch (error) {
        console.error('Error saving period:', error);
      }
    },
  },
};
</script>

<style scoped>
.ui-card {
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ui-card>* {
  flex: 1;
}

@media (max-width: 767px) {
  .ui-card {
    margin-bottom: 20px;
  }
}
</style>