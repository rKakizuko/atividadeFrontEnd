const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      concluida INTEGER DEFAULT 0,
      criado_em TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

function mapTarefa(row) {
  return {
    ...row,
    concluida: Boolean(row.concluida)
  };
}

app.get('/api/tarefas', (req, res) => {
  db.all('SELECT id, titulo AS nome, descricao, concluida, criado_em FROM tarefas ORDER BY id DESC', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao listar tarefas.' });
    }

    return res.json(rows.map(mapTarefa));
  });
});

app.get('/api/tarefas/:id', (req, res) => {
  db.get('SELECT id, titulo AS nome, descricao, concluida, criado_em FROM tarefas WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar tarefa.' });
    }

    if (!row) {
      return res.status(404).json({ error: 'Tarefa nao encontrada.' });
    }

    return res.json(mapTarefa(row));
  });
});

app.post('/api/tarefas', (req, res) => {
  const { nome, descricao = '', concluida = false } = req.body;

  if (!nome || !nome.trim()) {
    return res.status(400).json({ error: 'O nome e obrigatorio.' });
  }

  const query = 'INSERT INTO tarefas (titulo, descricao, concluida) VALUES (?, ?, ?)';
  const params = [nome.trim(), descricao.trim(), concluida ? 1 : 0];

  db.run(query, params, function onInsert(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criar tarefa.' });
    }

    db.get('SELECT id, titulo AS nome, descricao, concluida, criado_em FROM tarefas WHERE id = ?', [this.lastID], (selectErr, row) => {
      if (selectErr) {
        return res.status(500).json({ error: 'Erro ao retornar tarefa criada.' });
      }

      return res.status(201).json(mapTarefa(row));
    });
  });
});

app.put('/api/tarefas/:id', (req, res) => {
  const { nome, descricao = '', concluida = false } = req.body;

  if (!nome || !nome.trim()) {
    return res.status(400).json({ error: 'O nome e obrigatorio.' });
  }

  const query = 'UPDATE tarefas SET titulo = ?, descricao = ?, concluida = ? WHERE id = ?';
  const params = [nome.trim(), descricao.trim(), concluida ? 1 : 0, req.params.id];

  db.run(query, params, function onUpdate(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Tarefa nao encontrada.' });
    }

    db.get('SELECT id, titulo AS nome, descricao, concluida, criado_em FROM tarefas WHERE id = ?', [req.params.id], (selectErr, row) => {
      if (selectErr) {
        return res.status(500).json({ error: 'Erro ao retornar tarefa atualizada.' });
      }

      return res.json(mapTarefa(row));
    });
  });
});

app.delete('/api/tarefas/:id', (req, res) => {
  db.run('DELETE FROM tarefas WHERE id = ?', [req.params.id], function onDelete(err) {
    if (err) {
      return res.status(500).json({ error: 'Erro ao remover tarefa.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Tarefa nao encontrada.' });
    }

    return res.status(204).send();
  });
});

app.get('/api/resumo', (req, res) => {
  db.get(
    `
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN concluida = 1 THEN 1 ELSE 0 END) AS concluidas,
        SUM(CASE WHEN concluida = 0 THEN 1 ELSE 0 END) AS pendentes
      FROM tarefas
    `,
    [],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao carregar resumo.' });
      }

      return res.json({
        total: row.total || 0,
        concluidas: row.concluidas || 0,
        pendentes: row.pendentes || 0
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
