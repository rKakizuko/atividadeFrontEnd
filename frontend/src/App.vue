<template>
  <div class="layout">
    <header class="topbar">
      <h1>Sistema de Tarefas</h1>
      <nav class="menu">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/tarefas">Tarefas</RouterLink>
        <RouterLink to="/resumo">Resumo</RouterLink>
      </nav>
    </header>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  background: #f5f7fb;
}

.topbar {
  background: #1f4ea3;
  color: #fff;
  padding: 1rem;
}

.topbar h1 {
  margin: 0 0 0.75rem;
  font-size: 1.25rem;
}

.menu {
  margin-top: 0.8rem;
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.menu a {
  color: #e6eeff;
  text-decoration: none;
  padding: 0.4rem 0.7rem;
  border-radius: 8px;
}

.menu a.router-link-active {
  background: #fff;
  color: #1f4ea3;
}

.content {
  max-width: 900px;
  margin: 0 auto;
  padding: 1.4rem 1.2rem;
}

@media (max-width: 600px) {
  .topbar h1 {
    font-size: 1.2rem;
  }
}
</style>
