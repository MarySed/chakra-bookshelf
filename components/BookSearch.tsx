import { useState } from 'react';
import { Button, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { searchOpenLib } from 'utilities/utils';

const BookSearch = ({ setResults }: { setResults: (arg1: any) => void }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = async () => {
    const results = await searchOpenLib({
      query: query,
    });

    setResults(results);
  };

  return (
    <InputGroup>
      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find your new favorite book" />;
      <InputRightAddon>
        {/* TODO: Add debounce */}
        <Button onClick={handleSubmit}>Search</Button>
      </InputRightAddon>
    </InputGroup>
  );
};
export default BookSearch;
