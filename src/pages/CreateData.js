import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";
import Button from "react-bootstrap/Button";

const CreateData = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        no_reg : "", 
        name : "", 
        merk : "", 
        production_year : "", 
        capacity : ""
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
        console.log(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(data.no_reg  === '' || data.name === '' || data.merk === '' || data.production_year === '' || data.capacity === ''){
            Swal.fire({
                title: "Gagal",
                text: `Semua data harus di isi`,
                icon: "error"
            })
        }
        if(isNaN(data.production_year) || isNaN(data.capacity)){
            Swal.fire({
                title: "Gagal membuat data",
                text: `Tahun Produksi dan Kapasitas kendaraan harus di isi angka`,
                icon: "error"
            })
        }
        if(data.production_year.length > 4){
            Swal.fire({
                title: "Gagal membuat data",
                text: `Tahun Produksi tidak boleh di isi lebih dari 4 angka`,
                icon: "error"
            })
        }
        axios
            .post(`http://localhost:8000/vehicle/create`, data)
            .then((res) => {
                Swal.fire({
                    title: "Created Success",
                    text: res.data.message,
                    icon: "success"
                })
                navigate({pathname: "/"})
            })
            .catch((err) => {
                Swal.fire({
                    title: "Failed to Created",
                    text: err.data.message,
                    icon: "error"
                })
                console.log(err);
            });
    }

    return (
        <div className="container-fluid p-5">
            <div className="row kotak-content p-3">
            <div className="col-md-12">
                <h5>Tambah Data Kendaraan</h5>

                <form onSubmit={handleSubmit}>
                <div className="row mt-4">
                    <div className="col-md-5">
                        <div className="form-group">
                            <label for="">No. Registrasi Kendaraan</label>
                            <input 
                            type="text" className="form-control mt-1" 
                            name="no_reg"
                            id="no_reg"
                            placeholder="Ex: B-7798-TXT"
                            onChange={handleChange}/>
                        </div>

                        <div className="form-group mt-2">
                            <label for="">Nama Pemilik</label>
                            <input 
                            type="text" className="form-control mt-1" 
                            name="name"
                            id="name"
                            placeholder="Ex: Alexander"
                            onChange={handleChange}/>
                        </div>

                        <div className="form-group mt-2">
                            <label for="">Merk Kendaraan</label>
                            <input 
                            type="text" className="form-control mt-1"
                            name="merk"
                            id="merk"
                            placeholder="Ex: Honda Beat"
                            onChange={handleChange} />
                        </div>
                    </div>
    
                    <div className="col-md-5">
                        <div className="form-group">
                            <label for="">Tahun Pembuatan</label>
                            <input type="text" className="form-control mt-1" 
                            name="production_year"
                            id="production_year"
                            placeholder="Ex: 2018"
                            onChange={handleChange}/>
                        </div>

                        <div className="form-group mt-2">
                            <label for="">Kapasitas Silinder</label>
                            <input type="text" className="form-control mt-1" 
                            name="capacity"
                            id="capacity"
                            placeholder="Ex: 150"
                            onChange={handleChange}/>
                        </div>
                    </div>
                </div>

                <div className="row mt-2">
                    <div className="col-md-5">
                          <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>
                            Simpan
                          </button>
                        <Button href="/" className="btn btn-secondary">
                            Kembali
                        </Button>
                    </div>
                </div>
                </form>
            </div>
            </div>
        </div>
    )
}

export default CreateData;