<template>
  <FootballersTable category="goalkeepers" />
</template>

<script>
import FootballersTable from '@/components/FootballersTable.vue';

export default {
  name: 'GoalkeepersView',
  components: {
    FootballersTable
  }
};
</script>