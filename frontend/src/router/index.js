import { createRouter, createWebHistory } from 'vue-router';
import InicioView from '../views/InicioView.vue';
import TarefasView from '../views/TarefasView.vue';
import ResumoView from '../views/ResumoView.vue';

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: InicioView
  },
  {
    path: '/tarefas',
    name: 'tarefas',
    component: TarefasView
  },
  {
    path: '/resumo',
    name: 'resumo',
    component: ResumoView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
