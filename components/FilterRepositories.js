import { useState, useCallback } from 'react';
import { Box } from '@rebasejs/rebase';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';

import Input from './Input';

const FilterRepositories = props => {
  const { query, asyncSetQuery } = props;
  const [value, setValue] = useState(query);

  const setQuery = useCallback(
    debounce(
      value => {
        asyncSetQuery(value);
      },
      1000,
      {
        leading: false,
        trailing: true,
      },
    ),
    [],
  );

  const handleOnChange = e => {
    const { value } = e.currentTarget;
    setValue(value);
    setQuery(value);
  };

  return (
    <Box>
      <Input
        mr={2}
        placeholder="Search for a repository"
        width={300}
        value={value}
        onChange={handleOnChange}
      />
    </Box>
  );
};

const mapState = state => ({
  query: state.repositories.query,
});

const mapDispatch = ({ repositories: { asyncSetQuery } }) => ({
  asyncSetQuery,
});

export default connect(
  mapState,
  mapDispatch,
)(FilterRepositories);
