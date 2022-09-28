import { ReactComponent as SearchIcon } from './search.svg';
import './SearchBox.css';

const SearchBox = ({ searchHandler }) => {
    const handleClick = (e) => {
        e.preventDefault();
    }

    const handleSearchInputChange = (e) => {
        searchHandler(e.target.value);
    };

    return (
        <form className="search">
            <input
                className="search-input"
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