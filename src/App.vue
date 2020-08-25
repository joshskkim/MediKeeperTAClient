<template>
  <div id="app">
    <img alt="MediKeeper logo" src="./assets/logo.png">
    <SearchBar @search-name="handleSearch" />
    <Items
      v-bind:items='items'
      @del-item="handleDelete"
      @edit-item="handleEdit"
    />

    <modal ref="editModal">
      <template v-slot:header>
        <h1>Edit {{ originalItem.iname }}</h1>
      </template>

      <template v-slot:body>
        <label for="namechange">Change {{ originalItem.iname }}'s name:</label>
        <input type="text" v-model="editedItem.iname" id="namechange">
        <label for="costchange">Change {{ originalItem.iname }}'s cost:</label>
        <input type="number" v-model="editedItem.cost" id="costchange">
      </template>

      <template v-slot:footer>
        <button
          @click="handleCancel"
        >
          Cancel
        </button>
        <button
          @click="handlePatch"
        >
          Save
        </button>
      </template>
    </modal>
    <h2 v-show="maxPriceItem.id">
      The most you've paid for
      {{ maxPriceItem.iname }}
      is
      {{ maxPriceItem.cost }}
    </h2>
    <button v-show="maxPriceItem.id" @click="handleUnfilter">See all items</button>
    <div id="createItem">
      <button
        v-show="!creatingItem"
        @click="creatingItem = true"
        id="createButton"
      >
        Create A New Item
      </button>
      <form v-show="creatingItem" @submit.prevent="handleAdd">
        <label for="nameinput">Input name:</label>
        <input type="text" v-model="newItem.iname" id="nameinput" name="name" required>
        <label for="costinput">Input cost:</label>
        <input type="number" v-model="newItem.cost" id="costinput" name="cost" required>
        <button
          @click="creatingItem = false"
          type="button"
        >
          Cancel
        </button>
        <input type="submit" value="Save">
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-self-compare */

import axios from 'axios';
import Modal from './components/Modal.vue';
import Items from './components/Items.vue';
import SearchBar from './components/SearchBar.vue';

const API_URL = 'https://13.57.228.42:80';

export default {
  name: 'App',
  components: {
    Modal,
    Items,
    SearchBar,
  },
  data() {
    return {
      items: [],
      allItems: [],
      maxPriceItem: {},
      editedItem: {},
      originalItem: {},
      newItem: {},
      creatingItem: false,
    };
  },
  created() {
    axios.get(`${API_URL}/api/items`)
      .then(({ data }) => {
        this.items = data;
      })
      .catch((err) => console.error(err));
  },
  methods: {
    async handleSearch(name) {
      const [list, max] = await Promise.all([
        axios.get(`${API_URL}/api/items/list/${name}`),
        axios.get(`${API_URL}/api/items/${name}`),
      ]);

      this.allItems = this.items;
      this.items = list.data;
      this.maxPriceItem = max.data;
    },
    handleAdd() {
      this.creatingItem = false;
      this.items.push(this.newItem);
      axios.post(`${API_URL}/api/items`, this.newItem);
      this.newItem = {};
    },
    handleCancel() {
      this.$refs.editModal.closeModal();
      this.editedItem = {};
    },
    handleDelete(value) {
      axios.delete(`${API_URL}/api/items/${value}`);
      const index = this.items.map((item) => item.id).indexOf(value);
      this.items.splice(index, 1);
      if (this.allItems[0]) {
        this.allItems.splice(index, 1);
      }
    },
    handleEdit(item) {
      this.$refs.editModal.openModal();
      this.originalItem = item;
    },
    handlePatch() {
      this.$refs.editModal.closeModal();
      const namechanged = !!this.editedItem.iname;
      const costchanged = !!(this.editedItem.cost !== undefined);
      const index = this.items.map((item) => item.id).indexOf(this.originalItem.id);

      if (namechanged) {
        this.$set(this.items[index], 'iname', this.editedItem.iname);
        axios.patch(`${API_URL}/api/items/name`, {
          id: this.originalItem.id,
          iname: this.editedItem.iname,
        });
      }

      if (costchanged) {
        this.$set(this.items[index], 'cost', this.editedItem.cost);
        axios.patch(`${API_URL}/api/items/cost`, {
          id: this.originalItem.id,
          cost: this.editedItem.cost,
        });
      }

      this.editedItem = {};
    },
    handleUnfilter() {
      this.items = this.allItems;
      this.maxPriceItem = {};
    },
  },
};
</script>

<style>
  body {
    font-family: 'Open Sans', sans-serif;
  }

  img {
    margin-left: 10px;
  }

  button {
    cursor: pointer;
  }

  .overflow-hidden {
    overflow: hidden;
  }

  #createButton {
    margin: 10px;
    width: 323px;
  }
</style>

<style scoped>
  button {
    background: #2196F3;
    color: white;
    border: 1px solid grey;
    border-left: none;
    margin-left: 10px;
  }
</style>
