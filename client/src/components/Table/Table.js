import React, { useMemo } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
import './Table.css';
import GlobalFilter from './GlobalFilter';
import { Grid, Icon, IconButton, colors, Box } from '@mui/material';
import { Button } from '@mui/material';
import { Edit, Height, Maximize } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Table = () => {
  const navigate = useNavigate();
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    prepareRow,
    pageOptions,
    gotoPage,
    pageCount,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, usePagination);

  const { pageIndex } = state;

  const { globalFilter } = state;

  return (
    <Grid
      sx={{
        width: '100%',
      }}
    >
      <Grid
        display={'flex'}
        sx={{
          margin: '20px',
          justifyContent: 'space-between',
        }}
      >
        <Grid minWidth={'50%'}>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </Grid>
        <Grid
          sx={{
            margin: '20px',
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#B514EE', // Set the initial background color
              ':hover': {
                backgroundColor: '#B514EE',
                outlineColor: '#B514EE', // Change background color on hover
              },
              ':active': {
                backgroundColor: colors.purple[700], // Change background color when active (clicked)
              },

              borderRadius: '20px',
              marginLeft: '20px',
            }}
          >
            Add Employee
          </Button>
        </Grid>
      </Grid>

      <Grid
        sx={{
          margin: '20px',
        }}
      >
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                <th>Edit</th>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Headers')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  <td align="center">
                    <IconButton
                      sx={{
                        backgroundColor: '#B514EE', // Set the initial background color
                        ':hover': {
                          backgroundColor: '#B514EE',
                          outlineColor: '#B514EE', // Change background color on hover
                        },
                        ':active': {
                          backgroundColor: colors.purple[700], // Change background color when active (clicked)
                        },

                        borderRadius: '20px',
                        marginLeft: '20px',
                      }}
                      onClick={() => {
                        navigate('/profile', {
                          state: {
                            id: row.original.id,
                            first_name: row.original.first_name,
                            last_name: row.original.last_name,
                          },
                        });
                      }}
                    >
                      <Edit
                        sx={{
                          color: '#FFFFFF',
                        }}
                      />
                    </IconButton>
                  </td>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Grid>

      <Grid
        sx={{
          margin: '20px',
          maxHeight: '30px',

          justifyContent: 'right',
          marginLeft: '100%',
          display: 'flex',
        }}
        spacing={2}
      >
        {/* <Typography
          variant="body1"
          sx={{
            marginRight: '20px',
            display: 'flex',
          }}
        >
          Page{' '} */}
        {/* <Box
          sx={{
            marginRight: '30px',
            display: 'flex',
          }}
        >
          {pageIndex + 1} of {pageOptions.length}
        </Box>{' '} */}
        {/* </Typography> */}
        {/* <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: '50px' }}
          />
        </span> */}
        <Button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          sx={{
            backgroundColor: '#B514EE', // Set the initial background color
            ':hover': {
              backgroundColor: '#B514EE',
              outlineColor: '#B514EE', // Change background color on hover
            },
            ':active': {
              backgroundColor: colors.purple[700], // Change background color when active (clicked)
            },

            borderRadius: '20px',
            marginLeft: '20px',

            fontWeight: 700,
            fontSize: '20px',
            color: '#FFFFFF',
          }}
        >
          {'<<'}
        </Button>
        <Button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          sx={{
            backgroundColor: '#B514EE', // Set the initial background color
            ':hover': {
              backgroundColor: '#B514EE',
              outlineColor: '#B514EE', // Change background color on hover
            },
            ':active': {
              backgroundColor: colors.purple[700], // Change background color when active (clicked)
            },

            borderRadius: '20px',
            marginLeft: '20px',

            fontWeight: 700,
            fontSize: '20px',
            color: '#FFFFFF',
          }}
        >
          {'<'}
        </Button>
        <Button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          sx={{
            backgroundColor: '#B514EE', // Set the initial background color
            ':hover': {
              backgroundColor: '#B514EE',
              outlineColor: '#B514EE', // Change background color on hover
            },
            ':active': {
              backgroundColor: colors.purple[700], // Change background color when active (clicked)
            },

            borderRadius: '20px',
            marginLeft: '20px',

            fontWeight: 700,
            fontSize: '20px',
            color: '#FFFFFF',
          }}
        >
          {'>'}
        </Button>
        <Button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          sx={{
            backgroundColor: '#B514EE', // Set the initial background color
            ':hover': {
              backgroundColor: '#B514EE',
              outlineColor: '#B514EE', // Change background color on hover
            },
            ':active': {
              backgroundColor: colors.purple[700], // Change background color when active (clicked)
            },

            borderRadius: '20px',
            marginLeft: '20px',

            fontWeight: 700,
            fontSize: '20px',
            color: '#FFFFFF',
          }}
        >
          {'>>'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Table;
