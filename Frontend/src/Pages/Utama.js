import React from 'react';
import { Routes ,Route } from 'react-router-dom';

import Login from "./Login"
import Paket from "./Paket"
import Member from "./Member"
import Transaksi from "./Transaksi"
import Choose from "./Choose"
import Home from "./Home"
import User from "./User"
import Outlet from "./Outlet"
import Cart from "./Cart"
import Detail_Transaksi from "./Detail_Transaksi"
import Cetak from "./Cetak"
import ChoosePaket from "./ChoosePaket"
import TransaksiOwner from "./TransaksiOwner"

const Utama = () => (
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/User" element={<User/>}/>
        <Route path="/Outlet" element={<Outlet/>}/>
        <Route path="/Member" element={<Member/>}/>
        <Route path="/Paket" element={<Paket/>}/>
        <Route path="/Cart" element={<Cart/>}/>
        <Route path="/Choose" element={<Choose/>}/>
        <Route path="/Detail_Transaksi" element={<Detail_Transaksi/>}/>
        <Route path="/Transaksi" element={<Transaksi/>}/>
        <Route path="/Cetak" element={<Cetak/>}/>
        <Route path="/ChoosePaket" element={<ChoosePaket/>}/>
        <Route path="/TransaksiOwner" element={<TransaksiOwner/>}/>
        <Route path="/login" element={<Login/>}/>
    </Routes>
)

export default Utama;