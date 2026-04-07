<template>
  <section class="home">
    <h1>Aplicacao SPA com Vue</h1>
    <p>
      Projeto simples com 3 telas e CRUD de tarefas usando API REST e banco SQLite.
    </p>

    <div class="cards">
      <article class="card">
        <h2>1. Inicio</h2>
        <p>Explica o objetivo da atividade.</p>
      </article>

      <article class="card">
        <h2>2. Tarefas</h2>
        <p>Permite criar, listar, editar e excluir tarefas.</p>
      </article>

      <article class="card">
        <h2>3. Resumo</h2>
        <p>Mostra totais de tarefas concluidas e pendentes.</p>
      </article>
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

.card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #d8e0ef;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.card h2 {
  margin-top: 0;
  font-size: 1.1rem;
}
</style>
