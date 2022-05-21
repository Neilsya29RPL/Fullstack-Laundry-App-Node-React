import React from "react";
import axios from "axios";
import MembList from "../Component/MemberList";
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

    addMember = () => {
        this.setState({
            isModalOpen: true,
            id_member: "",
            nama: "",
            alamat: "",
            jenis_kelamin: "",
            tlp: "",
            image: null,
            action: "insert"
        });
    }

    handleEdit = (item) => {
        this.setState({
            isModalOpen: true,
            id_member: item.id_member,
            nama: item.nama,
            alamat: item.alamat,
            jenis_kelamin: item.jenis_kelamin,
            tlp: item.tlp,
            image: item.image,
            action: "update"
        })
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

    handleDel = (id_member) => {
        let url = "http://localhost:8080/member/" + id_member
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            axios.delete(url)
                .then(res => {
                    console.log(res.data.message)
                    this.getMember()
                    // this.handleClose()
                })
                .catch(err => {
                    console.log(err.message)
                })
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
                                <MembList key={index}
                                    nameImage={item.image}//nma file ngambil dari database
                                    image={"http://localhost:8080/image/member/" + item.image}//nama file link dari url
                                    nama={item.nama}
                                    alamat={item.alamat}
                                    jenis_kelamin={item.jenis_kelamin}
                                    tlp= {item.tlp}
                                    onEdit={() => this.handleEdit(item)}
                                    onDel={() => this.handleDel(item.id_member)}
                                />
                            )
                        })}
                    </div>
                    <button className="btn btn-dark" onClick={() => this.addMember()}>
                    Add Member
                    </button><br />

                    <Modal  show={this.state.isModalOpen} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Form Member</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={e => this.handleSave(e)}>
                            <Modal.Body>
                                <Form.Group className="mb-3 text-dark bg-transparent" controlId="nama">
                                    <Form.Label className="text-black" >Nama </Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="nama" placeholder="Masukkan Nama" value={this.state.nama} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="alamat">
                                    <Form.Label className="text-black">Alamat</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="alamat" placeholder="Masukkan Alamat" value={this.state.alamat} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="jenis_kelamin">
                                    <Form.Label className="text-black" > Gender </Form.Label>
                                    <Form.Select id="mySelect" name="jenis_kelamin" value={this.state.jenis_kelamin} onChange={this.handleChange} required>
                                        <option className="firstOption" value="" hidden={true}>
                                            Pilih Gender
                                        </option>
                                        <option value="P">Perempuan</option>
                                        <option value="L">Laki-Laki</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="tlp">
                                    <Form.Label className="text-black"> Telephone</Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="text" name="tlp" placeholder="Masukkan Telephone" value={this.state.tlp} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="image">
                                    <Form.Label className="text-black">Image </Form.Label>
                                    <Form.Control className="text-dark bg-transparent" type="file" name="image" value={this.state.Image} onChange={this.handleFile} />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" type="submit" onClick={this.handleClose}>
                                    Save
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </div>
                </div>
            </div>
        )
    }
}