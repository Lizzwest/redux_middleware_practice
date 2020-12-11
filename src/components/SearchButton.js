import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SearchRounded from '@material-ui/icons/SearchRounded';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0, 1),
  },
}));

const SearchButton = () => {
  const classes = useStyles();

  return (
      <Button
        variant="contained"
        primary='black'
        size="small"
        className={classes.button}
        startIcon={<SearchRounded />}
      >
        Search
      </Button>
  );
}

export default SearchButton