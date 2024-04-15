import './App.css';
import Gallery from './components/Gallery/Gallery';
import data from './data.json';

function App() {
  return (
    <>
      <Gallery data={data} />
    </>
  );
}

export default App;
