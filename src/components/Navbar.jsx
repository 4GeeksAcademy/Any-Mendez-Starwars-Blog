import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	const removeFavorite = (name) => {
		dispatch ({ type: "remove_from_favorite", payload: name });
	};

	return (
		<nav className="navbar navbar-light bg-light px-4">
			<div className="container">
				<Link to="/" className="navbar-brand">
					<img src="https://upload.wikimedia.org/wikipedia/commons/9/9b/Star_Wars_Yellow_Logo.svg" 
                        alt="Star Wars Logo"
                        height="40"
						style={{ filter: "invert(100%) grayscale(100%)" }}/>
				</Link>

				<div className="ml-auto">
					<div className="dropdown">
						<button 
						className="btn btn-primary dropdown-toggle d-flex align-items-center" 
						type="button" 
						data-bs-toggle="dropdown" 
						aria-expanded="false"
						>Favorites <span className="badge bg-secondary ms-2">{store.favorites.length}</span>
						</button>

						<ul className="dropdown-menu dropdown-menu-end">
							{store.favorites.length === 0 ? (<li className="dropdown-item text-muted">Empty</li>) : ( 
								store.favorites.map((favorite, index) => (
								<li key={favorite.name} className="dropdown-item favorite-item d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }} 
								onClick={() => removeFavorite(favorite.name)}>{favorite.name} <i 
								className="fa fa-trash text-danger trash-icon"
								style={{ cursor: "pointer"}}></i>
								</li>
							))
							)}
						</ul>
					</div>
				</div>
			</div>
		</nav>

	);
};

