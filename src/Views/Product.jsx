import { useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

library.add(faCartPlus);

export function Product({setCart}){
    const[nombre, setNombre] = useState("")
    const[descripcion, setDescripcion] = useState("")
    const[precioMin, setPrecioMin] = useState("")
    const[precioMax, setPrecioMax] = useState("")
    const[data, setData] = useState([])

    const buscarProducto = (e) => {
        e.preventDefault()
        
        axios.get(
            "http://localhost:5269/Producto/Buscar",
            {
                params: {
                  nombre: nombre,
                  descripcion: descripcion,
                  precioMin: precioMin,
                  precioMax: precioMax
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        ).then((response) => {
            if (response.statusText === "OK"){
                console.log(response.data)
                setData(response.data)
            }
        }).catch((error) =>{
          
        });        
    }

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

                let cart = parseInt(localStorage.getItem("cart") , 10 )

                console.log(cart)

                setCart(cart+1)
            }
        }).catch((error) =>{
            alert(error)
        });
    }

    return(        
        <div>
            <div className="container-lg">
                <h4>Buscar Producto</h4>
                <form className="form-inline" onSubmit={buscarProducto}>
                    <div className="row">
                        <div class="col-md-2">
                            <div className="form-group">
                                <input type="text" placeholder="Nombre" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div className="form-group">
                                <input type="text" placeholder="Descripcion" className="form-control" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div className="form-group">
                                <input type="text" placeholder="Precio Minimo" className="form-control" value={precioMin} onChange={e => setPrecioMin(e.target.value)} />
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div className="form-group">
                                <input type="text" placeholder="Precio Maximo" className="form-control" value={precioMax} onChange={e => setPrecioMax(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button type="submit" className="btn btn-primary">Buscar</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="container">
                {data != null && (       
                    <table className="table table-hover">
                    <thead>
                        <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Descripcion</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.nombre}</td>
                                <td>{'$' + item.precio.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</td>
                                <td>{item.descripcion}</td>
                                <td><button type="button" className="btn btn-link" onClick={() => addToCart(item)}><FontAwesomeIcon icon={faCartPlus}/></button></td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                )} 
            </div>
        </div>
    )
}