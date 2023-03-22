import { useContext } from 'react'
import { Box, LinearProgress, Typography, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { tokens } from '../../theme'

import Header from '../../components/header/Header.component'

import { InvoicesContext } from '../../contexts/invoices.context'

const Invoices = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const { gridData, fetchError, isLoading, pageSize, setPageSize } = useContext(InvoicesContext)

  const CustomNoRowsOverlay = () => {
    return fetchError ? <Box sx={{ mt: 1 }}>{fetchError}</Box> : <Box sx={{ mt: 1 }}>No Data.</Box>
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ID'
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell'
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: params => (
        <Typography color={colors.greenAccent[500]}>${params.row.cost}</Typography>
      )
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      flex: 1
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1
    }
  ]

  return (
    <Box m="20px">
      <Header title="Invoices" subtitle="List of Invoice Balances." />
      <Box
        m="40px 0 0 0"
        height="100vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none'
          },
          '& .name-column--cell': {
            color: colors.greenAccent[400]
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.primary[400],
            borderBottom: 'none'
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.primary[400]
          },
          '& .MuiDataGrid-checkbox': {
            color: `${colors.greenAccent[200]} !important`
          }
        }}
      >
        {fetchError && <p>Error: {fetchError} </p>}

        <DataGrid
          components={{
            Toolbar: GridToolbar,
            LoadingOverlay: LinearProgress,
            NoRowsOverlay: CustomNoRowsOverlay
          }}
          loading={isLoading}
          pageSize={pageSize}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
          rows={gridData}
          columns={columns}
        />
      </Box>
    </Box>
  )
}
export default Invoices
