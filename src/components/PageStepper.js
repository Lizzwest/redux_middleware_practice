import React, {useState} from 'react';
import {connect} from 'react-redux'
import { getAllMoviesByGenre, getTrending } from '../store/actions/MovieActions'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const mapStateToProps = ({ movieState }) => {
    return { movieState }
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        fetchTrending: () => dispatch(getTrending()),
        fetchGenreMovies: (id, page, name) => dispatch(getAllMoviesByGenre(id, page, name)),
    }
};

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
});

const PageStepper = (props) => {

  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(props.movieState.page-1)




  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    props.fetchPage(props.id, props.movieState.page + 1, props.name);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    props.fetchPage(props.id, props.movieState.page - 1, props.name);
  };

  return (
    <MobileStepper
      variant="dots"
      steps={10}
      position="static"
      activeStep={activeStep}
      className={classes.root}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === 9}>
          Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
      }
    />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PageStepper)