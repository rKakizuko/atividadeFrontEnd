<script setup>
import { onMounted, reactive, ref } from 'vue';
import api from '../services/api';

const tarefas = ref([]);
const carregando = ref(false);
const erro = ref('');
const editandoId = ref(null);

const form = reactive({
  nome: '',
  descricao: '',
  concluida: false
});

function limparFormulario() {
  form.nome = '';
  form.descricao = '';
  form.concluida = false;
  editandoId.value = null;
}

function preencherFormulario(tarefa) {
  form.nome = tarefa.nome;
  form.descricao = tarefa.descricao || '';
  form.concluida = tarefa.concluida;
  editandoId.value = tarefa.id;
}

async function carregarTarefas() {
  carregando.value = true;
  erro.value = '';

  try {
    const { data } = await api.get('/tarefas');
    tarefas.value = data;
  } catch {
    erro.value = 'Nao foi possivel carregar as tarefas.';
  } finally {
    carregando.value = false;
  }
}

async function salvarTarefa() {
  erro.value = '';

  if (!form.nome.trim()) {
    erro.value = 'Informe o nome da tarefa.';
    return;
  }

  const payload = {
    nome: form.nome,
    descricao: form.descricao,
    concluida: form.concluida
  };

  try {
    if (editandoId.value) {
      await api.put(`/tarefas/${editandoId.value}`, payload);
    } else {
      await api.post('/tarefas', payload);
    }

    limparFormulario();
    await carregarTarefas();
  } catch {
    erro.value = 'Erro ao salvar tarefa.';
  }
}

async function excluirTarefa(id) {
  erro.value = '';

  try {
    await api.delete(`/tarefas/${id}`);
    if (editandoId.value === id) {
      limparFormulario();
    }
    await carregarTarefas();
  } catch {
    erro.value = 'Erro ao excluir tarefa.';
  }
}

onMounted(carregarTarefas);
</script>

<template>
  <section>
    <h1>CRUD de Tarefas</h1>
    <p>Tela simples para criar, editar e excluir tarefas.</p>

    <form class="form" @submit.prevent="salvarTarefa">
      <div>
        <label for="nome">Nome</label>
        <input id="nome" v-model="form.nome" type="text" placeholder="Ex: Fazer trabalho" />
      </div>

      <div>
        <label for="descricao">Descricao</label>
        <textarea id="descricao" v-model="form.descricao" rows="3" placeholder="Detalhes da tarefa" />
      </div>

      <label class="checkbox">
        <input v-model="form.concluida" type="checkbox" />
        Concluida
      </label>

      <div class="acoes">
        <button type="submit">{{ editandoId ? 'Atualizar' : 'Adicionar' }}</button>
        <button type="button" class="secundario" @click="limparFormulario">Limpar tudo</button>
      </div>
    </form>

    <p v-if="erro" class="erro">{{ erro }}</p>
    <p v-if="carregando">Carregando tarefas...</p>

    <ul v-else class="lista">
      <li v-for="tarefa in tarefas" :key="tarefa.id">
        <div>
          <strong>{{ tarefa.nome }}</strong>
          <p>{{ tarefa.descricao || 'Sem descricao' }}</p>
          <small>Status: {{ tarefa.concluida ? 'Concluida' : 'Pendente' }}</small>
        </div>

        <div class="acoes-item">
          <button @click="preencherFormulario(tarefa)">Editar</button>
          <button class="danger" @click="excluirTarefa(tarefa.id)">Excluir</button>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.form {
  margin-top: 1rem;
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #d8e0ef;
  display: grid;
  gap: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

label {
  font-weight: 600;
  display: block;
  margin-bottom: 0.25rem;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid #c9d5ea;
  border-radius: 8px;
  padding: 0.6rem;
  background: #fff;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.25rem 0;
}

.checkbox input {
  width: auto;
}

.acoes,
.acoes-item {
  display: flex;
  gap: 0.5rem;
}

.lista {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  display: grid;
  gap: 0.75rem;
}

.lista li {
  background: #fff;
  border-radius: 10px;
  border: 1px solid #d8e0ef;
  padding: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.lista p {
  margin: 0.25rem 0;
}

.secundario {
  background: #e9edf7;
  color: #1e3566;
}

.danger {
  background: #c0392b;
  color: #fff;
}

.erro {
  color: #b42318;
}
</style>
