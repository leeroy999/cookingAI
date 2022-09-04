import { useEffect, useState } from 'react';
import CookingForm from './CookingForm';
import CookingShow from './CookingShow';

const App = () => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search) {
    }
  }, [search])

  const onSearch = (value) => {
    setSearch(value);
  };

  return (
    search === "" ? (
      <CookingForm onSearch={onSearch} />
    ) : (
      <CookingShow />
    )
  );
};

export default App;
