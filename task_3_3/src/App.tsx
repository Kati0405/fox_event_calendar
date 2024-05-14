import './App.css';
import ControlledForm from './components/ControlledForm/ControlledForm';
import UncontrolledForm from './components/UncontrolledForm/UncontrolledForm';

function App() {
  return (
    <div className='bg-slate-50 flex flex-row gap-2'>
      <UncontrolledForm />
      <ControlledForm />
    </div>
  );
}

export default App;
