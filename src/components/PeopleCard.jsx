import React from 'react'
import useGlobalReducer from '../hooks/useGlobalReducer';
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';


const PeopleCard = ({ item }) => {

    const { store, dispatch } = useGlobalReducer();
    const [person, setPerson] = useState({});
    const getPersonDetail = async () => {

        try {

            const response = await fetch("https://www.swapi.tech/api/people/" + item.uid);

            if (!response.ok) {
                throw new Error("Se produjo un error al consultar el endpoint 'people/:uid'");
            }

            const data = await response.json();

            setPerson(data.result.properties);

        } catch (error) {
            console.log(error);
        }
    };

    const isFavorite = store.favorites.some(fav => fav.name === item.name);

    const checkFavorite = () => {
        if (isFavorite) {
            dispatch({ type: 'remove_from_favorite', payload: item.name });
        }else {
            dispatch({ type: 'add_to_favorite', payload: { uid: item.uid, name: item.name} });
        }
    };

    const imageUrl = `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${item.uid}.jpg`;
    useEffect(() => {
            getPersonDetail();
    
        }, []);

    return (
        <div className="container">
            <div className="card" style={{ width: "18rem" }}>
                <img src={imageUrl} className="card-im-top" alt={item.name} style={{ height: '200px' }} />
                <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text text-nowrap">Gender: {person.gender}</p>
                    <p className="card-text text-nowrap">Hair Color: {person.hair_color}</p>
                    <p className="card-text text-nowrap">Eye Color: {person.eye_color}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <Link to={`/item/${item.uid}`} className='btn btn-outline-primary custom-btn'>Learn more!</Link>
                        <i className={`fa-heart ${isFavorite ? 'fa-solid text-warning' : 'fa-regular custom-heart text-warning'}`} 
                        onClick={checkFavorite} style={{ cursor: 'pointer', fontSize: '1.5rem' }}>
                        </i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PeopleCard;
