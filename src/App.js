
import './App.css';
import Search from './components/search/search';


function App() {
  const handleOnSearchChange = (searchData) =>  {
    console.log(searchData)
    console.log("HI");
  }

  return (
    <div className="container">
      <Search  onSearchChange={handleOnSearchChange}/>
    </div>
  );
}

export default App;
