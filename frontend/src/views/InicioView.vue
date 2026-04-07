<script setup>
import FeatureCard from '../components/FeatureCard.vue';

const secoes = [
  {
    titulo: '1. Inicio',
    descricao: 'Explica o objetivo da atividade.'
  },
  {
    titulo: '2. Tarefas',
    descricao: 'Permite criar, listar, editar e excluir tarefas.'
  },
  {
    titulo: '3. Resumo',
    descricao: 'Mostra totais de tarefas concluidas e pendentes.'
  }
];
</script>

<template>
  <section class="home">
    <h1>Aplicacao SPA com Vue</h1>
    <p>
      Projeto simples com 3 telas e CRUD de tarefas usando API REST e banco SQLite.
    </p>

    <div class="cards">
      <FeatureCard
        v-for="secao in secoes"
        :key="secao.titulo"
        :titulo="secao.titulo"
        :descricao="secao.descricao"
      />
    </div>
  </section>
</template>

<style scoped>
.home h1 {
  margin-top: 0;
}

.home > p {
  max-width: 62ch;
}

.cards {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  margin-top: 1.2rem;
}
</style>
