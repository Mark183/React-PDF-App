import React, {useState} from 'react';
import { PDFViewer, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import MyDocument from './components/MyDocument'
import DefaultTemplate from './components/DefaultTemplate'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles(theme => ({
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
    <Grid conatiner spacing={1}>
      <Grid item xs={4}>
        <PDFViewer>
          {children}
        </PDFViewer>
      </Grid>
      <Grid item xs={4}>
        <PDFDownloadLink
          document={children}
          fileName="default-PDF"
        >
          Download PDF
                  </PDFDownloadLink>
      </Grid>
      <Grid item xs={4}>
        <BlobProvider
          document={children}
          children={({ url, error }) => (
            <a href={url} target="_blank">Open In New Tab</a>
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
      <Grid conatainer>
        <Grid xs={12}>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="filled-age-native-simple">Template</InputLabel>
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
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
