import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { Container, Fab, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Search as SearchIcon, Add as AddIcon } from '@material-ui/icons';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';

import { PageHeader } from 'src/components/PageHeader';
import { Input } from 'src/components/Fields';
import { Table } from 'src/components/Table';
import { modalNames } from 'src/config';
import { columns, createRow } from './tableComponents';
import { usersActions, usersSelectors } from 'src/redux/stores/users';
import { modalActions } from 'src/redux/stores/modal';

const searchableFields = ['firstName', 'lastName', 'email', 'role'];

const useStyles = makeStyles(
  (theme) => ({
    searchWrapper: {
      width: '100%',
      [theme.breakpoints.up('md')]: {
        maxWidth: '365px',
      },
    },
    bg: {},
    main: {
      padding: theme.spacing(7, 0),
    },
  }),
  { index: 1 },
);

const HomePage = ({ users, resetModal, setModalInfo, ...props }) => {
  const cls = useStyles();
  const tableRef = useRef();
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue);

  const debouncedHandleSearch = useCallback(
    debounce((val) => {
      setDebouncedSearchValue(val);
      tableRef.current?.changePage(0);
    }, 300),
    [],
  );

  useEffect(() => {
    return () => {
      resetModal();
    };
  }, []);

  const handleSearch = (val) => {
    setSearchValue(val);
    debouncedHandleSearch(val);
  };

  const readyRows = useMemo(() => {
    let filteredUsers = [...users];

    if (debouncedSearchValue) {
      const _searchValue = debouncedSearchValue.toLocaleLowerCase();
      filteredUsers = filteredUsers.filter((user) => {
        for (let key in user) {
          if (
            searchableFields.includes(key) &&
            String(user[key]).toLocaleLowerCase().includes(_searchValue)
          ) {
            return true;
          }
        }
        return false;
      });
    }

    return filteredUsers.map((user) => createRow(user));
  }, [users, debouncedSearchValue]);

  return (
    <div className={cls.bg}>
      <PageHeader
        title="Project Access"
        MainActionComponent={
          <Fab
            color="primary"
            onClick={() => {
              setModalInfo({
                type: modalNames.ADD_USER,
                isOpen: true,
                props: {
                  onClose: resetModal,
                },
              });
            }}
          >
            <AddIcon fontSize="large" />
          </Fab>
        }
      >
        <div className={cls.searchWrapper}>
          <Input
            value={searchValue}
            onChange={handleSearch}
            placeholder="Type to filter the table"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </PageHeader>
      <main className={cls.main}>
        <Container>
          <Table rows={readyRows} columns={columns} ref={tableRef} />
        </Container>
      </main>
    </div>
  );
};

const mapState = (state) => ({
  users: usersSelectors.users(state),
});
const mapDispatch = {
  addUser: usersActions.addUser,
  editUser: usersActions.editUser,
  deleteUser: usersActions.deleteUser,

  setModalInfo: modalActions.setInfo,
  resetModal: modalActions.reset,
};

export default connect(mapState, mapDispatch)(HomePage);
