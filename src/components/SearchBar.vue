<template>
  <form id="search-bar" @submit.prevent="searchName">
    <label for="search">Search:</label>
    <input type="text" v-model="name" id="search">
    <input type="submit" value="SUBMIT" class="btn">
  </form>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      name: '',
    };
  },
  methods: {
    searchName() {
      this.$emit('search-name', this.name);

      this.name = '';
    },
  },
};
</script>

<style>
  input {
    margin: 10px 0 10px 10px;
    font-size: 17px;
    border: 1px solid grey;
  }

  #search-bar {
    margin-left: 10px;
  }

  #search-bar::after {
    content: "";
    clear: both;
    display: table;
  }
</style>

<style scoped>
  .btn {
    background: #2196F3;
    color: white;
    border: 1px solid grey;
    border-left: none;
    cursor: pointer;
  }

  .btn:hover {
    background: #0b7dda;
  }
</style>
