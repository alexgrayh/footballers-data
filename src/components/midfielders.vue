<template>
  <FootballersTable category="midfielders" />
</template>

<script>
import FootballersTable from '@/components/FootballersTable.vue';

export default {
  name: 'MidfieldersView',
  components: {
    FootballersTable
  }
};
</script>