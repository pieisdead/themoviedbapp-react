import React from 'react';
import './App.css';

import getMovies from './api/get';
import getMovie from './api/getMovie';
import Movie from './components/Movie';
import Pagination from './components/Pagination';
import Modal from './components/Modal';

const App = () => {
    const [movies, setMovies] = React.useState([]);
    const [type, setType] = React.useState('popular');
    const [page, setPage] = React.useState(1);
    const [term, setTerm] = React.useState(null);
    const [modal, showModal] = React.useState(false);
    const [movie, setMovie] = React.useState([]);
    const [movieID, setMovieID] = React.useState('1');
    
    React.useEffect(() => {
       getMovies(type, page, term).then((movies) => {
          setMovies(movies);
       })
    }, [type, page, term]);
    
    React.useEffect(() => {
       getMovie(movieID).then((movie) => {
          setMovie(movie);
       })
    }, [movieID]);
    
    function handleNavClick(type) {
        setType(type);
    }
    
    function handleClick(e) {
        if (e.target.innerHTML === 'Next') {
            setPage(page + 1);
            window.scrollTo(0, 0);
        } else {
            if (page > 1) {
                setPage(page - 1);
            }
        }
    }
    
    function handleSearch(e) {
        if (e.target.value !== '') {
            setType('search');
            setPage(1);
            setTerm(e.target.value);
        } else {
            setType('popular');
        }
    }
    
    function handleMovieClick(id) {
        setMovieID(id);
        showModal(true);
        window.scrollTo(0, 0);
    }
    
    function closeModal() {
        showModal(false);
    }
    
    const rows = movies.map((movie, i) => {
        return <Movie key={i} movie={movie} clickHandler={() => {handleMovieClick(movie.id)}} />;
    });
    
  return (
    <div className="page">
        <header>
            <h1>theMovieDBApp</h1>
            <input type="text" placeholder="Search" onChange={handleSearch} />
        </header>
        <nav>
            <ul>
                <li onClick={() => { handleNavClick('popular') }}
                    className={type === 'popular' ? 'active' : ''}>Popular Movies</li>
                <li onClick={() => { handleNavClick('top_rated') }}
                    className={type === 'top_rated' ? 'active' : ''}>Top Rated</li>
                <li onClick={() => { handleNavClick('upcoming') }}
                    className={type === 'upcoming' ? 'active' : ''}>Upcoming</li>
                <li onClick={() => { handleNavClick('now_playing') }}
                    className={type === 'now_playing' ? 'active' : ''}>Now Playing</li>
            </ul>
        </nav>
        <div className="movies">
            {rows}
        </div>
        <Pagination page={page} clickHandler={handleClick} />
        <Modal show={modal} movie={movie} closeHandler={closeModal} />
    </div>
    
  );
}

export default App;
