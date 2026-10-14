import { useState } from 'react'

const moeda = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function Juros() {
  const [valor, setValor] = useState('')
  const [vencimento, setVencimento] = useState('')
  const [resultado, setResultado] = useState(null)

  function calcular(e) {
    e.preventDefault()
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0)
    const data = new Date(vencimento + 'T00:00:00')
    const dias = Math.max(0, Math.round((hoje - data) / 86400000))
    const juros = Number(valor) * 0.025 * dias
    setResultado({ dias, juros, total: Number(valor) + juros })
  }

  return (
    <section>
      <h2>3. Juros</h2>
      <form onSubmit={calcular}>
        <input type="number" step="0.01" min="0" placeholder="Valor" value={valor} onChange={(e) => setValor(e.target.value)} required />
        <input type="date" value={vencimento} onChange={(e) => setVencimento(e.target.value)} required />
        <button type="submit">Calcular</button>
      </form>
      {resultado && (
        <p>
          Dias em atraso: {resultado.dias} | Juros: <strong>{moeda(resultado.juros)}</strong> | Total: {moeda(resultado.total)}
        </p>
      )}
    </section>
  )
}
