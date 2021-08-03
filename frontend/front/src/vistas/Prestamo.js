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
import { useForm } from "react-hook-form";

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


    const classes = useStyles();
    const fecha = new Date();
    const fechaActual = (fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate());
  
    const { register, handleSubmit,errors,getValues,setValue,reset } = useForm(
      {defaultValues:{ fecha: fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate()} });
    const [] = useState(0)

    const [persona, setPersonas]= useState([])
    const [libros, setLibros] = useState([])
    const [libroSeleccionado, setLibroSeleccionado] = useState(0)
    const [personaSeleccionada, setPersonaSeleccionado] = useState(0)


    const [data, setData] = useState([]);
    const [accion,setAccion] = useState("Guardar")
    const [id,setId] = useState(null)

    const [id_persona_personas, setIdPersona] = useState(null);
    const [id_libro_libros, setIdLibro] = useState(null);
    //const [fecha, setFecha]= useState(""); 
   

    useEffect(() => {

        Listar();
      },[]);


    useEffect(() => {
        cargarLibro();
      }, []);
    
    useEffect(() => {
        cargarPersona();
      }, []);
    

  
    
      const seleccionar1 = (item) =>{

        setValue("persona",item._id)
        setIdPersona(item._id)
        }
    
        const seleccionar2 = (item) =>{
          
            setValue("libro",item._id)
          setIdLibro(item._id)
          }




          const columns = [
            {
              name: "Seleccionar",
              options: {
                headerNoWrap: true,
                customBodyRender: (item, tablemeta, update) => {
                  return (
                    <Button
                      variant="contained"
                      className="btn-block"
                      onClick={() => seleccionar1(item)}
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
                name: 'Apellido Paterno',
                field: 'apellido_paterno',
            },
            {
                name: 'Apellido Materno',
                field: 'apellido_materno'
            }  
          ];
        
          const columns2 = [
            {
              name: "Seleccionar",
              options: {
                headerNoWrap: true,
                customBodyRender: (item, tablemeta, update) => {
                  return (
                    <Button
                      variant="contained"
                      className="btn-block"
                      onClick={() => seleccionar2(item)}
                    >
                      Seleccionar
                    </Button>
                  );
                },
              },
            },
            {
                name: 'Titulo',
                field: 'titulo',
            }
          
            
          ];



  
const options={
    selectableRows: false,
    print: false,
    onlyOneRowCanBeSelected: false,
    textLabels: {
      body: {
        noMatch: "Lo sentimos, no se encuentran registros",
        toolTip: "Sort",
      },
      pagination: {
        next: "Siguiente",
        previous: "Página Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
    },
    download: false,
    pagination: true,
    rowsPerPage: 5,
    usePaperPlaceholder: true,
    rowsPerPageOptions: [5, 10, 25],
    sortColumnDirection: "desc",
  }


  const options2={
    selectableRows: false,
    print: false,
    onlyOneRowCanBeSelected: false,
    textLabels: {
      body: {
        noMatch: "Lo sentimos, no se encuentran registros",
        toolTip: "Sort",
      },
      pagination: {
        next: "Siguiente",
        previous: "Página Anterior",
        rowsPerPage: "Filas por página:",
        displayRows: "de",
      },
    },
    download: false,
    pagination: true,
    rowsPerPage: 5,
    usePaperPlaceholder: true,
    rowsPerPageOptions: [5, 10, 25],
    sortColumnDirection: "desc",
  }




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
                    Swal.fire({
                        title: 'Perfecto!',
                        text: 'Registro Correcto',
                        icon: 'success',
                        confirmButtonText: 'ok'
                      })
                    Listar();
                }

            },
            (error) => {

                alert("Error al registrar")
            }



        );
      }  
    }




    
  const cargarLibro = async () => {

    const { data } = await axios.get("http://localhost:8081/api/libro");
    
    setLibros(data.libroConAutor);


  };

  const cargarPersona = async () => {


    const { data } = await axios.get("http://localhost:8081/api/persona");
    
    setPersonas(data.persona);

  };
  

    
    if(props.id===1){

        return(
                <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>

 
        <form className={classes.form} onSubmit={handleSubmit(Guardar)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="persona"
                name="persona"
                variant="outlined"
                required
                fullWidth
                id="personaid"
                label="persona"
                autoFocus
                {...register('test', { required: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="libro"
                label="libro"
                name="libro"
                autoComplete="libro"
                {...register('test', { required: true })}
              />
            </Grid>
            <Grid>
            <MaterialDatatable
        
              title={"Persona"}
              data={persona}
              columns={columns}
              options={options}
            />
          </Grid>
          <Grid>
            <MaterialDatatable
        
              title={"Libros"}
              data={libros}
              columns={columns2}
              options={options2}
            />
          </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {accion}
          </Button>


  
        
        </form>


      </div>

    </Container>
    
        )
      }




      if(props.id===2){
      
      
    }


}