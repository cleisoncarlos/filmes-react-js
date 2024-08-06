
import { useEffect, useState } from "react"
import api from "../services/api"
import { Link } from "react-router-dom"
import Loading from "../components/Loading"

export default function Home() {

const [filmes, setFilmes] = useState([])
const [loading, setLoading] = useState(true)

useEffect(()=> {
  async function loadFilmes() {
    const response = await api.get('movie/now_playing', {
      params: {
        api_key: 'b2d7473acfcfa2cb6a5ee559059a4ca4',
        language: 'pt-BR',
        page: 1
      }
    })
   // console.log(response.data.results.slide(0,10))
   setFilmes(response.data.results.slice(0,12))    
  }

  loadFilmes()
  setLoading(false)

}, [])



if (loading){
  return (
   <Loading/>
  )
}  

return (
  
  <main>

  <div className="container">
   <div className="row">
 
 {filmes.map((filme)=> {
   return(
<div className="col-lg-3" key={filme.id}>
<article>
 <div className="card">
 <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
 <div className="card-body">
 <p className="fw-bold">{filme.title}</p>  
       {/* <p>Popularidade: {filme.popularity}</p> */}
       
       {/* <p className="small">{filme.overview}</p> */}
       <br/>
       <Link to={`/filme/${filme.id}`} className="leia-mais">Leia mais</Link>
 </div>
 </div>
     </article>
</div>
 
   )
 
 })}
 
 
 
   </div>
  </div>
 
    </main>
)

}
