import React, { useState,useEffect } from 'react';
import { Autocomplete } from "@material-ui/lab";
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
import Paper from '@material-ui/core/Paper';

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

const [accion,setAccion] = useState("Registrar prestamo");

const [dataPersona, setDataPersona] = useState([]);
const [dataLibro, setDataLibro] = useState([]);
const [data, setData] = useState([]);


//Libro
const [libros,setLibros]=useState([]); 
//Persona
const [personas,setPersonas]=useState([]);
//Prestamo

//seleccion de persona
const[persona,setPersona]=useState({
    id:0,
    nombre:"",
    apellido_paterno:"",
    apellido_materno:""
})
//seleccion de libro
const[libro,setSelectLibro]=useState({
    id:0,
    titulo:""
});

const[id_libro,setIdLibro]=useState(0)
const[id_persona,setIdPersona]=useState(0)
const[fecha,setFecha]=useState("")


const columns = [

    {
        name: "Seleccionar",
        options: {
          headerNoWrap: true,
          customBodyRender: (item, tablemeta, update) => {
            return (
              <Button
                variant="contained"
                color="secondary"
                className="medium"
                onClick={() => {setSelectLibro({id:item.id,titulo:item.titulo});}}
              >
                Seleccionar
              </Button>
            );
          },
        },
      },
    

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



const columns2= [

    {
        name: "Seleccionar",
        options: {
          headerNoWrap: true,
          customBodyRender: (item, tablemeta, update) => {
            return (
              <Button
                variant="contained"
                color="secondary"
                className="medium"
                onClick={() => {setPersona({id:item.id,nombre:item.nombre,apellido_paterno:item.apellido_paterno,apellido_materno:item.apellido_materno});}}
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
        name: 'Apellido_paterno',
        field: 'apellido_paterno',
    },
    {
        name: 'Apellido_materno',
        field: 'apellido_materno'
    }
];



useEffect(() => {
    Listar_Prestamo();
    Listar_Persona();
    Listar_Libros();
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
        field:[ {  name:"Nombre",
                   field:"nombre",
                },
                { name:"Apellido_paterno",
                 field:"apellido_paterno"
                },
                {
                  name:"Apellido_materno",
                  field:"apellido_materno"
                }]
    
    },
    {
        name: 'Libro',
        field: [{ name:"Autor",
                   field:"autor",
                },
                { name:"Titulo",
                 field:"titulo"
                },
                {
                  name:"Año",
                  field:"anio"
                }],
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
                setPersonas(response.data)
         
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
                setLibros(response.data)
         
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
      id_persona_personas: id_persona,
      id_libro_libros: id_libro,
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
              //Listar_Libros();
              //Listar_Persona();
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

if(props.id===1){
    return(
    <Container>
        
                <Container>
                    <form className={classes.form} noValidate>
                      <Grid container justify="flex-start">
                            <MaterialDatatable
                                title={"Lista de Libros"}
                                data={libros}
                                columns={columns}
                                options={options}
                            />

                            <MaterialDatatable
                                title={"Lista de Personas"}
                                data={personas}
                                columns={columns2}
                                options={options}
                            />
                        </Grid>
            
                        </form>


                
                        <Grid container justify="flex-end">
                            <Paper>
                                <label>{libro.titulo}</label>
                                <label>{persona.nombre}</label>
                            </Paper>
                            <Button onClick={()=>{
                                
                                setIdPersona(persona.id)
                                setIdLibro(libro.id)
                                console.log(id_libro)
                                console.log(id_persona)
                                //coloca la fecha puto :3 
                                Guardar_Prestamo()
                            
                            }}>
                                    GENERAR PRESTAMO
                            </Button>
                        </Grid> 
                
                </Container>     
                

                
    </Container>)
  }

  if(props.id===2){

    return(
        <Container>

           

                <form className={classes.form} noValidate>
                   <Grid item xs={12} sm={6}>
                        <MaterialDatatable
                            title={"Lista de Prestamos"}
                            data={data}
                            columns={column3}
                            options={options}
                        />
                    
                   </Grid>
                </form>

        </Container>
    )
  }

                            

}
