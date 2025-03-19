import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from "react";

export const VehicleDetail = () => {
    const params = useParams()
    const [vehicle, setVehicle] = useState({});


    const getVehicleDetail = async () => {

        try {

            const response = await fetch("https://www.swapi.tech/api/vehicles/" + params.uid);

            if (!response.ok) {
                throw new Error("Se produjo un error al consultar el endpoint 'vehicles/:uid'");
            }

            const data = await response.json();

            setVehicle(data.result);

        } catch (error) {
            console.log(error);
        }
    };

    const imageUrl = `https://picsum.photos/300/500?random=${vehicle.uid}`;

    useEffect(() => {
        getVehicleDetail();

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
                            <h3 className="card-title text-center mb-5">{vehicle.properties?.name}</h3>
                            <p className="card-text">{vehicle.description} <br/>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel minus nihil impedit a ducimus maiores vitae ipsam, fugit est eveniet delectus dolorem commodi recusandae magnam saepe quae expedita. Harum dolor sed quo magnam repellat, consequuntur ducimus illo ab fugit corporis, suscipit, aperiam nam error vel quia alias aspernatur nostrum dicta!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container text-danger ">
                <hr/>
                <table className="table table-borderless text-center text-danger mx-auto">
                    <thead className='text-danger'>
                        <tr className='text-danger'>
                            <th className='text-danger'>
                                Name
                            </th>
                            <th className='text-danger'>
                                Passengers
                            </th>
                            <th className='text-danger'>
                                Cargo Capacity
                            </th>
                            <th className='text-danger'>
                                Model
                            </th>
                            <th className='text-danger'>
                                Manufacturer
                            </th>
                            <th className='text-danger'>
                                Vehicle Class
                            </th>
                        </tr>
                    </thead>
                    <tbody className='text-danger'>
                        <tr className='text-danger'>
                            <td className='text-danger'>
                                {vehicle.properties?.name}
                            </td>
                            <td className='text-danger'>
                                {vehicle.properties?.passengers}
                            </td>
                            <td className='text-danger'>
                                {vehicle.properties?.cargo_capacity}
                            </td>
                            <td className='text-danger'>
                                {vehicle.properties?.model}
                            </td>
                            <td className='text-danger'>
                                {vehicle.properties?.manufacturer}
                            </td>
                            <td className='text-danger'>
                                {vehicle.properties?.vehicle_class}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}
