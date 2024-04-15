import React, { useEffect, useState} from 'react';
import axios from "axios"
import { Header } from './Header';
import { Footer } from './Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

library.add(faTrash);


export function Cart(){
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
                'http://localhost:5269/Carrito/Buscar', 
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

    const deleteToCart = (id) => {
        axios.delete(
            "http://localhost:5269/Carrito/Eliminar",
            {
                params:{
                    id: id
                },
                headers: {
                   Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        ).then((response) => {
            alert(response.data)
            window.location.reload();            
        }).catch((error) =>{
            alert(error)
        });
    }

    const buyCart = () => {

        let arr = []
        data.map(item => (
            arr.push({
                "Cantidad": item.cantidad,
                "IdProducto": item.producto.id
            })
        ))

        axios.post(
            "http://localhost:5269/Compra/Alta",
            arr,
            {
                headers: {
                   Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        ).then((response) => {
            alert(response.data)
            window.location.reload();            
        }).catch((error) =>{
            alert(error)
        });
    }

    return(
        <div>
            <Header/>
            <div className="row">
                <div className='col-md-12'>
                    <h4>Carrito</h4>
                    {loading && <div>Loading</div>}
                    {!loading && (
                        <table className="table table-hover">
                        <thead>
                            <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Descripcion</th>
                            <th>Cantidad</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.producto.id}>
                                    <td>{item.producto.nombre}</td>
                                    <td>{'$' + item.producto.precio.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                    <td>{item.producto.descripcion}</td>
                                    <td>{item.cantidad}</td>
                                    <td><button type="button" className="btn btn-danger" onClick={() => deleteToCart(item.id)}><FontAwesomeIcon icon={faTrash}/></button></td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col-md-11 col-md-1">
                    <button type="button" className='btn btn-primary text-end' onClick={() => buyCart()}>Comprar</button>
                </div>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Footer/>
            </div>
        </div>
    )
}