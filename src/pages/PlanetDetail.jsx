import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";

export const PlanetDetail = () => {
    const params = useParams()
    const [planet, setPlanet] = useState({});


    const getPlanetDetail = async () => {

        try {

            const response = await fetch("https://www.swapi.tech/api/planets/" + params.uid);

            if (!response.ok) {
                throw new Error("Se produjo un error al consultar el endpoint 'planets/:uid'");
            }

            const data = await response.json();

            setPlanet(data.result);

        } catch (error) {
            console.log(error);
        }
    };

    const imageUrl = `https://picsum.photos/300/500?random=${planet.uid}`;

    useEffect(() => {
        getPlanetDetail();

    }, []);
    return (
        <div className="container justify-content-center text-align-center">
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={imageUrl} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{planet.properties?.name}</h5>
                            <p className="card-text">{planet.description} <br/>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel minus nihil impedit a ducimus maiores vitae ipsam, fugit est eveniet delectus dolorem commodi recusandae magnam saepe quae expedita. Harum dolor sed quo magnam repellat, consequuntur ducimus illo ab fugit corporis, suscipit, aperiam nam error vel quia alias aspernatur nostrum dicta!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container text-danger ">
                <hr/>
                <table className="table table-borderless text-danger">
                    <thead className='text-danger'>
                        <tr className='text-danger'>
                            <th className='text-danger'>
                                Name
                            </th>
                            <th className='text-danger'>
                                Climate
                            </th>
                            <th className='text-danger'>
                                Population
                            </th>
                            <th className='text-danger'>
                                Orbital Period
                            </th>
                            <th className='text-danger'>
                                Diameter
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-danger'>
                        <tr className='text-danger'>
                            <td className='text-danger'>
                                {planet.properties?.name}
                            </td>
                            <td className='text-danger'>
                                {planet.properties?.climate}
                            </td>
                            <td className='text-danger'>
                                {planet.properties?.population}
                            </td>
                            <td className='text-danger'>
                                {planet.properties?.orbital_period}
                            </td>
                            <td className='text-danger'>
                                {planet.properties?.diameter}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}
