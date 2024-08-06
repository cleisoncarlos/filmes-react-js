import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom' 
import api from '../services/api'
import Loading from '../components/Loading'

import { toast } from 'react-toastify'


export default function Filme() {

  const { id } = useParams()
  const navigation = useNavigate()

  const [filme, setFilme] = useState({})
  const [loading, setLoading] = useState(true)




  function salvarFilme(){
    const minhaLista = localStorage.getItem('@primeflix')

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const resFilmes = filmesSalvos.some((filmeSalvo)=> filmeSalvo.id === filme.id)


    if (resFilmes){
     // alert('Esse filme já está na sua lista')
     toast.error('Esse filme já está na sua lista')
      return
    }

    filmesSalvos.push(filme)
    localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos))
   // alert('filme salvo com sucesso')
   toast.success('Filme salvo com sucesso')
  }


  useEffect( ()=> {
    async function loadFilme(){
    
      await api.get(`/movie/${id}`, {
        params: {
          api_key: 'b2d7473acfcfa2cb6a5ee559059a4ca4',
          language: 'pt-BR'
        }
      }).then((response)=> {
       // console.log(response.data)
       setFilme(response.data)
       setLoading(false)

      }).catch(()=> {
        console.log('nao encontrado')
        navigation('/', {replace: true})
        return;   
      })

    }

    loadFilme()

    //antigo  didimount
    return ()=> {
      console.log('componente foi desmontado')
    }
  }, [id, navigation])


if(loading){
  return <Loading/>
}

  return (
    <div className="container">
   <div className="lista-filmes">

   <article>  
  
<div className="card">
 <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
 <div className="card-body">
 <h2>{filme.title}</h2>  
  <p>Popularidade: {filme.popularity}</p>

<p>{filme.overview}</p>

<div className='buttons'>


  <button className='bt' onClick={salvarFilme}>SALVAR</button>
  

  <button className='bt'>
  <a href={`https://www.youtube.com/results?search_query=${filme.title} trailer`} rel='external'>TRAILER</a>
  </button>
</div>
     
     
 </div>
 </div>
   </article>
</div>
</div>
  
  
  )

}
