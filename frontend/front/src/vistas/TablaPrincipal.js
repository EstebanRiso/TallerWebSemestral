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
import Prestamo from './Prestamo'
import Personas from './Personas'
import Libros from './Libro'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }


  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  


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

export default function Tabla() {
    

    const [value, setValue] = React.useState(2);

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    return (

        <Container component="main" maxWidth="lg">
                <CssBaseline />
                
     

            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">       
                    <Tab label="Guardar Persona" {...a11yProps(0)} />
                    <Tab label="Listar Personas" {...a11yProps(1)} />
                    <Tab label="Eliminar Persona" {...a11yProps(2)} />
                    <Tab label="Guardar Libro" {...a11yProps(3)} />
                    <Tab label="Listar Libros" {...a11yProps(4)} />
                    <Tab label="Eliminar Libro" {...a11yProps(5)} />
                    <Tab label="Generar Prestamos"{...a11yProps(6)}/>
                    <Tab label="Listar Prestamos"{...a11yProps(7)}/>
                </Tabs>
            </AppBar>
        
            <TabPanel value={value} index={0}>
                <Personas id={1}></Personas>    
            </TabPanel> 
            <TabPanel value={value} index={1}>
                <Personas id={2}></Personas>                      
            </TabPanel> 
            <TabPanel value={value} index={2}>
                <Personas id={3}></Personas>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Libros id={1}></Libros>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Libros id={2}></Libros>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <Libros id={3}></Libros>
            </TabPanel>
            <TabPanel value={value} index={6}>
                <Prestamo id={1}></Prestamo>
            </TabPanel>
            <TabPanel value={value} index={7}>
                <Prestamo id={2}></Prestamo>
            </TabPanel>
           
        </Container>


                                  
     
       
    );
}