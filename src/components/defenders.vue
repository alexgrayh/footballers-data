<template>
  <FootballersTable category="defenders" />
</template>

<script>
import FootballersTable from '@/components/FootballersTable.vue';

export default {
  name: 'DefendersView',
  components: {
    FootballersTable
  }
};
</script>