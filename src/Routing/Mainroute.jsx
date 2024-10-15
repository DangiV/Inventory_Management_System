import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../component/Home'
import TableData from '../component/TableData'

const Mainroute = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} /> 
                <Route path='/tableData' element={<TableData />} /> 
            </Routes>
        </>
    )
}

export default Mainroute;
