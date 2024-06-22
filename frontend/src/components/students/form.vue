<template>
  <uiCard class="ui-card">
    <b-form @submit.prevent="handleSubmit">
      <h5>{{ editing ? 'Editar alumno' : 'Agregar alumno' }}</h5>
      <div class="row">
        <div class="col-md-6 mb-3">
          <ui-icon-input name="first_name" icon="user" placeholder="Primer Nombre" v-model="formData.first_name"
            :invalid="isFieldInvalid('first_name')" />
          <span v-if="validationMessages.first_name" class="text-danger">{{ validationMessages.first_name }}</span>
        </div>
        <div class="col-md-6 mb-3">
          <ui-icon-input name="second_name" icon="user" placeholder="Segundo Nombre" v-model="formData.second_name" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <ui-icon-input name="surname" icon="user-tag" placeholder="Apellido Paterno" v-model="formData.surname"
            :invalid="isFieldInvalid('surname')" />
          <span v-if="validationMessages.surname" class="text-danger">{{ validationMessages.surname }}</span>
        </div>
        <div class="col-md-6 mb-3">
          <ui-icon-input name="lastname" icon="user-tag" placeholder="Apellido Materno" v-model="formData.lastname" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <ui-icon-input name="email" type="email" icon="envelope" placeholder="Correo Electrónico"
            v-model="formData.email" :invalid="isFieldInvalid('email')" />
          <span v-if="validationMessages.email" class="text-danger">{{ validationMessages.email }}</span>
        </div>
        <div class="col-md-6 mb-3">
          <ui-icon-input name="phone" type="tel" icon="phone" placeholder="Teléfono" v-model="formData.phone"
            :invalid="isFieldInvalid('phone')" />
          <span v-if="validationMessages.phone" class="text-danger">{{ validationMessages.phone }}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 mb-3">
          <b-form-group>
            <b-form-select v-model="formData.percent" :options="percentOptions" :state="!isFieldInvalid('percent')">
              <template #first>
                <b-form-select-option :value="null" disabled>Seleccione el porcentaje de estudio</b-form-select-option>
              </template>
            </b-form-select>
          </b-form-group>
          <span v-if="validationMessages.percent" class="text-danger">{{ validationMessages.percent }}</span>
        </div>
        <div class="col-md-4 mb-3">
          <b-form-group>
            <b-form-select v-model="formData.course" :options="courses" :state="!isFieldInvalid('course')">
              <template #first>
                <b-form-select-option :value="null" disabled>Seleccione el curso</b-form-select-option>
              </template>
            </b-form-select>
          </b-form-group>
          <span v-if="validationMessages.course" class="text-danger">{{ validationMessages.course }}</span>
        </div>
        <div class="col-md-4 mb-3">
          <b-form-group>
            <b-form-select v-model="formData.period" :options="periods" :state="!isFieldInvalid('period')">
              <template #first>
                <b-form-select-option :value="null" disabled>Seleccione el período</b-form-select-option>
              </template>
            </b-form-select>
          </b-form-group>
          <span v-if="validationMessages.period" class="text-danger">{{ validationMessages.period }}</span>
        </div>
      </div>
      <b-form-group>
        <b-form-checkbox v-model="formData.active" name="active">
          <i class="check"></i> Activo
        </b-form-checkbox>
      </b-form-group>
      <div class="row">
        <div class="col-md-12">
          <b-button type="submit" variant="primary">
            <font-awesome-icon :icon="['fas', 'save']" style="color: white;" /> {{ editing ? 'Actualizar' : 'Guardar' }}
          </b-button>
        </div>
      </div>
    </b-form>
  </uiCard>
</template>

<script>
import { ref, reactive, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email, numeric, minLength, maxLength } from '@vuelidate/validators';
import uiIconInput from '@/components/ui/inputs/IconInput.vue';
import uiCard from "@/components/ui/cards/uiCard.vue";

export default {
  name: 'FormStudents',
  components: {
    uiIconInput,
    uiCard
  },
  props: {
    initialData: {
      type: Object,
      default: null
    },
    editing: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const formData = ref({
      first_name: '',
      second_name: '',
      surname: '',
      lastname: '',
      email: '',
      phone: '',
      active: false,
      percent: null,
      course: null,
      period: null,
    });

    const rules = {
      first_name: { required },
      second_name: {},
      surname: { required },
      lastname: {},
      email: {
        required,
        email,
      },
      phone: {
        required,
        numeric,
        minLength: minLength(10),
        maxLength: maxLength(10),
      },
      percent: { required },
      course: { required },
      period: { required },
    };

    const v$ = useVuelidate(rules, formData);
    const validationMessages = reactive({});

    const errorMessages = {
      required: 'Campo requerido',
      email: 'Ingrese un correo electrónico válido',
      numeric: 'El teléfono debe contener solo números',
      minLength: 'El teléfono debe tener 10 caracteres',
      maxLength: 'El teléfono debe tener 10 caracteres',
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
        first_name: '',
        second_name: '',
        surname: '',
        lastname: '',
        email: '',
        phone: '',
        active: false,
        percent: null,
        course: null,
        period: null,
      };
      v$.value.$reset();
      Object.keys(validationMessages).forEach(field => validationMessages[field] = '');
    };

    watch(() => props.initialData, (newVal) => {
      if (newVal) {
        Object.assign(formData.value, newVal);
      } else {
        resetForm();
      }
    });

    return {
      formData,
      v$,
      validationMessages,
      isFieldInvalid,
      setValidationMessages,
      resetForm,
    };
  }, 
  data() {
    return {
      percentOptions: [0, 25, 50, 75, 100].map(value => ({ value, text: `${value}%` })),
      courses: [],
      periods: [],
    };
  },
  created() {
    this.fetchCourses();
    this.fetchPeriods();
  },
  methods: {
    async fetchCourses() {
      try {
        const response = await this.$axios.get('/_/courses');
        this.courses = response.data.map(course => ({
          value: course.id,
          text: course.course_name,
        }));
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    },
    async fetchPeriods() {
      try {
        const response = await this.$axios.get('/_/periods');
        this.periods = response.data.map(period => ({
          value: period.id,
          text: period.period,
        }));
      } catch (error) {
        console.error('Error fetching periods:', error);
      }
    },
    async handleSubmit() {
      this.v$.$touch();
      if (this.v$.$invalid) {
        this.setValidationMessages();
        console.error('Validation failed:', this.v$.$errors);
        return;
      }

      try {
        if (this.editing) {
          await this.$axios.put(`/_/students/${this.initialData.id}`, this.formData);
          alert('Estudiante actualizado exitosamente');
        } else {
          await this.$axios.post('/_/students', this.formData);
          alert('Estudiante guardado exitosamente');
          this.resetForm();
        }
      } catch (error) {
        console.error('Error en la API', error);
      }
    }
  },
};
</script>

<style scoped>
.row {
  margin-bottom: 15px;
}

.ui-icon-input {
  width: 100%;
}

.ui-card {
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ui-card > * {
  flex: 1;
}

@media (max-width: 767px) {
  .ui-card {
    margin-bottom: 20px;
  }
}

.text-danger {
  margin-top: -10px;
  margin-bottom: 10px;
}
</style>
