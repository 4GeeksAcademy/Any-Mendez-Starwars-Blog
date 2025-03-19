import React from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';


const PlanetCard = ({ item }) => {
    
    const { store, dispatch } = useGlobalReducer();
    const [planet, setPlanet] = useState({});
    const getPlanetDetail = async () => {

        try{
            const response = await fetch("https://www.swapi.tech/api/planets/" + item.uid);
            if (!response.ok) {
                throw new Error("Se produjo un error al consultar el endpoint 'planet/:uid'");
            }
            const data = await response.json();
            setPlanet(data.result.properties);
        }catch(error){
            console.log(error);
        }
    };

    const isFavorite = store.favorites.some(fav => fav.name === item.name);

    const checkFavorite = () => {
        if (isFavorite) {
            dispatch({ type: 'remove_from_favorite', payload: item, name });
        } else {
            dispatch({ type: 'add_to_favorite', payload: { uid: item.uid, name: item.name } });
        }
    };

    const imagenUrl = `https://picsum.photos/400/200?random=${item.uid}`;
    useEffect(() => {
        getPlanetDetail();
    }, []);
    
    return (
        <div className="container">
            <div className="card" style={{ width: "18rem" }}>
                <img src={imagenUrl} className="card-im-top" alt={item.name} style={{ height: '200px' }} />
                <div className="card-body" style={{ height: '200px' }}>
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text text-nowrap">Population: {planet.population}</p>
                    <p className="card-text text-nowrap">Terrain: {planet.terrain}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to={`/planet/${item.uid}`} className='btn btn-outline-primary custom-btn'>Learn more!</Link>
                        <i className={`fa-heart ${isFavorite ? 'fa-solid text-warning' : 'fa-regular custom-heart text-warning'}`}
                            onClick={checkFavorite} style={{ cursor: 'pointer', fontSize: '1.5rem' }}>
                        </i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanetCard;