import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      position: 'absolute',
      left: '18vw',
      top: '2vh',
      color: 'white',
      backgroundColor: 'black'
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const AddButton = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
}

export default AddButton