import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";

const API_KEY = '60835c0580e3e889f407ea6d38b4e5b0';
const API_BASE= 'https://api.themoviedb.org/3';

/*
Originais da Netflix
Recomendados
Em alta
Ação
Comédia 
Terror
Romance
Documentário
*/

const basicFetch = async(endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList : async() => {
       return [{
            slug: 'Originais',
            title: 'Originais do Netflix',
            items: await basicFetch(`/discover/tv?with_network=213&llanguage=pt-BR&api_key=${API_KEY}`)
        }, 
        {
            slug: 'trending',
            title: 'Recomendados para Você',
            items: await basicFetch(`/trending/all/week?llanguage=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'toprated',
            title: 'Em alta',
            items: await basicFetch(`/movie/top_rated?with_network=213&llanguage=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'action',
            title: 'Ação',
            items: await basicFetch(`/discover/movie?with_genres=28&llanguage=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'comedy',
            title: 'Comédia',
            items: await basicFetch(`/discover/movie?with_genres=35&llanguage=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'horror',
            title: 'Terror',
            items: await basicFetch(`/discover/movie?with_genres=27&llanguage=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'Romance',
            title: 'Romance',
            items: await basicFetch(`/discover/movie?with_genres=10749&llanguage=pt-BR&api_key=${API_KEY}`)
        },
        {
            slug: 'documentary',
            title: 'Documentário',
            items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
        },

        ];

    },

    getMovieInfo: async(movieId, type)=> {
        let info = {};
    if(movieId){
        switch(type){
            case 'movie':
                info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
            break;
            case 'tv':
                info = await basicFetch(`/tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
            break;
            default:
                info=null;
            break;
        }
    }

        return info;
    }
}
