import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import PeopleCard from "../components/PeopleCard.jsx";
import PlanetCard from "../components/PlanetCard.jsx";
import VehicleCard from "../components/VehicleCard.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const getPeople = async () => {

		try {

			const response = await fetch("https://www.swapi.tech/api/people");

			if (!response.ok) {
				throw new Error("Se produjo un error al consultar el endpoint 'people'");
			}

			const data = await response.json();

			dispatch({ type: "set_people", payload: data.results })

		} catch (error) {
			console.log(error);
		}
	};

	const getPlanets = async () => {

		try {

			const response = await fetch("https://www.swapi.tech/api/planets");

			if (!response.ok) {
				throw new Error("Se produjo un error al consultar el endpoint 'planets'");
			}

			const data = await response.json();

			dispatch({ type: "set_planets", payload: data.results });

		} catch (error) {
			console.log(error);
		}
	};

	const getVehicles = async () => {

		try {

			const response = await fetch("https://www.swapi.tech/api/vehicles");

			if (!response.ok) {
				throw new Error("Se produjo un error al consultar el endpoint 'vehicles'");
			}

			const data = await response.json();

			dispatch({ type: "set_vehicles", payload: data.results })

		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getPeople();
		getPlanets();
		getVehicles();

	}, []);
	return (
		<div className="container text mt-5 mb-5">

			<h2 className="text-danger">Characters</h2>
			<div className="scroll-container mt-5">
				<div className="d-flex flex-row overflow-x-auto">
					{store.people.map((item, index) => {
						return <PeopleCard key={item.uid} item={item} />
					})}
				</div>
			</div>

			<h2 className="text-danger mt-5">Planets</h2>
			<div className="scroll-container mt-5">
				<div className="d-flex flex-row overflow-x-auto">
					{store.planets.map((item, index) => {
						return <PlanetCard key={item.uid} item={item} />
					})}
				</div>
			</div>

			<h2 className="text-danger mt-5">Vehicles</h2>
			<div className="scroll-container mt-5">
				<div className="d-flex flex-row overflow-x-auto">
					{store.vehicles.map((item,index)=>{
						return <VehicleCard key={item.uid}item={item}/>
					})}
				</div>
			</div>

		</div>
	);
}; 
