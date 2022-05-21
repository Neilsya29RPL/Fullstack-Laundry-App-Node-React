import React from "react";
import axios from "axios";
import TranList from "../Component/Choose_List";
import { Modal, Button, Form } from "react-bootstrap";
import HeaderAdmin from '../Component/Header/HeaderAdmin';
import HeaderKasir from '../Component/Header/HeaderKasir';
import HeaderOwner from '../Component/Header/HeaderOwner';

export default class Member extends React.Component {
    constructor() {
        super()
        this.state = {
            members: [],
            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: "",
            image: null,//karena objek jadi pake null
            isModalOpen: false,
            action: ""

        }
        if (localStorage.getItem("token")) {//pengecekan ada token apa tidak
            //token dibutuhkan setiap saat mau ngakses API, token diambil dari local storage, data login disimpan ke local storage
            if (localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "kasir"){
                this.state.token = localStorage.getItem("token")
                this.state.role = localStorage.getItem('role')
            } else {
                window.alert("Anda bukan Admin atau Kasir")
                window.location = "/"
            }
            
        } else {
            window.location = "/login"
        }
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

    getMember = () => {
        let member = (localStorage.getItem("nama"))
        let url = "http://localhost:8080/member"
        axios.get(url)
            .then(res => {
                this.setState({
                    members: res.data.member,
                })
            })
            .catch(err => {
                console.log(err.message)
            })
        console.log(member)
    }

    handleSave = (e) => {
        e.preventDefault()
        let form =  new FormData()//
        form.append("nama",this.state.nama)
        form.append("alamat",this.state.alamat)
        form.append("jenis_kelamin",this.state.jenis_kelamin)
        form.append("tlp",this.state.tlp)
        form.append("image",this.state.image)

        let url = ""
        if (this.state.action === "insert"){
            url = "http://localhost:8080/member"
            axios.post(url, form)
            .then(res => {
                console.log(res.data.message)
                this.getMember()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }else if (this.state.action === "update") {
            url = "http://localhost:8080/member/" + this.state.id_member
            axios.put(url, form)
            .then(res => {
                console.log(res.data.message)
                this.getMember()
                this.handleClose()
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }

    choose= item => {
        if (window.confirm(`Choose ${item.nama} ?`)){
            localStorage.setItem("id_member", item.id_member)
            localStorage.setItem("nama_member", item.nama)
            window.location = "/ChoosePaket"
        }
    }

    searching = event => {
        if(event.keyCode === 13){
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempMember = this.state.members
            let result = tempMember.filter(item => {
                return item.nama.toLowerCase().includes(keyword) 

            })
            this.setState({members: result})
        }
    }

    componentDidMount = () => {//dijalankan setelah constructor untuk emnjalan get admin karena fungsi tersebut tak ada aksi seperti button
        this.getMember()
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
                <div className="back">
                <div className="container">
                <br></br>
                    <input type="text" className="form-control my-2" placeholder="Pencarian" value={this.state.keyword} onChange={ev => this.setState({keyword: ev.target.value})} onKeyUp={ev => this.searching(ev)}/>
                    <div className="row">
                        {this.state.members.map((item, index) => {
                            return (
                                <TranList key={index}
                                    nameImage={item.image}//nma file ngambil dari database
                                    image={"http://localhost:8080/image/member/" + item.image}//nama file link dari url
                                    nama={item.nama}
                                    alamat={item.alamat}
                                    jenis_kelamin={item.jenis_kelamin}
                                    tlp= {item.tlp}
                                    onChoose = {() => this.choose(item)}
                                />
                            )
                        })}
                    </div>
                </div>
                </div>
            </div>
        )
    }
}