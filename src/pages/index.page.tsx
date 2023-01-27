import { useEffect } from 'react'
import api from '../services/axios'

export default function Home() {

  useEffect(() => {
    AllCategoreis()
  }, [])

  async function AllCategoreis() {
    try {
      const response = api.get('/api/categories')
      console.log((await response).data)
    } catch (err) {
      console.log("Erro: ", err)
    }
  }

  return (
    <div>
        <h1>Pagina 1</h1>
    </div>
  )
}