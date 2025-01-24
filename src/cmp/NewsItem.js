// import PropTypes from 'prop-types'
import React from 'react'

const NewsItem = (props) => {
    let {title, description, urlToImage, newsUrl,author, date, source} = props;
    return (
      <div className='container my-3'>
        <div className="card">
        <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-success" style={{zIndex:1}}>
          {source}
          <span className="visually-hidden">unread messages</span>
        </span>
          <img src={urlToImage ==null ?"https://ichef.bbci.co.uk/news/1024/branded_news/50ac/live/15cb77b0-1dca-11ef-baa7-25d483663b8e.jpg":urlToImage} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted text-body-secondary">By {author} on {new Date(date).toDateString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }

export default NewsItem