import { useState } from 'react'
import dados from './data/estoque.json'

export default function Estoque() {
  const [produtos, setProdutos] = useState(dados.estoque)
  const [movimentacoes, setMovimentacoes] = useState([])
  const [codigo, setCodigo] = useState(dados.estoque[0].codigoProduto)
  const [tipo, setTipo] = useState('entrada')
  const [quantidade, setQuantidade] = useState(1)
  const [descricao, setDescricao] = useState('')
  const [mensagem, setMensagem] = useState('')

  function lancar(e) {
    e.preventDefault()
    const qtd = Number(quantidade)
    const produto = produtos.find((p) => p.codigoProduto === Number(codigo))
    const saldo = tipo === 'entrada' ? produto.estoque + qtd : produto.estoque - qtd

    if (saldo < 0) {
      setMensagem('Estoque insuficiente para essa saída.')
      return
    }

    setProdutos(produtos.map((p) => (p === produto ? { ...p, estoque: saldo } : p)))
    setMovimentacoes([
      ...movimentacoes,
      { id: movimentacoes.length + 1, produto: produto.descricaoProduto, tipo, quantidade: qtd, descricao, saldo },
    ])
    setMensagem(`Estoque final de ${produto.descricaoProduto}: ${saldo}`)
    setDescricao('')
  }

  return (
    <section>
      <h2>2. Estoque</h2>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Produto</th>
            <th>Estoque</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.codigoProduto}>
              <td>{p.codigoProduto}</td>
              <td>{p.descricaoProduto}</td>
              <td>{p.estoque}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={lancar}>
        <select value={codigo} onChange={(e) => setCodigo(e.target.value)}>
          {produtos.map((p) => (
            <option key={p.codigoProduto} value={p.codigoProduto}>
              {p.descricaoProduto}
            </option>
          ))}
        </select>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
        <input type="number" min="1" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
        <input placeholder="Descrição da movimentação" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        <button type="submit">Lançar</button>
      </form>

      {mensagem && <p><strong>{mensagem}</strong></p>}

      {movimentacoes.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Tipo</th>
              <th>Qtde</th>
              <th>Descrição</th>
              <th>Estoque final</th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.produto}</td>
                <td>{m.tipo}</td>
                <td>{m.quantidade}</td>
                <td>{m.descricao}</td>
                <td>{m.saldo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
