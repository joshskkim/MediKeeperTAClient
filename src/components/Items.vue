<template>
  <div>
    <h2>
      Current Items
    </h2>
    <table>
      <thead>
        <Header />
      </thead>
      <tbody>
        <tr v-bind:key="item.id" v-for="item in items">
          <SingleItem
            v-bind:item="item"
            v-on:del-item="$emit('del-item', item.id)"
            v-on:edit-item="$emit('edit-item', item)"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Header from './Header.vue';
import SingleItem from './SingleItem.vue';

export default {
  name: 'Items',
  components: {
    Header,
    SingleItem,
  },
  props: ['items'],
};
</script>

<style>
  table {
    border-collapse: collapse;
    border: 3px solid #44475C;
    margin: 0 10px 0 10px;
  }
  table tbody tr:nth-child(2n) td {
    background: #D4D8F9;
  }
  table tr:hover {
    opacity: 0.5;
  }
</style>

<style scoped>
  h2 {
    margin-left: 10px;
  }
</style>
