import React, {useState, useEffect} from 'react';
import { Form, Button} from 'react-bootstrap';
import axios from 'axios';
import {BASE_API_URL} from '../utils/constants.js';
import csc from 'country-state-city';


const ThirdStep = (props) => {

    const [countries, setCounties] = useState([]);
    const [states, setState] =useState([]);
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedCounty, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        const getCountries = async () => {
            try {
                const result = await csc.getAllCountries();
                console.log(result);
            } catch(error){}
        };

        getCountries();
        
    },[]);

    const handleSubmit= async (event) =>{
        event.preventDefault();
    };

    return (
        <Form className='input-form' onSubmit={handleSubmit}>
            <div className= 'col-md-6 offset-md-3'></div>
        </Form>
    );
};

export default ThirdStep;