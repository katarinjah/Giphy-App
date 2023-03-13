import { useState, useEffect } from 'react';
import './Container.css';

export const Container = () => {
    const [searchInput, setSearchInput] = useState("");
    const [gifs, setGifs] = useState([]);

    const onSearchHandler = (event) => {
        if (event.key === "Enter") {
            fetchGifs(searchInput);
            setSearchInput("");
        };
    };

    const fetchGifs = (query) => {
        const apiKey = "bLS2gJF6VVc2vKqvA49G176qixlOEWLf"
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}`;
        fetch(url)
        .then(response => response.json())
        .then(data => setGifs(data.data))
        .catch(error => console.log(error));
        };
    
    useEffect(() => {
        if (searchInput) {
            fetchGifs(searchInput);
        };
    }, [searchInput]);

    return (
        <>
            <div id="searchBox">
                <h1>Search Giphy</h1>
                <input
                type="text"
                value={searchInput}
                onChange={event => setSearchInput(event.target.value)}
                onKeyDown={onSearchHandler}
                />
            </div>
            <div id="gifBox">
                {gifs.map((gif) => (
                    <div className="gif">
                        <img key={gif.id} src={gif.images.original.url} alt={gif.title} />
                    </div>
                ))}
            </div>
        </>
    );
}