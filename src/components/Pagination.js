import { createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#b2b2b2',
      contrastText: '#000',
    },
    text: {primary: '#fff'},
    secondary: {
      light: '#333333',
      main: '#000000',
      dark: '#555555',
      contrastText: '#fff',
    },
  },
});


const AppPagination = (props) => {
    const {id, name, count, page, fetchPage} = props

    return (
        <ThemeProvider theme={theme} >
            {name==='Anime' ? 
            <Pagination page={page} color='primary' count={count} showFirstButton showLastButton
            onChange={(e) => {
                e.preventDefault()
                fetchPage(parseInt(e.target.innerText))
            }}
            />
            :
            <Pagination page={page} color='primary' count={count} showFirstButton showLastButton
            onChange={(e) => {
                e.preventDefault()
                fetchPage(id, parseInt(e.target.innerText), name)
            }}
            />
            }
        </ThemeProvider>
    );
}

export default AppPagination