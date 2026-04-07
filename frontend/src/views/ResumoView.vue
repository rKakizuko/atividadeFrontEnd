<script setup>
import { onMounted, ref } from 'vue';
import api from '../services/api';

const resumo = ref({ total: 0, concluidas: 0, pendentes: 0 });
const carregando = ref(false);
const erro = ref('');

async function carregarResumo() {
  carregando.value = true;
  erro.value = '';

  try {
    const { data } = await api.get('/resumo');
    resumo.value = data;
  } catch {
    erro.value = 'Nao foi possivel carregar o resumo.';
  } finally {
    carregando.value = false;
  }
}

onMounted(carregarResumo);
</script>

<template>
  <section>
    <h1>Resumo de Tarefas</h1>
    <p>Dados simples para apresentar os resultados do CRUD.</p>

    <button class="refresh" @click="carregarResumo" :disabled="carregando">
      {{ carregando ? 'Sincronizando...' : 'Atualizar resumo' }}
    </button>

    <p v-if="erro" class="erro">{{ erro }}</p>

    <div class="stats">
      <article class="stat">
        <h2>Total</h2>
        <strong>{{ resumo.total }}</strong>
      </article>

      <article class="stat">
        <h2>Concluidas</h2>
        <strong>{{ resumo.concluidas }}</strong>
      </article>

      <article class="stat">
        <h2>Pendentes</h2>
        <strong>{{ resumo.pendentes }}</strong>
      </article>
    </div>
  </section>
</template>

<style scoped>
.refresh {
  margin: 1rem 0;
}

.stats {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.stat {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #d8e0ef;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.stat h2 {
  margin: 0 0 0.4rem;
  font-size: 1rem;
}

.stat strong {
  font-size: 1.8rem;
  color: #1f4ea3;
}

.erro {
  color: #b42318;
}
</style>
