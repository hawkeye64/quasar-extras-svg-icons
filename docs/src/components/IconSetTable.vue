<template>
  <div class="icon-set-table">
    <q-markup-table flat bordered wrap-cells>
      <thead>
        <tr>
          <th class="text-left">Icon Set</th>
          <th class="text-left">Version</th>
          <th class="text-left">Import Path</th>
          <th class="text-left">Prefix(es)</th>
          <th class="text-right">Icons</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in iconSetMetadata" :key="row.folder">
          <td>
            <strong>{{ row.name }}</strong>
          </td>
          <td>
            <code>{{ row.version }}</code>
          </td>
          <td>
            <code>{{ row.importPath }}</code>
          </td>
          <td>
            <code v-for="prefix in row.prefixes" :key="`${row.folder}-${prefix}`">
              {{ prefix }}
            </code>
          </td>
          <td class="text-right">
            {{ row.iconCount.toLocaleString() }}
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script setup lang="ts">
import { iconSetMetadata } from "@/utils/icon-set-metadata";
</script>

<style lang="scss" scoped>
.icon-set-table {
  overflow-x: auto;
}

code + code {
  margin-left: 8px;
}
</style>
