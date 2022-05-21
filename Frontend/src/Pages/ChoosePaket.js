import React from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import ChoosePakList from "../Component/ChoosePaketList";
import HeaderAdmin from '../Component/Header/HeaderAdmin';
import HeaderKasir from '../Component/Header/HeaderKasir';
import HeaderOwner from '../Component/Header/HeaderOwner';

export default class Paket extends React.Component {
    constructor() {
        super()
        this.state = {
            pakets: [],
            outlets: [],
            id_paket: "",
            id_outlet: "",
            jenis: "",
            nama_paket: "",
            harga: "",
            image: null,
            isModalOpen: false,
            action: ""
        }
        if (localStorage.getItem("token")) {//pengecekan ada token apa tidak
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
            this.state.token = localStorage.getItem("token")
            this.state.role = localStorage.getItem('role')
            this.state.id_outlet = localStorage.getItem('outlet')           
        } else {
            window.location = "/login"
        }

    }

    headerConfig = () => {
        let header = {
            headers: {Authorization : `Bearer ${this.state.token}`}
        }
        return header
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleFile = (e) => {
        this.setState({
            image: e.target.files[0] //up 1 file saja
        });
    }

    handleClose = () => {
        this.setState({
            isModalOpen: false
        });
    }

    getPaket = () => {
        let paket = (localStorage.getItem("nama_paket"))
        let url = "http://localhost:8080/paket/byOutlet/" + this.state.id_outlet 

        axios.get(url, this.headerConfig())
        
            .then(res => {
                this.setState({
                    pakets: res.data.paket,
                })
            })
            .catch(err => {
                console.log(paket)
            })       
    }

    getOutlet = () => {
        let url = "http://localhost:8080/outlet"

        axios.get(url, this.headerConfig())
        
            .then(res => {
                this.setState({
                    outlets: res.data.outlet,
                    // custCount: res.data.count
                })
            })
            .catch(err => {
                console.log(err.message)
            })
            
    }

    searching = event => {
        if(event.keyCode === 13){
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempPaket = this.state.pakets
            let result = tempPaket.filter(item => {
                return item.nama_paket.toLowerCase().includes(keyword) 
            })
            this.setState({pakets: result})
        }
    }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getPaket()
        this.getOutlet()
    }

    addToCart = (selectedItem) => {
        // membuat sebuah variabel untuk menampung cart sementara
        let tempCart = []
        // cek eksistensi dari data cart pada localStorage
        if(localStorage.getItem("cart") !== null){
            tempCart = JSON.parse(localStorage.getItem("cart"))
            // JSON.parse() digunakan untuk mengonversi dari string -> array object
        }
        // cek data yang dipilih user ke keranjang belanja
        let existItem = tempCart.find(item => item.id_paket === selectedItem.id_paket)
        if(existItem){
            // jika item yang dipilih ada pada keranjang belanja
            window.alert(`Anda telah memilih ${selectedItem.nama_paket}`)
        }else{
            // user diminta memasukkan jumlah item yang dibeli
            let promptJumlah = window.prompt(`Masukkan jumlah ${selectedItem.nama_paket} yang beli`,"")
            if(promptJumlah !== null && promptJumlah !== ""){
                // jika user memasukkan jumlah item yg dibeli
                // menambahkan properti "jumlahBeli" pada item yang dipilih
                selectedItem.qty = promptJumlah
                // masukkan item yg dipilih ke dalam cart
                tempCart.push(selectedItem)
                // simpan array tempCart ke localStorage
                localStorage.setItem("cart", JSON.stringify(tempCart))
            }
        }
    }

    render() {
        return (
            <div>
                 {this.state.role == "admin" &&
                            <HeaderAdmin />
                        }
                {this.state.role == "kasir" &&
                            <HeaderKasir />
                        }
                {this.state.role == "owner" &&
                    <HeaderOwner />
                }
                <div className="container">
                <br></br>
                    <input type="text" className="form-control my-2" placeholder="Pencarian" value={this.state.keyword} onChange={ev => this.setState({keyword: ev.target.value})} onKeyUp={ev => this.searching(ev)}/>
                    <div className="back">
                <div className="container">
                    <div className="row">
                        {this.state.pakets.map((item, index) => {
                            return (
                                <ChoosePakList key={index}
                                    nameImage={item.image}//nma file ngambil dari database
                                    image={"http://localhost:8080/image/paket/" + item.image}//nama file link dari url
                                    jenis={item.jenis}
                                    id_outlet={item.id_outlet}
                                    nama_paket={item.nama_paket}
                                    harga={item.harga}
                                    onCart={() => this.addToCart(item)}
                                />
                            )
                        })}
                    </div>
                </div>
                </div>
                </div>
                </div>
        )
    }

}