import React, { useEffect, useState} from 'react';
import axios from "axios"
import { Header } from './Header';
import { Footer } from './Footer';
import { Product } from './Product';
import { useNavigate } from 'react-router-dom';

export function Home(){
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [cart, setCart] = useState(0)
  
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    if(token == null){
        navigate(`/`, { replace: true });   
    }

    useEffect(() => {
        const fetchData = async () =>{
          setLoading(true)
          try {
            const {data: response} = await axios.get(
                'http://localhost:5269/Oferta/Buscar', 
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
    

    const addToCart = (item) => {
        axios.post(
            "http://localhost:5269/Carrito/Agregar",
            {
                "Cantidad": 1,
                "IdProducto": item.id
            },
            {
                headers: {
                   Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        ).then((response) => {
            console.log(response)
            if (response.statusText === "OK"){
                alert(response.data)
                setCart(cart+1)
            }
        }).catch((error) =>{
            alert(error.response.data)
        });
    }

    return(
        <div>
            <Header cart={cart}/>
            <div className="row">
                <h2>Ofertas</h2>
                {loading && <div>Loading</div>}
                {!loading && (
                data.map(item => (
                        item.detalleOfertas.map(det => (
                            <div className='col-md-2' key={det.id}>
                                <div className="card" style={{width: "18rem"}}>
                                    <img className="card-img-top" src={`data:image/jpeg;base64,${det.producto.archivo}`} alt="Card image" />
                                    <div className="card-body">
                                        <h4 className="card-title">{det.producto.nombre}</h4>
                                        <p className="card-text text-end">
                                            <strike>
                                                {
                                                    '$' + det.producto.precio.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                                                }
                                            </strike>
                                        </p>
                                        <p className="card-text text-end fs-4">
                                                {
                                                   '$' + (det.producto.precio - (det.producto.precio * (det.porcentajeDescuento/100))).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                                                }
                                        </p>
                                        <button type="button" className="btn btn-link" onClick={() => addToCart(det.producto)}>Agregar al carrito</button>
                                    </div>
                                </div>
                            </div>
                        ))                    
                    ))
                )}                
            </div>
            <div className='row' style={{ marginTop: "5vh" }}>
                <Product setCart={setCart}/>
            </div>
            <div style={{ marginTop: "5vh" }}>
                <Footer/>
            </div>
        </div>
        
    )
}