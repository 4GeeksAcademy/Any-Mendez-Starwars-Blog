import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";

export const PersonDetail = () => {
    const params = useParams()
    const [person, setPerson] = useState({});


    const getPersonDetail = async () => {

        try {

            const response = await fetch("https://www.swapi.tech/api/people/" + params.uid);

            if (!response.ok) {
                throw new Error("Se produjo un error al consultar el endpoint 'people/:uid'");
            }

            const data = await response.json();

            setPerson(data.result);

        } catch (error) {
            console.log(error);
        }
    };

    const imageUrl = `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${params.uid}.jpg`;

    useEffect(() => {
        getPersonDetail();

    }, []);
    return (
        <div className="container">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-5">
                        <img src={imageUrl} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-7">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-5">{person.properties?.name}</h3>
                            <p className="card-text">{person.description} <br/>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel minus nihil impedit a ducimus maiores vitae ipsam, fugit est eveniet delectus dolorem commodi recusandae magnam saepe quae expedita. Harum dolor sed quo magnam repellat, consequuntur ducimus illo ab fugit corporis, suscipit, aperiam nam error vel quia alias aspernatur nostrum dicta!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container text-danger">
                <hr/>
                <table className="table table-borderless text-center text-danger mx-auto">
                    <thead className='text-danger'>
                        <tr className='text-danger'>
                            <th className='text-danger'>
                                Name
                            </th>
                            <th className='text-danger'>
                                Birth Year
                            </th>
                            <th className='text-danger'>
                                Gender
                            </th>
                            <th className='text-danger'>
                                Height
                            </th>
                            <th className='text-danger'>
                                Skin Color
                            </th>
                            <th className='text-danger'>
                                Eye Color
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-danger'>
                        <tr className='text-danger'>
                            <td className='text-danger'>
                                {person.properties?.name}
                            </td>
                            <td className='text-danger'>
                                {person.properties?.birth_year}
                            </td>
                            <td className='text-danger'>
                                {person.properties?.gender}
                            </td>
                            <td className='text-danger'>
                                {person.properties?.height}
                            </td>
                            <td className='text-danger'>
                                {person.properties?.skin_color}
                            </td>
                            <td className='text-danger'>
                                {person.properties?.eye_color}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}
