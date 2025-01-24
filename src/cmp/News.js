// import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  const capitalizeLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.myApiKEY}&page=${page}&pageSize=${props.pageSize}`;
    //setLoading(true);
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeLetter(props.category)} - GetNews.com`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.myApiKEY}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
  };
  return (
    <>
      <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>
        Top Headlines From {capitalizeLetter(props.category)}
      </h1>
      {loading}
      <InfiniteScroll
        next={fetchMoreData}
        dataLength={Array.isArray(articles) ? articles.length : 0}
        hasMore={Array.isArray(articles) ? articles.length : 0 !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {Array.isArray(articles) && articles.length > 0 ? (
              articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    source={element.source.name}
                    title={element.title ? element.title.slice(0, 40) : ""}
                    author={!element.author ? "Unknown" : element.author}
                    date={element.publishedAt}
                    description={element.description ? element.description.slice(0, 88) : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              ))
            ) : (
              <Spinner /> // Show loading message if articles are not available yet
            )}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

News.defaultPropTypes = {
  country: "in",
  pageSize: 6,
  category: "business",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  myApiKEY: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,

};

export default News;
