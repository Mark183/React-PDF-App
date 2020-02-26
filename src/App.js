import React from 'react';
import { PDFViewer, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import MyDocument from './components/MyDocument'

function App() {
  return (
    <div className="App">
      <PDFViewer>
        <MyDocument destinations={['Hong Kong', 'London', 'New York']}/>
      </PDFViewer>
      <br/>
      <PDFDownloadLink
        document={<MyDocument destinations={['Hong Kong', 'London', 'New York', 'Sydney']} />}
        fileName="testPDF"
      >
        Download PDF
      </PDFDownloadLink>
      <br/>
      <BlobProvider
        document={<MyDocument destinations={['Hong Kong', 'London', 'New York']} />}
        children={({url, error})=>(
          <a href={url} target="_blank">Open In New Tab</a>
        )}
      />
    </div>
  );
}

export default App;
