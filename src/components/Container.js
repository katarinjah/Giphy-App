import { useState, useEffect } from 'react';
import './Container.css';

export const Container = () => {
    const [searchInput, setSearchInput] = useState("");
    const [gifs, setGifs] = useState([]);

    const fetchGifs = async (query) => {
        const apiKey = "bLS2gJF6VVc2vKqvA49G176qixlOEWLf"
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}`;
        const response = await fetch(url);
        const data = await response.json();
        setGifs(data.data);
    };

    const onSearchHandler = (event) => {
        if (event.key === "Enter") {
            fetchGifs(searchInput);
            setSearchInput("");
        };
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
            <div className="grid-container">
                {gifs.map((gif) => (
                    <div className="grid-item">
                        <img key={gif.id} src={gif.images.downsized.url} alt={gif.title} />
                    </div>
                ))}
            </div>
        </>
    );
}