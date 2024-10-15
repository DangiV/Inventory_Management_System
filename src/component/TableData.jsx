import React, { useState } from 'react'
import CallApi from '../Helper/ApiCall'
import { useEffect } from 'react';

const TableData = () => {
    const [tableList, setTableList] = useState([]);

    const gettableData = async () => {
        try {
            const response = await CallApi("Get", 'https://apis-technical-test.conqt.com/Api/Item-Supplier/Get-All-Items');
            console.log("response for table", response.data.data);
            setTableList(response.data.data.items)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        gettableData()
    }, [])
    return (
        <div className='container mt-3'>
            <h3>Uploaded Data </h3>
            <table className="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th scope="col">Supplier</th>
                        <th scope="col">item Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">City</th>
                        <th scope="col">Country</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th>
                    </tr>
                </thead>
                <tbody>


                    {tableList.map((item) => {
                        return (
                            <tr key={item.itemId}>
                                <td >{item.Supplier?.supplierName || 'N/A'}</td>
                                <td>{item.itemName}</td>
                                <td>{item.quantity}</td>
                                <td >{item.Supplier?.cityName || 'N/A'}</td>
                                <td >{item.Supplier?.countryName || 'N/A'}</td>
                                <td >{item.Supplier?.email || 'N/A'}</td>
                                <td >{item.Supplier?.phoneNumber || 'N/A'}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>

        </div>
    )
}

export default TableData
