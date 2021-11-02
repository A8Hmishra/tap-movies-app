import { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';


const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const history = useHistory();

    useEffect(() => {
        fetchMovies();
    }, []);

    const setColor = function (status) {
        const root = document.getElementById('root');
        if (status) {
            root.style.backgroundColor = 'grey';
        } else {
            root.style.backgroundColor = 'white';
        }
    }

    const fetchMovies = async () => {
        try {
            setColor(true);
            setLoading(true);
            const response = await fetch(`http://localhost:4000/api/movies?searchText=${searchText}`);
            const data = await response.json();
            setLoading(false);
            setColor(false);
            setMovies(data);
            setError(null);

        } catch (e) {
            setLoading(false);
            setError(`Error:${e.message}`);
        }
    }

    const onClickViewMovie = ({ id }) => {
        console.log("button clicked");
        history.push(`/${id}`);
    }

    return (

        <>
            <SearchBar onClickRefresh={fetchMovies} setSearchText={setSearchText} />
            {error && <Alert varient="danger" dismissible>{error}</Alert>}
            {loading ? <Loader /> :
                <div className="d-flex flex-wrap">
                    {movies.map(movie => {
                        const { id, title } = movie;
                        return (
                            <Card key={id} className="m-3 movies1">
                                <Card.Body>
                                    <Card.Title>{title}</Card.Title>
                                    <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => onClickViewMovie(movie)}>View Movie</Button>
                                </Card.Body>
                            </Card>)
                    })}
                </div>}
        </>
    )
};

export default Home;