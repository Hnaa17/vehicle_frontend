import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";
import Button from "react-bootstrap/Button";

const VehicleList = () => {
    const [vehicle, setVehicle] = useState([]);
    const navigate = useNavigate();
    console.log(navigate);

    const fetch = async() => {
        const result = await axios.get(`http://localhost:8000/vehicle`);
        setVehicle(result.data.data);
        console.log(vehicle);
    };

    useEffect(() => {
        fetch();
    }, []);

    const deleteVehicle = async(no_reg) => {
        Swal.fire({
            text: `Anda yakin menghapus data ${no_reg} ?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            confirmButtonColor: "#32C33B",
            cancelButtonColor: "#d33",
        }).then(async(result) => {
            if (result.isConfirmed) {
                await axios .delete(`http://localhost:8000/vehicle/${no_reg}`)
                .then(() => {
                    Swal.fire("Deleted!", "Data berhasil di hapus", "success");
                    window.location.reload(false);
                })
                .catch(() => {
                    Swal.fire("Deleted Failed!", "Gagal menghapus data", "error");
                });
            }
        });
    };

    return (
        <div className="container-fluid p-5">
            <div className="row kotak-content p-3">
                <div className="col-md-12">
                    <h3>Aplikasi Data Kendaraan</h3>
                    <div className="tombol mt-2">
                    <Button href="/create" variant="primary" size="lg" active>
                        Add
                    </Button>
                    </div>

                    <div className="table mt-2">
                    <table className="table table-bordered">
                        <thead className="table-light">
                            <tr className="text-center head">
                                <th>No</th>
                                <th>No Registrasi</th>
                                <th>Nama Pemilik</th>
                                <th>Merk Kendaraan</th>
                                <th>Tahun Pembuatan</th>
                                <th>Kapasitas</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                                {vehicle.map((item, index) => {
                                    console.log(item.name);
                                    return (
                                        <tbody>
                                        <tr key={item.no_reg} className="text-center">
                                    <td>{index + 1}</td>
                                    <td>{item.no_reg}</td>
                                    <td>{item.name}</td>
                                    <td>{item.merk}</td>
                                    <td>{item.production_year}</td>
                                    <td>{item.capacity} cc</td>
                                    <td>
                                        <Link style={{textDecoration: 'none'}} to={`/detail/${item.no_reg}`} >
                                            <span className="text-warning font-weight-bold">Detail </span>
                                        </Link>
                                        <Link style={{textDecoration: 'none'}} to={`/update/${item.no_reg}`}>
                                            <span className="text-primary font-weight-bold">Edit </span>
                                        </Link>
                                        <Link style={{textDecoration: 'none'}} onClick={() => deleteVehicle(item.no_reg)}>
                                            <span className="text-danger font-weight-bold">Delete</span>
                                        </Link>
                                    </td>
                                </tr>
                                </tbody>
                                    )
                                })}
                    </table>
                </div>
                </div>
            </div>
        </div>
    )
}

export default VehicleList;