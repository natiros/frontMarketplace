import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartShopping, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

library.add(faCartShopping, faSignOut);

export function Header({cart}){
    localStorage.setItem("cart", cart)

    const navigate = useNavigate()

    const Logout = () => {
      localStorage.removeItem("token");
      navigate(`/`, { replace: true });  
    }

    const Cart = () => {
      navigate(`/cart`, { replace: true });
    }

    return(
        <header>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg bg-body">
          <div className="container-fluid">
            <button data-mdb-collapse-init className="navbar-toggler" type="button" data-mdb-target="#navbarExample01" aria-controls="navbarExample01" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fas fa-bars" />
            </button>
            <div className="collapse navbar-collapse" id="navbarExample01">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item active">
                  <a className="nav-link" aria-current="page" href="/home">Inicio</a>
                </li>
                <li className="nav-item active">
                  <a className="nav-link" aria-current="page" href="/compras">Mis Compras</a>
                </li>
              </ul>
            </div>
            <button  type="button" className="btn btn-primary" onClick={() => Cart()}>
            <FontAwesomeIcon icon={faCartShopping}/>
            <span class="badge">{cart}</span>
            </button>
            <button  type="button" className="btn btn-link" onClick={() => Logout()}>
            <FontAwesomeIcon icon={faSignOut}/>
            </button>
          </div>
        </nav>
        {/* Navbar */}
        {/* Background image */}
        <div className="p-5 text-center bg-image" style={{backgroundImage: 'url("https://www.websoptimization.com/blog/media/posts/64/banner.jpg")', height: '400px'}}>
          <div className="mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
            <div className="d-flex justify-content-center align-items-center h-100">
              <div className="text-white">
              </div>
            </div>
          </div>
        </div>
        {/* Background image */}
      </header>
    )
}