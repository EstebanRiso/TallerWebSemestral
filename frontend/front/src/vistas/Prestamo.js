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


export default function Prestamo(props){

const [accion,setAccion] = useState("Guardar");
const [data, setData] = useState([]);



const [autor, setAutor] = useState("");
const [titulo, setTitulo] = useState("");
const [anio, setAnio]= useState(0); 

const [nombre, setNombre] = useState("");
const [apellido_paterno, setApellidoP] = useState("");
const [apellido_materno, setApellidoM]= useState(""); 

const [id_persona_personas,setidPersona] = useState(0);
const [id_libro_libros,setidLibro]=useState(0);
const [fecha,setFecha]=useState(0);

useEffect(() => {
    Listar_Prestamo();
  },[]);

const classes = useStyles();



const column1 = [
    
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
        field: 'apellido_materno'
    }
];

const column2=[
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

const column3=[
    {
        name:'Persona',
        field: 'persona',
    },
    {
        name: 'Libro',
        field: 'libro',
    },
    {
        name: 'Fecha',
        field: 'fecha'
    }
];



const Listar_Prestamo= () =>{

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

const Listar_Persona= () =>{

    axios
        .get(
            `http://localhost:8081/api/persona`
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

  const Listar_Libros= () =>{

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


const Guardar_Prestamo = () => {



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
              Listar_Prestamo();
          }

      },
      (error) => {

          alert("Error al registrar")
      }



  );
 }  
}

const options = {
    selectableRows:false
};

if(props.id===2){
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
                                setNombre(evt.target.value)
                                }}
                                 autoComplete="fname"
                                 name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="nombre persona"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={apellido_paterno}
                                onChange={(evt) => {

                                setApellidoP(evt.target.value)
                                }}
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="apellido paterno"
                            name="lastName"
                            autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                value={apellido_materno}
                                onChange={(evt) => {

                                setApellidoM(evt.target.value)
                                }}
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="apellido materno"
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
                        onClick={() => Guardar_Prestamo()}
                        >
                    {accion}
                 </Button>


                </form>
    </Container>)
  }

  if(props.id===1){

    return(
        <Container>
                <form className={classes.form} noValidate>
                  <Grid container justify="flex-end">
                        <MaterialDatatable
                            title={"Lista de Personas"}
                            data={data}
                            columns={column1}
                            options={options}
                        />
                    
                    </Grid>
        
                </form>
                <form className={classes.form} noValidate>
                  <Grid container justify="flex-end">
                        <MaterialDatatable
                            title={"Lista de Libros"}
                            data={data}
                            columns={column2}
                            options={options}
                        />
                    
                   </Grid>
        
                </form>

                
            
        </Container>
    )
  }

                            

}
