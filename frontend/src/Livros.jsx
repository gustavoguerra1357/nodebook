// frontend/src/pages/Livros.jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Livros() {
  const [livros, setLivros] = useState([])

  useEffect(() => {
    axios.get('/api/livros') // proxy redireciona para localhost:3000/livros
      .then(res => setLivros(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <ul>
      {livros.map(l => <li key={l.id}>{l.titulo} — {l.autor}</li>)}
    </ul>
  )
}