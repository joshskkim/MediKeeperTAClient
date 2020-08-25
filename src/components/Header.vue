<template>
  <th>
    <tr class="Header">
      <th>
        ID
      </th>
      <th>
        Name
      </th>
      <th>
        Cost
      </th>
    </tr>
  </th>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style>
  table th {
    text-transform: uppercase;
    text-align: left;
    background: #44475C;
    color: #FFF;
    cursor: pointer;
    padding: 8px;
    width: 90px;
  }
  table th:hover {
    background: #717699;
  }
  table th:first-child {
    padding-right: 0;
    width: 50px;
  }
  table th:last-child {
    padding-right: 0;
    width: 125px;
  }
</style>
