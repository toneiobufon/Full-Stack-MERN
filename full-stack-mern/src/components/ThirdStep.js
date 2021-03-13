import React, {useState, useEffect} from 'react';
import { Form, Button} from 'react-bootstrap';
import axios from 'axios';
import {BASE_API_URL} from '../utils/constants.js';
import csc from 'country-state-city';


const ThirdStep = (props) => {

    const [countries, setCountries] = useState([]);
    const [states, setStates] =useState([]);
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        const getCountries = async () => {
            try {
                setIsLoading(true);
                const result = await csc.getAllCountries();
                let allCountries = [];
                allCountries = result?.map(({ isoCode, name}) => ({
                    isoCode,
                    name
                }));
                const [{ isoCode: firstCountry} = {}] = allCountries;
                setCountries(allCountries);
                setSelectedCountry(firstCountry);
                setIsLoading(false);
                
            } catch(error){
                setCountries([]);
                setIsLoading(false);
            };
        };
        getCountries();
    },[]);

    useEffect(() => {
        const getStates = async () => {
            try {
            const result = await csc.getStatesOfCountry(selectedCountry);
            let allStates = [];
            allStates = result?.map(({ isoCode, name }) => ({
                isoCode,
                name
            }));
            console.log({ allStates });
            const [{ isoCode: firstState = '' } = {}] = allStates;
            setCities([]);
            setSelectedCity('');
            setStates(allStates);
            setSelectedState(firstState);
            } catch (error) {
            setStates([]);
            setCities([]);
            setSelectedCity('');
            }
        };
    
        getStates();
        }, [selectedCountry])

    useEffect(() => {
        const getCities = async () => {
        try {
            const result = await csc.getCitiesOfState(
                selectedCountry,
                selectedState
            );
            let allCities = [];
            allCities = result?.map(({ name }) => ({
                name
            }));
            const [{ name: firstCity = '' } = {}] = allCities;
            setCities(allCities);
            setSelectedCity(firstCity);
            } catch (error) {
            setCities([]);
            }
        };
    
        getCities();
        }, [selectedState]);

    const handleSubmit= async (event) =>{
        event.preventDefault();
    };

    return (
        <Form className='input-form' onSubmit={handleSubmit}>
            <div className= 'col-md-6 offset-md-3'>
                <Form.Group controlId = 'country'>
                    {isLoading && (
                        <p className='loading'>Countries are loading.....</p>
                    )}
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        as= 'select'
                        name='country'
                        value={selectedCountry}
                        onChange ={(event) => setSelectedCountry(event.target.value)}
                    >
                        {countries.map(({ isoCode, name})=> (
                            <option value={isoCode} key={isoCode}>
                                {name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId="state">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        as="select"
                        name="state"
                        value={selectedState}
                        onChange={(event) => setSelectedState(event.target.value)}
                    >
                        {states.length > 0 ? (
                            states.map(({ isoCode, name }) => (
                                <option value={isoCode} key={isoCode}>
                                    {name}
                                </option>
                            ))
                        ) : (
                            <option value="" key="">
                                No states in this country
                            </option>
                        )}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        as="select"
                        name="city"
                        value={selectedCity}
                        onChange={(event) => setSelectedCity(event.target.value)}
                    >
                        {cities.length > 0 ? (
                            cities.map(({ name }) => (
                                <option value={name} key={name}>
                                    {name}
                                </option>
                            ))
                        ) : (
                            <option value="">No cities found</option>
                        )}
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>

            </div>
        </Form>
    );
};

export default ThirdStep;