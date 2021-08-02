import React, { useState,useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import MaterialDatatable from "material-datatable";
import Swal from 'sweetalert2';





  


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function Libros(props){
    
    const [data, setData] = useState([]);
    const [accion,setAccion] = useState("Guardar")
    const [id,setId] = useState(null)

    const [autor, setAutor] = useState("");
    const [titulo, setTitulo] = useState("");
    const [anio, setAnio]= useState(0); 
   

    useEffect(() => {

        Listar();
      },[]);

    const classes = useStyles();


    const columns = [

        {
            name: 'Autor',
            field: 'autor',
        },
        {
            name: 'Titulo',
            field: 'titulo',
        },
        {
            name: 'Anio',
            field: 'anio'
        }
    ];

    
    const columns2 = [

        {
            name: "Seleccionar libro",
            options: {
              headerNoWrap: true,
              customBodyRender: (item) => {
                return (
                  <Button
                    variant="contained"
                    className="btn-block"
                    onClick={() =>{
                        setAutor(item.nombre)
                        setTitulo(item.apellido_paterno)
                        setAnio(item.apellido_materno)
                        setId(item.id)
                        setAccion("Modificar")
                    }}
                  >
                    Seleccionar
                  </Button>
                );
              },
            },
          },
        {
            name: 'Nombre',
            field: 'nombre',
        },
        {
            name: 'Apellido_Paterno',
            field: 'apellido_paterno',
        },
        {
            name: 'Apellido_Materno',
            field: 'apellido_materno',
        },
    ];





    const options = {
        selectableRows:false
    };



    const Listar = () =>{

        axios
            .get(
                `http://localhost:8081/api/libro`
            )
            .then(
                (response) => {
                    setData(response.data)
             
                },
                (error) => {
                    console.log(error)
                }



            );
    }

    const Guardar = () => {



      if(accion=="Guardar"){
        axios
        .post(
            `http://localhost:8081/api/libro`, {
                autor: autor,
                titulo: titulo,
                anio: anio,
        }
        )
        .then(
            (response) => {
                if (response.status == 200) {
                    //alert("Registro Correcto")
                    Swal.fire({
                        title: 'Perfecto!',
                        text: 'Registro Correcto',
                        icon: 'success',
                        confirmButtonText: 'ok'
                      })
                    Listar();
                    Limpiar();
                }

            },
            (error) => {

                alert("Error al registrar")
            }



        );
      }  
        

      if(accion=="Modificar"){
        axios
        .put(
            `http://localhost:8081/api/libro/${id}`,{
            autor: autor,
            titulo: titulo,
            anio: anio,
        }
        )
        .then(
            (response) => {
                if (response.status == 200) {
                    alert("Modificacion correcta")
                    Listar();
                    Limpiar();
                }

            },
            (error) => {

                alert("Error al registrar")
            }



        );
      }

    }

    const Eliminar = () =>{
        axios
        .delete(
            `http://localhost:8081/api/libro/${id}`
        )
        .then(
            (response) => {
                if (response.status == 200) {
                    alert("Eliminacion correcta")
                    Listar();
                    Limpiar();
                }

            },
            (error) => {

                alert("Error al registrar")
            }



        );
        
    }

    const Limpiar = () =>{
        setAutor("");
        setTitulo("");
        setAnio("");
    }


    if(props.id===1){
        return(
            <Container>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                </Avatar>
                    <Typography component="h1" variant="h5">
                        Login Libro
                    </Typography>
                    <form className={classes.form} noValidate>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                     value={autor}
                                    onChange={(evt) => {
                                    console.log(evt)
                                    setAutor(evt.target.value)
                                    }}
                                     autoComplete="fname"
                                     name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="autor"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={titulo}
                                    onChange={(evt) => {

                                    setTitulo(evt.target.value)
                                    }}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="titulo"
                                name="lastName"
                                autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={anio}
                                    onChange={(evt) => {

                                    setAnio(evt.target.value)
                                    }}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="año"
                                name="lastName"
                                autoComplete="lname"
                                />
                            </Grid>

                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => Guardar()}
                            >
                        {accion}
                     </Button>


                    </form>
        </Container>
    )
    }
    if(props.id===2){
        return(
            <Container>
                    <form className={classes.form} noValidate>
                      <Grid container justify="flex-end">
                            <MaterialDatatable
                                title={"Lista de Libros"}
                                data={data}
                                columns={columns}
                                options={options}
                            />
                        
                        </Grid>
            
                        </form>
            </Container>
        )

    }
    if(props.id===3){
        return(
            <Container>
                 <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Eliminar Usuario
                    </Typography>
               <form className={classes.form} noValidate>
    
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={autor}
                                    onChange={(evt) => {
                                        console.log(evt)
                                        setAutor(evt.target.value)
                                    }}
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Autor"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={titulo}
                                    onChange={(evt) => {
    
                                        setTitulo(evt.target.value)
                                    }}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Titulo"
                                    name="lastName"
                                    autoComplete="lname"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={anio}
                                    onChange={(evt) => {
                                        setAnio(evt.target.value)
                                    }}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Año"
                                    name="lastName"
                                    autoComplete="lname"
                                />
                            </Grid>
                        </Grid>
                         
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={() => Eliminar()}
                        >
                            Eliminar
                        </Button>
            
              </form>
            </Container>
    
        )
    }
}