import * as React from 'react';
// import React from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Accordion,AccordionSummary,AccordionDetails,TableRow,Toolbar,Typography,TableHead,TableContainer,TableCell,TableBody,Table} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import s from './style.module.css';

export default function Landing() {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      padding:20
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      width:'100%'
    },
  
     gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: theme.palette.primary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  }));

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const tileData = [
    {
      img: 'https://res.cloudinary.com/cnx/image/upload/v1617069411/m8rcj3cujos8sqy1nznu.jpg',
      title: 'Image',
      author: 'author',
    },
    {
      img: 'https://res.cloudinary.com/cnx/image/upload/v1617071336/h8dyynipfqax1tq4shzh.jpg',
      title: 'Image',
      author: 'author',
    }
  ];

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  function getSteps() {
  return ['Crea tu cuenta', 'Sube tu foto del producto', 'El sistema hace el resto'];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
    case 1:
      return 'An ad group contains one or more ads which target a shared set of keywords.';
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return 'Unknown step';
  }
}

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (

    <Grid container spacing={4} justify="center" alignItems="flex-start"> 
      
      <Paper>
      <Grid item xs={12} sm={12} md={12}>
          
          <Toolbar>
            <Typography>
              #Primera Necesidad
            </Typography>
          </Toolbar>
        <GridList className={classes.gridList} style={{ height: 'auto' }}>
          {tileData.map((tile) => (
            <GridListTile key={tile.img}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton aria-label={`star ${tile.title}`}>
                    <StarBorderIcon className={classes.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        
      </Grid>    

     <Grid item xs={12} sm={12} md={12}>
          <Toolbar>
            <Typography>
              #Merkat
            </Typography>
          </Toolbar>
        <GridList className={classes.gridList} cols={5} style={{ height: 'auto' }}>
          {tileData.map((tile) => (
            <GridListTile key={tile.img}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton aria-label={`star ${tile.title}`}>
                    <StarBorderIcon className={classes.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </Grid>    
      </Paper>

      <Grid item xs={12} sm={12} md={12} style={{backgroundColor:'#CFC'}}>
        <Toolbar>
        <Typography>
          DeltaQuo te ayuda en el ahorro de tus compras. Unete a la comunidad siguiendo los siguientes pasos:
        </Typography>
        </Toolbar>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Atrás
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Listo!' : 'Siguiente'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Grid>

      <Grid item xs={12} sm={12} md={3}>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography className={classes.heading}>Revisiones en terreno</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper elevation={0} className={classes.paper}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Elemento</StyledTableCell>
                    <StyledTableCell align="right">Precio</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.calories}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </AccordionDetails>
        </Accordion>


        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography className={classes.heading}>Revisiones web</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper elevation={0} className={classes.paper}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Elemento</StyledTableCell>
                    <StyledTableCell align="right">Precio</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.calories}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
      
      </AccordionDetails>
      </Accordion>
      </Grid>

      <Grid item xs={12} sm={12} md={3}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography className={classes.heading}>Ofertas destacadas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper elevation={0} className={classes.paper}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Elemento</StyledTableCell>
                    <StyledTableCell align="right">Precio</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.calories}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          </AccordionDetails>
      </Accordion>
      </Grid>

      <Grid item xs={12} sm={12} md={3}>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography className={classes.heading}>Lugares destacados</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper elevation={0} className={classes.paper}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Elemento</StyledTableCell>
                    <StyledTableCell align="right">Precio</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.calories}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          </AccordionDetails>
      </Accordion>
      </Grid>

      <Grid item xs={12} sm={12} md={3}>
          <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
        <Typography className={classes.heading}>Elementos más cotizados</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper elevation={0} className={classes.paper}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Elemento</StyledTableCell>
                    <StyledTableCell align="right">Precio</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.calories}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          </AccordionDetails>
      </Accordion>
      </Grid>
    </Grid>
  );
};