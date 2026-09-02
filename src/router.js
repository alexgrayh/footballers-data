import { createRouter, createWebHistory } from "vue-router";
import FootballersTable from "./components/footballers-table.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/defenders',
            name: 'DefendersView',
            component: FootballersTable,
            props: { category: 'defenders' }
        },
        {
            path: '/forwards',
            name: 'ForwardsView',
            component: FootballersTable,
            props: { category: 'forwards' }
        },
        {
            path: '/goalkeepers',
            name: 'GoalkeepersView',
            component: FootballersTable,
            props: { category: 'goalkeepers' }
        },
        {
            path: '/midfielders',
            name: 'MidfieldersView',
            component: FootballersTable,
            props: { category: 'midfielders' }
        }
    ]
});

export default router;