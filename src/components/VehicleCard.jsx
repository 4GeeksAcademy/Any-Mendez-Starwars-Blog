import React from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


const VehicleCard = ({ item }) => {
    
    const { store, dispatch } = useGlobalReducer();
    const [vehicle, setVehicle] = useState({});
    const getVehicleDetail = async () => {
        
        try {
            const response = await fetch("https://www.swapi.tech/api/vehicles/" + item.uid);
            
            if(!response.ok) {
                throw new Error("Se produjo un error al consultar el endpoint 'vehicles/:uid'");                
            }

            const data = await response.json();
            setVehicle(data.result.properties);
        }catch (error){
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
        getVehicleDetail();
    }, []);

    return (
        <div className="container">
            <div className="card" style={{ width: "18rem" }}>
                <img src={imagenUrl} className="card-im-top" alt={item.name} />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Model: {vehicle.model}</p>
                    <p className="card-text">Manufacturer: {vehicle.manufacturer}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to={`/vehicle/${item.uid}`} className='btn btn-primary'>Learn more!</Link>
                        <i className={`fa-heart ${isFavorite ? 'fa-solid text-danger' : 'fa-regular text-dark'}`}
                            onClick={checkFavorite} style={{ cursor: 'pointer', fontSize: '1.5rem' }}>
                        </i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;