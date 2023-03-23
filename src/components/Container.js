import React, { useState, useEffect } from 'react';
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
        setSearchInput(event.target.value);
    };
    
    useEffect(() => {
        if (searchInput) {
            fetchGifs(searchInput);
        };
        return;
    }, [searchInput]);

    return (
        <>
            <div id="searchBox">
                <h1>Search Giphy</h1>
                <input
                type="text"
                value={searchInput}
                onChange={onSearchHandler}
                />
            </div>
            <div className="grid-container">
                {gifs.map((gif) => (
                    <div className="grid-item" key={gif.id}>
                        <img src={gif.images.downsized.url} alt={gif.title} />
                    </div>
                ))}
            </div>
        </>
    );
};
