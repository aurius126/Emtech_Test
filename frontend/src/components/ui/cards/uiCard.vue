<template>
    <div class="ui-card" :class="cardClasses">
      <slot name="title">
        <div v-if="title" class="ui-card__header">
          <div class="ui-card__header-content">
            <div class="ui-card__title-container">
              <h5 class="ui-card__title">
                <span v-if="titleIcon" :class="titleIcon"></span> {{ title }}
              </h5>
              <div class="ui-card__actions">
                <slot name="actions"></slot>
              </div>
            </div>
            <p v-if="description" class="ui-card__description">{{ description }}</p>
          </div>
        </div>
      </slot>
      <slot></slot>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UiCard',
    props: {
      backgroundVariant: {
        type: String,
        default: null,
        required: false,
      },
      borderVariant: {
        type: String,
        default: null,
        required: false,
      },
      description: {
        type: String,
        default: null,
        required: false,
      },
      helpText: {
        type: String,
        default: null,
        required: false,
      },
      paddingVariant: {
        type: String,
        default: null,
        required: false,
      },
      shadow: {
        type: Boolean,
        default: true,
        required: false,
      },
      title: {
        type: String,
        default: null,
        required: false,
      },
      titleIcon: {
        type: String,
        default: null,
        required: false,
      },
      status: {
        type: String,
        default: null,
        required: false,
      }
    },
    computed: {
      cardClasses() {
        const classes = [];
  
        if (this.backgroundVariant) {
          classes.push(`ui-card--background-${this.backgroundVariant}`);
        }
  
        if (this.borderVariant) {
          classes.push(`ui-card--border-${this.borderVariant}`);
        }
  
        if (this.paddingVariant) {
          classes.push(`ui-card--padding-${this.paddingVariant}`);
        }
  
        if (this.shadow) {
          classes.push('ui-card--shadow');
        }
  
        return classes;
      },
    },
  };
  </script>
  
  <style lang="scss">
  .ui-card {
    background-color:white;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 1rem;
    padding: 32px;
  
    @media (max-width: 768px) {
      padding: 16px;
    }
  
    &--shadow {
      @media not print {
        box-shadow: 0px 8px 16px rgba(#000000, 0.15);
      }
      @media only print { 
        border: 1px solid greenyellow;
      }
    }
  
    &--background-white {
      background-color: white;
    }
  
    &--border-secondary {
      border: 1px solid greenyellow;
    }
  
    &--padding-sm {
      padding: 16px;
    }
  
    &--padding-usm {
      padding: 0px;
    }
  
    &__header {
      display: flex;
      justify-content: space-between;
    }
  
    &__title-container {
      display: flex;
      justify-content: space-between;
    }
  
    &__title {
      font-weight: 600;
    }
  
    &__description {
      color: greenyellow;
      font-weight: 400;
      margin-bottom: 0;
    }
  }
  </style>
  