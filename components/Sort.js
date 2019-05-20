import { Flex, Button } from '@rebasejs/rebase';
import { connect } from 'react-redux';

import Select from './Select';
import Icon from './Icon';

const sortOptions = [
  {
    value: 'updated',
    label: 'Last update',
  },
  {
    value: 'stars',
    label: 'Stars',
  },
];

const Sort = props => {
  const { sort, asyncSort, sortDirection, asyncSortDirection } = props;

  const handleSortChange = e => asyncSort(e.currentTarget.value);
  const handleSortDirectionChange = () =>
    asyncSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');

  return (
    <Flex alignItems="center">
      Sort by:
      <Select name="sort" onChange={handleSortChange} ml={2} value={sort}>
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <Button variant="light" onClick={handleSortDirectionChange} ml={2}>
        <Icon
          color="dark"
          name={sortDirection === 'asc' ? 'sort-amount-up' : 'sort-amount-down'}
          height={20}
        />
      </Button>
    </Flex>
  );
};

const mapState = ({ repositories: { sort, sortDirection } }) => ({
  sort,
  sortDirection,
});

const mapDispatch = ({ repositories: { asyncSort, asyncSortDirection } }) => ({
  asyncSort,
  asyncSortDirection,
});

export default connect(
  mapState,
  mapDispatch,
)(Sort);
