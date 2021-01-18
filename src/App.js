import React from 'react';
import './App.css';

import getMovies from './api/get';
import getQueryResults from './api/getQueryResults';
import getMovie from './api/getMovie';
import getGenres from './api/getGenres';
import Movie from './components/Movie';
import Pagination from './components/Pagination';
import Modal from './components/Modal';
import Select from './components/Select';

const App = () => {
    const [movies, setMovies] = React.useState([]);
    const [type, setType] = React.useState('popular');
    const [page, setPage] = React.useState(1);
    const [term, setTerm] = React.useState(null);
    const [modal, showModal] = React.useState(false);
    const [movie, setMovie] = React.useState([]);
    const [movieID, setMovieID] = React.useState('1');
    const [pages, setPages] = React.useState(1);
    const [genres, setGenres] = React.useState([]);
    
    React.useEffect(() => {
        setMovies([]);
       getMovies(type, page, term).then((movies) => {
          setMovies(movies);
       })
    }, [type, page, term]);
    
    React.useEffect(() => {
        getQueryResults(type, term).then((pages) => {
            setPages(pages);
        });
    }, [type, term]);
    
    React.useEffect(() => {
        setMovie([]);
       getMovie(movieID).then((movie) => {
          setMovie(movie);
       })
    }, [movieID]);
    
    React.useEffect(() => {
        getGenres().then((genres) => {
            setGenres(genres);
        });
    },[type, term, page]);
    
    function handleNavClick(type) {
        setType(type);
    }
    
    function handleClick(e) {
        if (e.target.innerHTML === 'Next') {
            if (page < pages) {
                setPage(page + 1);
                window.scrollTo(0, 0);
            }
        } else if (e.target.innerHTML === 'Prev') {
            if (page > 1) {
                setPage(page - 1);
            }
        } else if (e.target.innerHTML === 'First page') {
            setPage(1);
            window.scrollTo(0, 0);
        } else {
            setPage(pages);
            window.scrollTo(0, 0);
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
        setPage(1);
    }
    
    function closeModal() {
        showModal(false);
    }
    
    function handleGenreChange(e) {
        setType('genre');
        setTerm(e.target.value);
        setPage(1);
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
            <Select genres={genres} changeHandler={handleGenreChange} />
        </nav>
        <div className="movies">
            {rows}
        </div>
        <Pagination page={page} clickHandler={handleClick} totalPages={pages} />
        <Modal show={modal} movie={movie} closeHandler={closeModal} />
        <footer>
            <p>All data from TheMovieDB</p>
            <p>An <a href="https://github.com/pieisdead/themoviedbapp-react">OpenSource</a> app by <a href="https://www.multisites.co.za">MultiSites</a></p>
        </footer>
    </div>
    
  );
}

export default App;
