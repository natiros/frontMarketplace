import axios from "axios"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';

export function Login(){
    const[usuario, setUsuario] = useState("")
    const[password, setPassword] = useState("")
    const[error, setError] = useState(false)
    const[message, setMessage] = useState("")

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()

        if(usuario === "" || password === ""){
            setError(true)
            return
        }

        setError(false)
        
        axios.post(
            "http://localhost:5269/Usuario/Login",
            {
                Email: usuario,
                Password: password
            },
        ).then((response) => {
          console.log(response)
            if (response.statusText === "OK"){
              localStorage.setItem("token", response.data)
              navigate(`/home`, { replace: true });      
            }
        }).catch((error) =>{
          console.log(error)
          setMessage(error.response.data)
        });        
    }

    return(
        <div>
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form onSubmit={handleSubmit}>                
                  <div data-mdb-input-init className="form-outline mb-4">
                    <input type="email" id="email" className="form-control form-control-lg" placeholder="Ingresar Email" value={usuario} onChange={e => setUsuario(e.target.value)} />
                    <label className="form-label" htmlFor="email">Email</label>
                  </div>
                  <div data-mdb-input-init className="form-outline mb-3">
                    <input type="password" id="pass"  className="form-control form-control-lg" placeholder="Ingresar Password" value={password} onChange={e => setPassword(e.target.value)} />
                    <label className="form-label" htmlFor="pass">Password</label>
                  </div>
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Iniciar Sesion</button>
                  </div>
                </form>
                <div className="row">
                  <div className="col-md-12">
                    {error && <div className="alert alert-warning" role="alert">Usuario y Password son obligatorios.</div>}
                    {message && <div className="alert alert-danger" role="alert">{message}</div>}
                  </div>
                </div>  
              </div>
            </div>
          </div>
          <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          </div>
        </div>
    )
}