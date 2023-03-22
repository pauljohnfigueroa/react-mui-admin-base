import { useContext, useState, useEffect } from 'react'
import { Box, Stack, IconButton, Typography, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import LinearProgress from '@mui/material/LinearProgress'

// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
// import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'

import Header from '../../components/header/Header.component'
import UserForm from './UserForm.component'
import ConfirmDialogForm from '../../components/dialog/ConfirmDialog.component'

import { UsersContext } from '../../contexts/users.context'
import { tokens } from '../../theme'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useUsersContext } from '../../hooks/useUsersContext'

const Users = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const [checkedIds, setCheckedIds] = useState([])

  const { users, dispatch } = useUsersContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`http://localhost:4000/api/user`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      // check for errors
      if (!response.ok) {
        setError(json.error)
      }

      if (response.ok) {
        //this will invoke the reducer function in UserContextProvider
        dispatch({ type: 'users/get', payload: json })
        setIsLoading(false)
        setError(null)
      }
    }

    // if we don't have a logged in user,
    // don't fetch the users from the database
    if (user) {
      fetchUsers()
    }
  }, [dispatch, user])

  // Delete User/s
  const handleDeleteUsers = async () => {
    // Delete item/s from the database - Backend
    checkedIds.map(async id => {
      await fetch(`http://localhost:4000/api/user/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
    })

    // // Remove the item/s from the DataGrid - Frontend
    dispatch({ type: 'users/delete', payload: checkedIds })
    setIsConfirmDialogOpen(false)
  }

  const DeleteUserDialog = () => {
    setIsConfirmDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsConfirmDialogOpen(false)
    console.log('Dialog closed.')
  }

  const { isCreateUserFormOpen, pageSize, setPageSize, showEditForm, showCreateForm } =
    useContext(UsersContext)

  const CustomNoRowsOverlay = () => {
    return error ? <Box sx={{ mt: 1 }}>{error}</Box> : <Box sx={{ mt: 1 }}>No Data.</Box>
  }

  const columns = [
    {
      field: '_id',
      headerName: 'ID'
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
      editable: true
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1
    },
    {
      field: 'password',
      headerName: 'Password',
      headerAlign: 'left',
      align: 'left'
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      flex: 1
    },
    {
      field: 'roles',
      headerName: 'Roles',
      flex: 1,
      renderCell: ({ row: { roles } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]}>{roles}</Typography>
          </Box>
        )
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: rowdata => {
        return (
          <Box>
            <IconButton onClick={() => showEditForm(rowdata.row)}>
              <ModeEditOutlineOutlinedIcon />
            </IconButton>
          </Box>
        )
      }
    }
  ]

  return (
    <Box m="20px">
      <Header
        title="User Management Console"
        subtitle="Manage user accounts, role, and authorization."
      />
      <Box m="10px 0 0 0">
        <Stack spacing={2} direction="row">
          <Button onClick={showCreateForm} variant="outlined">
            Add User
          </Button>
          <Button
            disabled={checkedIds.length ? false : true}
            onClick={DeleteUserDialog}
            variant="outlined"
          >
            Delete Selected
          </Button>
        </Stack>
      </Box>

      {isCreateUserFormOpen && <UserForm />}
      {isConfirmDialogOpen && (
        <ConfirmDialogForm
          open={isConfirmDialogOpen}
          handleClose={handleCloseDialog}
          handleConfirm={handleDeleteUsers}
          confirmationStr="delete"
        />
      )}
      <Box
        m="10px 0 0 0"
        height="100vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none'
          },
          // '& .MuiDataGrid-cell': {
          //     borderBottom: 'none'
          // },
          '& .name-column--cell': {
            color: colors.greenAccent[400]
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.primary[400],
            borderBottom: 'none'
          },
          // '& .MuiDataGrid-virtualScroller': {
          //     backgroundColor: colors.primary[500],
          //     zIndex: -1
          // },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.primary[400]
          }
        }}
      >
        {error && <p>Error: {error} </p>}

        <DataGrid
          getRowId={row => row._id}
          sx={{
            boxShadow: 4
          }}
          components={{
            Toolbar: GridToolbar,
            LoadingOverlay: LinearProgress,
            NoRowsOverlay: CustomNoRowsOverlay
          }}
          experimentalFeatures={{ newEditingApi: false }}
          loading={isLoading}
          pageSize={pageSize}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          rows={users ? users : []}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={ids => {
            // pass the ids to a state
            console.log(ids)
            setCheckedIds(ids)
          }}
        />
      </Box>
    </Box>
  )
}

export default Users
