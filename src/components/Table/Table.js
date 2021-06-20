// mostly taken from MUI Table example https://codesandbox.io/s/f71wj?file=/demo.js

import React, {
  useState,
  useMemo,
  forwardRef,
  useImperativeHandle,
  Fragment,
} from 'react';
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Typography,
} from '@material-ui/core';
import { ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  (theme) => ({
    table: {
      minWidth: (props) => props.minWidth || '1000px',
    },
    sortIcon: {
      fontSize: '24px',
    },
    noContentWrapper: {
      padding: theme.spacing(3),
    },
  }),
  { index: 1 },
);

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy].value < a[orderBy].value) {
    return -1;
  }
  if (b[orderBy].value > a[orderBy].value) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedArray = array.map((el, index) => [el, index]);
  stabilizedArray.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    } else {
      return a[1] - b[1];
    }
  });
  return stabilizedArray.map((el) => el[0]);
};

const EnhancedTableHead = ({
  columns,
  columnProps,
  order,
  orderBy,
  onRequestSort,
  ...props
}) => {
  const cls = useStyles();

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((col) => (
          <TableCell
            key={col.id}
            sortDirection={orderBy === col.id ? order : false}
            align={col.alignRight ? 'right' : 'left'}
            padding={col.disablePadding ? 'none' : 'default'}
          >
            {col.notSortable ? (
              col.render ? (
                col.render(columnProps, col)
              ) : (
                col.value
              )
            ) : (
              <TableSortLabel
                active={orderBy === col.id}
                direction={orderBy === col.id ? order : 'asc'}
                onClick={createSortHandler(col.id)}
                IconComponent={ArrowDropDownIcon}
                classes={{
                  icon: cls.sortIcon,
                }}
              >
                {col.render ? col.render(columnProps, col) : col.value}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const TableBuilder = forwardRef(
  (
    {
      rows,
      rowProps = {},
      rowsPerPageOptions = [5, 10, 25, 50],
      columns,
      columnProps = {},
      minWidth,
      tableAriaLabel = 'Table',
      resetPageOnRowsChange,
      ...props
    },
    ref,
  ) => {
    const cls = useStyles({ minWidth });
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const handleChangePage = (newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(event.target.value);
      setPage(0);
    };

    const hasRows = !!rows && rows.length > 0;

    const readyRows = useMemo(() => {
      if (!hasRows) {
        return [];
      }
      let result = orderBy
        ? stableSort(rows, getComparator(order, orderBy))
        : rows;

      result = result.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      );

      return result;
    }, [rows, order, orderBy, rowsPerPage, page, hasRows]);

    useMemo(() => {
      // in case when removing last row, we don't want
      // the user to stay on the same page with 0 rows.
      // also useMemo not to wait the rendering
      if (readyRows.length < 1 && page > 0) {
        handleChangePage(0);
      }
    }, [readyRows]);

    useImperativeHandle(ref, () => ({
      changePage: handleChangePage,
    }));

    if (!hasRows) {
      return (
        <div className={cls.noContentWrapper}>
          <Typography align="center" variant="h4">
            Table data not found
          </Typography>
        </div>
      );
    }

    return (
      <Fragment>
        <TableContainer>
          <Table className={cls.table} aria-label={tableAriaLabel}>
            <EnhancedTableHead
              columns={columns}
              columnProps={columnProps}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {readyRows.map((row, index) => {
                return (
                  <TableRow key={row.id} hover>
                    {columns.map((col, index2) => (
                      <TableCell
                        key={index2}
                        align={col.alignRight ? 'right' : 'left'}
                      >
                        {row[col.id].render
                          ? row[col.id].render(
                              {
                                row,
                                ...rowProps,
                              },
                              row[col.id],
                            )
                          : row[col.id].value}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={(e, newPage) => {
            handleChangePage(newPage);
          }}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Fragment>
    );
  },
);

export default TableBuilder;
