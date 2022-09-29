import { ReactComponent as SearchIcon } from './search.svg';
import './SearchBox.css';

const SearchBox = ({ searchHandler }) => {

    const handleClick = (e) => {
        const searchQuery = document.getElementById('search-input').value;
        e.preventDefault();
        
        if (searchQuery !== '') {
            searchHandler(searchQuery);
        }
    }

    const handleSearchInputChange = (e) => {
        // TODO: update this with autopopulated results
        // searchHandler(e.target.value);
    };

    return (
        <form className="search">
            <input
                id="search-input"
                onChange={handleSearchInputChange}
                type="text"
                placeholder="Search..."
            />
            <button className="search-button" onClick={handleClick}>
                <SearchIcon/>
            </button>
        </form>
    );
}

export default SearchBox;
