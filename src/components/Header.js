import "./Header.css";

const Header = () => {
  return (
    <header className="header-main-nav">
      <div className="header-logo-wrapper">
        <a
          className="header-logo-link"
          href="https://arstechnica.com"
          rel="noopener noreferrer"
          target="_blank"
          title="Ars Technica Homepage">
          <span className="header-logo-icon"></span>
        </a>
      </div>
    </header>
  );
};

export default Header;
