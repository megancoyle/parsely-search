import './SearchResultCard.css';

const SearchResultCard = ({ result }) => {
    const {date, description, section, thumbnail, title, url} = result;

    return ( 
        <div 
            className="search-result-card"
        >
            <a className="search-result-title-link" href={url} target="_blank" rel="noreferrer">
                <h2 className="search-result-title">
                    {title}
                </h2>
            </a>
            <a href={url} target="_blank" rel="noreferrer">
                <img className="search-result-thumbnail" src={thumbnail} alt={title}/>
            </a>
            <p className="search-result-description">
                <span className="search-result-name">
                    {date} 
                </span> 
                ... {description}
            </p>
            <p className="search-result-label">Labeled {section}</p>
        </div>
    );
}

export default SearchResultCard;
