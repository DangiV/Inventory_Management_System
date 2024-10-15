import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CallApi from '../Helper/ApiCall';

const ItemForm = () => {

    const [data, setData] = useState({
        itemName: "",
        unitPrice: "",
        quantity: "",
        submissionDate: null
    });
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

    const handleDateChange = (newValue) => {
        const today = dayjs();
        if (newValue && newValue.isBefore(today, 'day')) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                submissionDate: "You cannot select a past date."
            }));
            setData((prevVal) => ({
                ...prevVal,
                submissionDate: null
            }));
        } else {
            setData((prevVal) => ({
                ...prevVal,
                submissionDate: newValue.format('MM/DD/YY')
            }));
            setErrors((prevErrors) => ({
                ...prevErrors,
                submissionDate: ""
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!data.itemName) {
            newErrors.itemName = "Item Name is required.";
        } else if (data.itemName.length > 250) {
            newErrors.itemName = "Please enter less than 250 characters.";
        }

        if (!data.unitPrice) {
            newErrors.unitPrice = "Unit Price is required.";
        }

        if (!data.quantity) {
            newErrors.quantity = "Quantity is required.";
        }

        if (!data.submissionDate) {
            newErrors.submissionDate = "Date of Submission is required.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const formData = await CallApi('Post', "https://apis-technical-test.conqt.com/Api/Item-Supplier/Save-Items-Suppliers", data);
            console.log("api call here", formData);
        } catch (error) {
            console.log('error', error)
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2 className='text-center'>Item Details</h2>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} style={{ backgroundColor: '#EBEEFD' }} className='mt-2'>
                        <Grid item xs={6}>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="itemName">Item Name</label>
                                <input type="text" className="form-control p-3" placeholder='enter Item Name' id="itemName" name='itemName' value={data.itemName} onChange={valueChange} />
                                {errors.itemName && <div style={{ color: 'red' }}>{errors.itemName}</div>}
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="unitPrice">Unit Price</label>
                                <input type="text" className="form-control p-3" placeholder='enter Unit Price' id="unitPrice" name='unitPrice' value={data.unitPrice} onChange={valueChange} />
                                {errors.unitPrice && <div style={{ color: 'red' }}>{errors.unitPrice}</div>}
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="quantity">Quantity</label>
                                <input type="text" className="form-control p-3" placeholder='enter Quantity' id="quantity" name='quantity' value={data.quantity} onChange={valueChange} />
                                {errors.quantity && <div style={{ color: 'red' }}>{errors.quantity}</div>}
                            </div>

                            <div className="form-outline mb-4">
                                <label className="form-label">Date of Submission</label>
                                <DatePicker fullWidth sx={{ width: '630px' }}
                                    value={data.submissionDate ? dayjs(data.submissionDate, 'MM/DD/YY') : null}
                                    onChange={handleDateChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                {errors.submissionDate && <div style={{ color: 'red' }}>{errors.submissionDate}</div>}
                            </div>
                        </Grid>
                    </Grid>
                </Box>

                <div className='d-flex justify-content-center'>
                    <Button variant="contained" color="primary" type="submit" className='mt-4'>
                        Submit
                    </Button>
                </div>
            </form>
        </>
    )
}

export default ItemForm