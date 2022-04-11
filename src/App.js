import React, {useEffect, useState} from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import './App.css'; 
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";  
import { ImRedo2 } from "react-icons/im" ;   

//API: https://www.themoviedb.org/settings/api
//Sites auxiliares: http://jsonviewer.stack.hu/ e https://resttesttest.com/

function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setfeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect (()=>{
    const loadAll = async() => {
      // Pegando a lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);
  
      // Pegando Filme destaque Featured
      let originals = list.filter(i=>i.slug === 'Originais');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setfeaturedData(chosenInfo);
      
    }

    loadAll();
  }, []);

  useEffect (()=>{
       const scrollListener = () => {
         if(window.scrollY > 10){
           setBlackHeader(true);
         }else {
            setBlackHeader(false);
         }
       }
       window.addEventListener('scroll', scrollListener);

       return () => {
         window.removeEventListener('scroll', scrollListener)
       }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader}/>
      {featuredData&&
        <FeaturedMovie item={featuredData} />
      }
      <section className="lists">
        {movieList.map((item, key)=> (
          <MovieRow key={key} title = {item.title}  items = {item.items}/>
        ))}
      </section>

      <footer className="footer">
        Feito com ♥ pelo Robert William<br/>
        Direitos de Imagem para Netflix<br/>
        Dados retirados do site  <a href="https://www.themoviedb.org/">Themoviedb.org</a>
      </footer>
      
      {movieList.length <= 0 &&  
      <div className="loading">
      <img src="https://i.imgur.com/6L2zd2V.gif" alt= "Carregando"/>
      </div>
    }
      
    </div>
  );
}

export default App;
