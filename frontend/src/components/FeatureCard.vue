<script setup>
defineProps({
  titulo: {
    type: String,
    required: true
  },
  descricao: {
    type: String,
    required: true
  }
});
</script>

<template>
  <article class="card">
    <h2>{{ titulo }}</h2>
    <p>{{ descricao }}</p>
  </article>
</template>

<style scoped>
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

.card p {
  margin-bottom: 0;
}
</style>
