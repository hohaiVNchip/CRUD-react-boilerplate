/**
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import makeStyles from '@material-ui/core/styles/makeStyles';

import _map from 'lodash/map';
// import _filter from 'lodash/filter';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectListBook,
  makeSelectLinkParams,
  makeSelectStatusFlags,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getListBook } from './actions';
// import messages from './messages';

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: theme.palette.grey[300],
  },
}));

export function HomePage(props) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const classes = useStyles();
  const {
    data,
    statusFlags: { isLoadMore, isShowLoadMore, isCallApi, isLoading },
    linkParams: { limit, offset, sizeData },
    triggerGetListBook,
  } = props;

  React.useEffect(() => {
    if (!isCallApi) {
      triggerGetListBook(limit, offset);
    }
  }, [isCallApi]);

  const [keySearch, setKeySearch] = React.useState('');

  const hanldGetValue = event => {
    setKeySearch(event.target.value);
  };

  // const handleSearch = () => {
  //   console.log('value', value);
  // };

  return (
    <Box p={4}>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      {/* <FormattedMessage {...messages.header} /> */}

      <Typography variant="h5" paragraph align="center">
        <b>HomePage ({sizeData})</b>
      </Typography>

      <Grid item xs={12} sm={8} md={6} lg={5}>
        <TextField
          // value={value}
          // defaultValue={value}
          // inputRef={e => console.log(e)}
          onChange={e => hanldGetValue(e)}
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Search ..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  size="small"
                  onClick={() => triggerGetListBook(limit, 0, keySearch)}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <br />
      {isLoadMore ? (
        <>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead className={classes.header}>
                <TableRow>
                  <TableCell width="5%">
                    <b>NO</b>
                  </TableCell>
                  <TableCell width="30%">
                    <b>Title</b>
                  </TableCell>
                  <TableCell width="65%">
                    <b>Body</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {_map(data, (item, idx) => (
                  <TableRow key={idx.toString()}>
                    <TableCell width="5%">{item.no}</TableCell>
                    <TableCell width="30%">{item.title}</TableCell>
                    <TableCell width="65%">{item.body}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {isShowLoadMore ? (
            <Box my={3} textAlign="center">
              <Button
                color="secondary"
                disabled={isLoading}
                size="small"
                variant="contained"
                onClick={() => triggerGetListBook(limit, offset)}
              >
                {isLoading && (
                  <>
                    <CircularProgress
                      style={{ width: '17px', height: '17px' }}
                    />
                    &nbsp;
                  </>
                )}
                Xem thêm
              </Button>
            </Box>
          ) : (
            ''
          )}
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="70vh"
        >
          <CircularProgress />
        </Box>
      )}
      <br />
    </Box>
  );
}

HomePage.propTypes = {
  data: PropTypes.array,
  statusFlags: PropTypes.object,
  linkParams: PropTypes.object,
  triggerGetListBook: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectListBook(),
  linkParams: makeSelectLinkParams(),
  statusFlags: makeSelectStatusFlags(),
});

function mapDispatchToProps(dispatch) {
  return {
    triggerGetListBook: (limit, offset, text) =>
      dispatch(getListBook(limit, offset, text)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
