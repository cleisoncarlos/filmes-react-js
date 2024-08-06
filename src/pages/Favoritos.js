import {useState, useEffect} from 'react'

export default function Favoritos() {

    const [filmes, setFilmes] = useState([])


    useEffect(()=> {
        const minhaLista = localStorage.getItem('@primeflix')
        setFilmes(JSON.parse(minhaLista) || []) 
    },[])


    function excluirFilme(id){
      let filtraFilmes =   filmes.filter((item)=> {
            return item.id !== id
        })

        setFilmes(filtraFilmes)

        localStorage.setItem('@primeflix', JSON.stringify(filtraFilmes))

    }


  return (
    <div className="container mx-auto">

{filmes.length === 0 && 'Vc não possui filmes favoritos!'}
      
   
      {filmes.map((filme) => (
<div className='col-lg-6'>
  <div className='card'>
              <div key={filme.id} className='card-body'>
              <h3>{filme.title}</h3>
              {/* <p>{filme.overview}</p> */}

          <div className='buttons'>
          <button className='bt'>
                  <a href={`/filme/${filme.id}`}>Veja mais</a>
              </button>     

                <button className='bt' onClick={() => excluirFilme(filme.id)}>
                 EXCLUIR
              </button> 
          </div>
            
          </div>
    </div>
    
       </div>
            ))}
       
       </div>
  )
}
