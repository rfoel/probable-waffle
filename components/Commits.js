import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { Flex, Box, Image } from '@rebasejs/rebase';
import { connect } from 'react-redux';
import { distanceInWordsToNow } from 'date-fns';
import BottomScrollListener from 'react-bottom-scroll-listener';

import routes from '../routes';

import Input from './Input';
import Loader from './Loader';

const { Link } = routes;

const Commit = styled(Box)({}, props => ({
  border: `1px solid${darken(0.03, props.theme.colors.light)}`,
}));

const Commits = props => {
  const { commits, pagination, loading, asyncFetchCommits } = props;
  const [filteredCommits, setFilteredCommits] = useState(commits);
  const [value, setValue] = useState('');

  useEffect(() => {
    filterCommits(value);
  }, [commits]);

  const handleOnScroll = () => {
    if (pagination.hasNextPage) {
      asyncFetchCommits({
        after: pagination.endCursor,
      });
    }
  };

  const handleOnChange = e => {
    if (e) {
      const { value } = e.currentTarget;
      setValue(value);
      filterCommits(value);
    }
  };

  const filterCommits = value => {
    setFilteredCommits(
      commits.filter(
        commit =>
          commit.messageHeadline.toLowerCase().includes(value.toLowerCase()) ||
          commit.messageBody.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      my={4}
    >
      <BottomScrollListener onBottom={handleOnScroll} offset={500}>
        <Box mb={3} alignSelf="flex-start">
          <Input
            mr={2}
            placeholder="Search for a commit"
            width={300}
            value={value}
            onChange={handleOnChange}
          />
        </Box>

        {commits.length > 0 && !filteredCommits.length && value.length > 0 && (
          <Box my={4}>No commits found with the search term "{value}"</Box>
        )}

        {!commits.length && (
          <Box my={4}>This repository has no commits yet</Box>
        )}

        {filteredCommits.map(commit => (
          <Commit
            key={commit.id}
            width="100%"
            p={3}
            style={{ maxWidth: '800px', borderRadius: '10px' }}
            my={2}
          >
            <Box fontSize={2} mb={3}>
              {commit.messageHeadline}
            </Box>
            {commit.messageBody && (
              <Box color="gray" fontSize={1} my={2}>
                {commit.messageBody}
              </Box>
            )}
            <Flex fontSize={2} alignItems="center">
              <Link
                route="user"
                params={{
                  user: commit.author.user ? commit.author.user.login : ' ',
                }}
              >
                <Flex
                  alignItems="center"
                  fontSize={1}
                  style={{ cursor: 'pointer' }}
                >
                  <Image
                    src={commit.author.avatarUrl}
                    width="20px"
                    height="20px"
                    borderRadius={999}
                    mr={1}
                  />
                  {commit.author.name}
                </Flex>
              </Link>
              <Box ml={1} fontSize={1}>
                committed {distanceInWordsToNow(commit.author.date)} ago
              </Box>
            </Flex>
          </Commit>
        ))}
        {loading && <Loader />}
      </BottomScrollListener>
    </Flex>
  );
};

const mapState = state => ({
  commits: state.repository.commits,
  pagination: state.repository.pagination,
  loading: state.loading.effects.repository.asyncFetchCommits,
});

const mapDispatch = ({ repository: { asyncFetchCommits } }) => ({
  asyncFetchCommits,
});

export default connect(
  mapState,
  mapDispatch,
)(Commits);
