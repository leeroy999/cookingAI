import axios from 'axios';
import { useEffect, useState } from 'react';
import CookingForm from './CookingForm';
import CookingShow from './CookingShow';

const App = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([])

  useEffect(() => {
    if (search) {
    }
  }, [search]);

  const onSearch = (value) => {
    setSearch(value);
    axios.get("http://127.0.0.1:33507//api?query=" + value).then((response) => {
    // axios.get("/api?query=" + value).then((response) => {
      const newData = response.data;
      console.log(newData.result);
      setData(newData.result)
    })
  };

  return (
    search === "" ? (
      <CookingForm onSearch={onSearch} />
    ) : (
      <CookingShow search={search} onSearch={onSearch} data={data}/>
    )
  );
};

export default App;
