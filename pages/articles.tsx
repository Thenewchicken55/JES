import React, { useState, useEffect } from "react";
import { header, footer } from "../app/globals.tsx";
import { fetchArticles } from "./_API_Methods.tsx";
import "@/app/globals.css";

export default function Articles() {
  interface Article {
    title: string;
    description: string;
    URL: string;
  }

  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArticles();
    //   console.log("Data:", data);
      if (data) {
        setArticles(data.category);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {header}
      <div className="articles-container">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="article">
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.URL} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            </div>
          ))
        ) : (
          <p>No articles found</p>
        )}
      </div>
      {footer}
    </div>
  );
}