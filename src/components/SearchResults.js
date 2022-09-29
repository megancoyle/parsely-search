import SearchResultCard from './SearchResultCard';
import './SearchResults.css';

const SearchResults = ({ results }) => {
    return ( 
        <div className="search-results">
            {results.map((result, i) => {
                return <SearchResultCard key={i} result={result}/>
            })}
        </div>
    );
}

export default SearchResults;
