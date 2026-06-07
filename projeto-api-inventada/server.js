import express from 'express';

const app = express();
app.use(express.json());

// Endpoint 01: Retorna dados estáticos (Simulando uma rota de produtos)
app.get('/api/coffes', (req, res) => {
  res.json([
    { id: 1, name: 'arabic coffe', note: '10' },
    { id: 2, name: 'black coffe', note: '5' }
  ]);
});

// Endpoint 02: Rota vulnerável simulada
// Simula uma busca insegura onde o ID é injetado direto
// Somente DAST reportaria essa rota
app.get('/api/users/search', (req, res) => {
  const query = req.query.q;
  // Apenas simulação de retorno
  res.send(`Searching for user: ${query}`);
});


// Endpoint 03: Rota de criação (POST)
app.post('/api/feedback', (req, res) => {
  res.status(201).json({ status: 'success', message: 'Feedback received' });
});

// Endpoint 4: Expõe dados sensíveis/configurações do sistema (Insecure Endpoint)
// Endpoint para o SAST pegar
app.get('/api/debug/env', (req, res) => {
  res.json({
    status: "debug_mode",
    db_password: "admin_master_password_123", // Credencial exposta
    internal_version: "1.0.0-beta"
  });
});

app.get('/api/v1/redirect', (req, res) => {
  const targetUrl = req.query.url;
  res.redirect(targetUrl); // Falha de Open Redirect
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend de testes rodando na porta ${PORT}`);
});