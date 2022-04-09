import React, {useEffect, useState} from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import './App.css';
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";

//API: https://www.themoviedb.org/settings/api
//Sites auxiliares: http://jsonviewer.stack.hu/ e https://resttesttest.com/

function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setfeaturedData] = useState(null);

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
      console.log(chosenInfo)
      
    }

    loadAll();
  }, []);

  return (
    <div className="page">

      <Header/>
      {featuredData&&
        <FeaturedMovie item={featuredData}/>
      }
      <section className="lists">
        {movieList.map((item, key)=> (
          <MovieRow key={key} title = {item.title}  items = {item.items}/>
        ))}
      </section>
    </div>
  );
}

export default App;
