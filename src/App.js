import React, {useState} from 'react';
import { PDFViewer, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import MyDocument from './components/MyDocument'
import DefaultTemplate from './components/DefaultTemplate'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Content = ({children}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PDFViewer>
          {children}
        </PDFViewer>
      </Grid>
      <Grid item xs={12}>
        <PDFDownloadLink
          document={children}
          fileName="default-PDF"
        >
          <Button variant="contained" color="primary">Download PDF</Button>
        </PDFDownloadLink>
      </Grid>
      <Grid item xs={12}>
        <BlobProvider
          document={children}
          children={({ url, error }) => (
            <Button variant="contained" color="primary" href={url} target="_blank">Open In New Tab</Button>
          )}
        />
      </Grid>
    </Grid>
  )
}

function App() {
  const classes = useStyles();
  const [state, setState] = React.useState('Default');
  const handleChange = name => event => {
    setState( event.target.value);
  };
  return (
    <div className="App">
      <div className={classes.wrapper}>
        <Grid conatainer>
          <Grid xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel>Template</InputLabel>
              <Select
                native
                value={state}
                onChange={handleChange()}
              >
                <option value={'Default'}>Default</option>
                <option value={'TMG'}>TMG</option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {state === 'Default' && (
          <>
            <Content>
              <DefaultTemplate />
            </Content>
          </>
        )}
        {state === 'TMG' && (
          <>
            <Content>
              <MyDocument destinations={['Hong Kong', 'London', 'New York']} />
            </Content>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
