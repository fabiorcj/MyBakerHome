import FlourInput from './components/flour-input';
import HeaderComponent from './components/header';

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="header">
        <HeaderComponent />
      </header>
      <FlourInput />
    </div>
  );
}

export default App;
