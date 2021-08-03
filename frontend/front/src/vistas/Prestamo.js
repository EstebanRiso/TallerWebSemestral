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


export default function Prestamo(props){

    const [data, setData] = useState([]);
    const [accion,setAccion] = useState("Guardar")
    const [id,setId] = useState(null)

    const [id_persona_personas, setIdPersona] = useState("");
    const [id_libro_libros, setIdLibro] = useState("");
    const [fecha, setFecha]= useState(""); 
   

    useEffect(() => {

        Listar();
      },[]);


    const classes = useStyles();


    const columns = [

        {
            name: 'Id_persona_personas',
            field: 'id_persona_personas',
        },
        {
            name: 'Id_libro_libros',
            field: 'id_libro_libros',
        },
        {
            name: 'Fecha',
            field: 'fecha'
        }
    ];

    
    const columns2 = [

        {
            name: "Seleccionar Prestamo",
            options: {
              headerNoWrap: true,
              customBodyRender: (item) => {
                return (
                  <Button
                    variant="contained"
                    className="btn-block"
                    onClick={() =>{
                        setIdPersona(item.id_persona_personas)
                        setIdLibro(item.id_libro_libros)
                        setFecha(item.fecha)
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
            name: 'Id_persona_personas',
            field: 'id_persona_personas',
        },
        {
            name: 'Id_libro_libros',
            field: 'id_libro_libros',
        },
        {
            name: 'Fecha',
            field: 'fecha'
        },
    ];




    const options = {
        selectableRows:false
    };



    const Listar = () =>{

        axios
            .get(
                `http://localhost:8081/api/prestamo`
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

    const Limpiar = () =>{
        setIdPersona("");
        setIdLibro("");
        setFecha("");
    }

    const Guardar = () => {



      if(accion=="Guardar"){
        axios
        .post(
            `http://localhost:8081/api/prestamo`, {
            id_persona_personas: id_persona_personas,
            id_libro_libros: id_libro_libros,
            fecha: fecha
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
    }

    

  




    
    if(props.id===1){

        return(
            <Container>
                    <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                    </Avatar>
                        <Typography component="h1" variant="h5">
                            Sección Prestamos
                        </Typography>
                        <form className={classes.form} noValidate>
    
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                         value={nombre}
                                        onChange={(evt) => {
                                        console.log(evt)
                                        setIdPersona(evt.target.id)
                                        }}
                                         autoComplete="fname"
                                         name="firstName"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Persona"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        value={apellido_paterno}
                                        onChange={(evt) => {
    
                                        setIdLibro(evt.target.id)
                                        }}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Libro"
                                    name="lastName"
                                    autoComplete="lname"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        value={apellido_materno}
                                        onChange={(evt) => {
    
                                            setFecha(evt.target.value)
                                        }}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Fecha"
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
                                title={"Lista de Prestamos"}
                                data={data}
                                columns={columns}
                                options={options}
                            />
                        
                        </Grid>
            
                        </form>
            </Container>
        )

    }


}