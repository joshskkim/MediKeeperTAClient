<template>
  <div
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <td>
      {{ item.id }}
    </td>
    <td>
      {{ item.iname }}
    </td>
    <td>
      <div class="flex-container">
        <div class="flex-child cost">{{ item.cost }}</div>
        <div class="flex-child buttons" v-show="hover">
          <button
            @click.prevent="$emit('edit-item', item)"
            class="edit"
          >
            Edit
          </button>
          <button
            @click.prevent="$emit('del-item', item.id)"
            class="del"
          >
            X
          </button>
        </div>
      </div>
    </td>
  </div>
</template>

<script>

export default {
  name: 'SingleItem',
  props: ['item'],
  data() {
    return {
      hover: false,
    };
  },
};
</script>

<style>
  table td {
    text-align: left;
    padding: 8px;
    border-right: 2px solid #7D82A8;
    width: 90px;
  }
  table td:last-child {
    border-right: none;
    width: 125px;
  }
  table td:first-child {
    width: 50px;
  }
  .flex-container {
    display: flex;
    justify-content: space-between;
  }
</style>
