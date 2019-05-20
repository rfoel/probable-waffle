import { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Flex, Box, Image } from '@rebasejs/rebase';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import useOnClickOutside from 'use-onclickoutside';

import routes from '../routes';

import Input from './Input';
import Loader from './Loader';

const { Link } = routes;

const SearchResults = styled(Box)(
  {
    position: 'absolute',
    top: '36px',
    left: 0,
    width: '100%',
    background: '#fff',
    boxShadow: '0 12px 24px 0 rgba(0, 0, 0, 0.3)',
    border: '1px solid',
    borderRadius: 4,
    zIndex: 999,
  },
  props => ({
    borderColor: props.theme.colors.light,
  }),
);

const Search = props => {
  const { list, loading, setList, asyncSearch } = props;
  const [value, setValue] = useState('');
  const [displaySearchResults, setDisplaySearchResults] = useState(false);

  const ref = useRef();
  useOnClickOutside(ref, () => setDisplaySearchResults(false));

  useEffect(() => {
    if (value.length > 0) setDisplaySearchResults(true);
  }, [list]);

  const search = useCallback(
    debounce(
      value => {
        asyncSearch(value);
      },
      500,
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
    setList([]);
    search(value);
  };

  const handleOnFocus = () => {
    if (list.length > 0) setDisplaySearchResults(true);
    if (!value.length) {
      setList([]);
      setDisplaySearchResults(false);
    }
  };

  return (
    <Box style={{ position: 'relative' }}>
      <Input
        placeholder="Search for an user or organization"
        width={300}
        dark={props.dark}
        value={value}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
      />
      {displaySearchResults && (
        <SearchResults py={2} px={3} ref={ref} color="dark">
          {!list.length && !loading && (
            <Box>No users or organizations found</Box>
          )}
          {loading && <Loader height={25} />}
          {list.map(user => (
            <Link key={user.login} route="user" params={{ user: user.login }}>
              <Flex
                alignItems="center"
                my={2}
                py={2}
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => setDisplaySearchResults(false)}
              >
                <Image
                  src={user.avatarUrl}
                  width="30px"
                  height="30px"
                  borderRadius={999}
                  mr={3}
                />
                <Box>
                  <Box>{user.login}</Box>
                </Box>
              </Flex>
            </Link>
          ))}
        </SearchResults>
      )}
    </Box>
  );
};

const mapState = state => ({
  list: state.user.list,
  loading: state.loading.effects.user.asyncSearch,
});

const mapDispatch = ({ user: { setList, asyncSearch } }) => ({
  setList,
  asyncSearch,
});

export default connect(
  mapState,
  mapDispatch,
)(Search);
