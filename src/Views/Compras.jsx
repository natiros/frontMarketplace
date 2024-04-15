import React, { useEffect, useState} from 'react';
import axios from "axios"
import { Header } from './Header';
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';

export function Compras(){
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const token = localStorage.getItem('token')

    const navigate = useNavigate()

    if(token == null){
        navigate(`/`, { replace: true });   
    }

    useEffect(() => {
        const fetchData = async () =>{
          setLoading(true)
          try {
            const {data: response} = await axios.get(
                'http://localhost:5269/Compra/Buscar', 
                {
                    headers: {
                       Authorization: "Bearer " + token
                    }
                 }
            );
            setData(response)
            console.log(response)
          } catch (error) {
            console.error(error.message);
          }
          setLoading(false);
        }
    
        fetchData();
    }, []);

    return(
        <div>
            <Header/>
            <div className="row">
                <div className='col-md-12'>
                    <h4>Mis Compras</h4>
                    {loading && <div>Loading</div>}
                    {!loading && (
                        <table className="table table-hover">
                        <thead>
                            <tr>
                            <th>Fecha</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Descripcion</th>
                            <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                item.detalleCompras.map( det =>
                                    <tr key={item.id}>
                                        <td>{item.fecha}</td>
                                        <td>{det.producto.nombre}</td>
                                        <td>{'$' + det.producto.precio.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                        <td>{det.producto.descripcion}</td>
                                        <td>{det.cantidad}</td>
                                    </tr>
                                )
                            ))}
                        </tbody>
                        </table>
                    )}
                </div>
            </div>            
            <div style={{ marginTop: "5vh" }}>
                <Footer/>
            </div>
        </div>
    )
}