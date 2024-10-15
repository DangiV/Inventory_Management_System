import { Box, Button, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CallApi from '../Helper/ApiCall';

const SupplierForm = () => {
    const [data, setData] = useState({
        SupplierName: "",
        unitPrice: "",
        phonenumber: "",
        email: ""
    });

    const [countryId, setSelectedCountryId] = useState(null);
    const [stateId, setSelectedstateId] = useState(null);
    const [cityList, setCityLlist] = useState([]);

    const [country, setCountry] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [errors, setErrors] = useState({});

    const valueChange = (e) => {
        const { name, value } = e.target;
        setData((prevVal) => ({
            ...prevVal,
            [name]: value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ""
        }));
    };

    const handleChangeCountry = (event) => {
        const selectedId = event.target.value;
        setSelectedCountryId(selectedId);
        setState('');
        setCity('');
    };

    const handleChangeState = (event) => {
        setState(event.target.value);
        setSelectedstateId(event.target.value)
    };

    const handleChangeCity = (event) => {
        setCity(event.target.value);
    };

    const CountryList = async () => {
        try {
            const response = await CallApi("Get", "https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-CountryList");
            console.log("Countries response", response.data.data.countyList);
            setCountry(response.data.data.countyList);
        } catch (error) {
            console.log("Error fetching countries:", error);
        }
    };

    const StateList = async () => {
        if (!countryId) return;
        try {
            const response = await CallApi("Get", `https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-SateList-By-Country?countryId=${countryId}`);
            console.log("States response", response.data.data);
            setStateList(response.data.data.stateList);
        } catch (error) {
            console.log("Error fetching states:", error);
        }
    };


    const CityList = async () => {
        if (!countryId && !stateId) return;
        try {
            const response = await CallApi("Get", `https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-CityList-By-Country-State?countryId=${countryId}&stateId=${stateId}`)
            console.log("city response ", response.data.data.cityList)
            setCityLlist(response.data.data.cityList)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        CountryList();
    }, []);

    useEffect(() => {
        StateList();
    }, [countryId]);

    useEffect(() => {
        CityList();
    }, [countryId, stateId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!data.SupplierName) {
            newErrors.SupplierName = "Supplier Name is required.";
        } else if (data.SupplierName.length > 225) {
            newErrors.SupplierName = "Please enter less than 225 characters.";
        }

        if (!countryId) {
            newErrors.country = "Select Country.";
        }

        if (!state) {
            newErrors.state = "Select State.";
        }

        if (!city) {
            newErrors.city = "Select City.";
        }

        const validateEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        if (!email) {
            newErrors.email = "Enter an email.";
        } else if (!validateEmail(email)) {
            newErrors.email = "Enter a valid email.";
        }

        if (!phonenumber) {
            newErrors.phonenumber = "Select Phone Number.";
        } else if (phonenumber.length !== 10) {
            newErrors.phonenumber = "enter correct Phone Number.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        console.log("Form submitted", { ...data, countryId, state, city });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2 className='text-center'>Supplier Details</h2>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} style={{ backgroundColor: '#EBEEFD' }} className='mt-2'>
                        <Grid item xs={6}>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="SupplierName">Supplier Name</label>
                                <input type="text" className="form-control p-3" placeholder='enter Supplier Name' id="SupplierName" name='SupplierName' value={data.SupplierName} onChange={valueChange} />
                                {errors.SupplierName && <div style={{ color: 'red' }}>{errors.SupplierName}</div>}
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="country">Country</label>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="country">Country</InputLabel>
                                        <Select
                                            labelId="country"
                                            id="country"
                                            value={countryId || ""}
                                            label="Country"
                                            onChange={handleChangeCountry}
                                        >
                                            {country.map((item) => (
                                                <MenuItem key={item.countryId} value={item.countryId}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                {errors.country && <div style={{ color: 'red' }}>{errors.country}</div>}
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="state">State</label>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="state">State</InputLabel>
                                        <Select
                                            labelId="state"
                                            id="state"
                                            value={state}
                                            label="State"
                                            onChange={handleChangeState}
                                        >
                                            {stateList.map((item) => (
                                                <MenuItem key={item.stateId} value={item.stateId}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                {errors.state && <div style={{ color: 'red' }}>{errors.state}</div>}
                            </div>


                        </Grid>
                        <Grid item xs={6}>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="email">Email Address</label>
                                <input type="email" className="form-control p-3" placeholder='enter Email' id="email" name='email' value={data.email} onChange={valueChange} />
                                {errors.unitPrice && <div style={{ color: 'red' }}>{errors.unitPrice}</div>}
                            </div>


                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="phonenumber">Phone Number</label>
                                <input type="text" className="form-control p-3" placeholder='enter Phone Number' id="phonenumber" name='phonenumber' value={data.phonenumber} onChange={valueChange} />
                                {errors.phonenumber && <div style={{ color: 'red' }}>{errors.phonenumber}</div>}
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="city">City</label>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="city">City</InputLabel>
                                        <Select
                                            labelId="city"
                                            id="city"
                                            value={city}
                                            label="City"
                                            onChange={handleChangeCity}
                                        >
                                            {cityList.map((item) => (
                                                <MenuItem key={item.cityId} value={item.name}>{item.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                {errors.city && <div style={{ color: 'red' }}>{errors.city}</div>}
                            </div>
                        </Grid>
                    </Grid>
                </Box>

                <div className='d-flex justify-content-center mt-3'>
                    <Button variant="contained" color="primary" type="submit">Submit</Button>
                </div>
            </form>
        </>
    );
};

export default SupplierForm;
