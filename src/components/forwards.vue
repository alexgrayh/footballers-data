<template>
  <FootballersTable category="forwards" />
</template>

<script>
import FootballersTable from '@/components/FootballersTable.vue';

export default {
  name: 'ForwardsView',
  components: {
    FootballersTable
  }
};
</script>