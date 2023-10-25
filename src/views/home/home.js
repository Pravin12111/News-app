import React, { useState, useEffect } from "react";
import './home.css';
import axios from "axios";

function Home() {
    const [news, setNews] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");


    const api = async (searchQuery) => {
        try {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${searchQuery}&from=2023-09-25&sortBy=publishedAt&apiKey=67642d17ca0c4661bcca344740638380`);
            setNews(response.data.articles);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        api("tesla")
    }, []);

    const handleSearch = () => {
        api(searchQuery);
    }

    return (
        <div>
            <h1>News App</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className="news-container">
            
                {news.map((newsArticle, index) => {
                    const {  title, description, url, urlToImage } = newsArticle;

                    return (
                        <div key={index} className="news-card">
                            <img src={urlToImage} className="news-image" alt={title} />
                            <div className="news-content">
                                <h2>{title}</h2>
                                <p>{description}</p>
                                <a href={url} target="_blank" rel="noopener noreferrer" className="read-more">Read More</a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Home
