import './header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <Link className="logo" to="/">Vitor Flix</Link>
            <Link className="favoritos" to="/favoritos">My Movies</Link>
        </header>
    );
}

export default Header;
