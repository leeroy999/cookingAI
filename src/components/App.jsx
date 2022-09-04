import axios from 'axios';
import { useState } from 'react';
import CookingForm from './CookingForm';
import CookingShow from './CookingShow';
import LoadingIndicator from './LoadingIndicator';

const App = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSearch = (value) => {
    setSearch(value);
    setIsLoading(true);
    axios.get("/api?query=" + value).then((response) => {
    // axios.get("/api?query=" + value).then((response) => {
      const newData = response.data;
      console.log(newData.result);
      setData(newData.result);
      setIsLoading(false);
    }).catch((e) => {
      console.log(e);
      setIsLoading(false);
    })
  };

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    search === "" ? (
      <CookingForm onSearch={onSearch} />
    ) : (
      <CookingShow search={search} onSearch={onSearch} data={data}/>
    )
  );
};

export default App;
