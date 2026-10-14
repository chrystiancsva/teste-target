import dados from './data/vendas.json'

const moeda = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function comissao(valor) {
  if (valor < 100) return 0
  if (valor < 500) return valor * 0.01
  return valor * 0.05
}

export default function Comissoes() {
  const totais = {}
  dados.vendas.forEach((v) => {
    totais[v.vendedor] = (totais[v.vendedor] || 0) + comissao(v.valor)
  })

  return (
    <section>
      <h2>1. Comissões</h2>
      <table>
        <thead>
          <tr>
            <th>Vendedor</th>
            <th>Comissão</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(totais).map(([nome, total]) => (
            <tr key={nome}>
              <td>{nome}</td>
              <td>{moeda(total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
