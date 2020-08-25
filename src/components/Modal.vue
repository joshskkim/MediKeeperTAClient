<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal backdrop" @click="closeModal()"/>

      <div class="modal dialog">
        <div class="modal header">
          <slot name="header"/>
          <button type="button" class="modal close" @click="closeModal()">
            X
          </button>
        </div>

        <div class="modal body">
          <slot name="body"/>
        </div>

        <div class="modal footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      show: false,
    };
  },
  methods: {
    closeModal() {
      this.show = false;
      document.querySelector('body').classList.remove('overflow-hidden');
    },
    openModal() {
      this.show = true;
      document.querySelector('body').classList.add('overflow-hidden');
    },
  },
};
</script>

<style scoped>
  .modal {
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  }

  .modal .backdrop {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }

  .modal .dialog {
    background-color: #ffffff;
    width: 80%;
    margin: 17% auto;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    z-index: 1;
    @media screen and (max-width: 992px) {
      width: 90%;
    }
  }

  .modal .close {
    width: 25px;
    height: 25px;
    position: relative;
  }

  .modal .header {
    padding: 20px;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .modal .body {
    padding: 10px;
    position: relative;
    display: flex;
    overflow: auto;
    align-items: center;
    justify-content: space-evenly;
  }

  .modal .footer {
    padding: 10px 20px 20px;
    position: relative;
    display: flex;
    justify-content: flex-end;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
