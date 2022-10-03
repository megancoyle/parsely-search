import SearchResultCard from './SearchResultCard';
import './SearchResults.css';

const SearchResults = ({ results, searchQuery, sectionHandler }) => {
    if (results.length <= 0) {
        return (
            <p className="app-no-results">No results for this section.</p>
        )
    }

    return ( 
        <div className="search-results">
            {results.map((result, i) => {
                return <SearchResultCard key={i} result={result} searchQuery={searchQuery} sectionHandler={sectionHandler}/>
            })}
        </div>
    );
}

export default SearchResults;
