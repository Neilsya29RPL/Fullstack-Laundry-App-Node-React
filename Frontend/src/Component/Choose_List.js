import React from "react";
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

export default class TranList extends React.Component{
    render(){
        return (
        <div className="col-lg-6 col-sm-12 p-2" >
            <div className="card">
                <div className="card-body row">
                    {/* menampilkan Gambar / cover */}
                    <div className="col-5" >
                        <img src={this.props.image} className="img rounded-circle" height="150" />
                        {/* <img alt={this.props.nameImage} src={this.props.image} className="img rounded-circle" height="150" /> */}
                    </div>
                    {/* menampilkan deskripsi */}
                    <div className="col-7">
                        <h5 className="text-info">
                            Nama    : { this.props.nama }
                        </h5>
                        <h6 className="text-dark">
                            Alamat    : { this.props.alamat}
                        </h6>
                        <h6 className="text-dark">
                            Gender : { this.props.jenis_kelamin}
                        </h6>
                        <h6 className="text-dark">
                            Telephone : { this.props.tlp}
                        </h6>
                        {/* button untuk menambah ke keranjang belanja */}
                        <button className="btn btn-sm btn-success m-1" onClick={this.props.onChoose}>
                            Choose
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
