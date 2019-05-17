import { useState } from 'react';
import { Flex, Box } from '@rebasejs/rebase';

import Radio from './Radio';

export default () => {
  const [orderBy, setOrderBy] = useState('lastUpdate');

  const options = [
    {
      value: 'lastUpdate',
      label: 'Last update',
    },
    {
      value: 'name',
      label: 'Name',
    },
    {
      value: 'stars',
      label: 'Stars',
    },
  ];

  const handleOnChange = e => setOrderBy(e.currentTarget.value);

  return (
    <Flex>
      Order by:
      {options.map(option => (
        <Radio
          key={option.value}
          name="orderBy"
          value={option.value}
          label={option.label}
          onChange={handleOnChange}
          checked={orderBy === option.value}
        />
      ))}
    </Flex>
  );
};
