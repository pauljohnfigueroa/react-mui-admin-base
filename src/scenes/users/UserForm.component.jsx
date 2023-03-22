import { useContext, useState } from 'react'
import { useRegisterUser } from '../../hooks/useRegisterUser'

import { Formik, Form } from 'formik'
// import * as yup from 'yup'
import { Box, useMediaQuery, InputLabel, MenuItem, Select, FormControl } from '@mui/material'

// MUI
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { UsersContext } from '../../contexts/users.context'

import { useUsersContext } from '../../hooks/useUsersContext'
import { useAuthContext } from '../../hooks/useAuthContext'

const UserForm = () => {
  const isNonMobile = useMediaQuery('(min-width: 600px)')

  const [error, setError] = useState(null)
  const { registerUser } = useRegisterUser()
  const { dispatch } = useUsersContext()
  const { user } = useAuthContext()

  const {
    initFormValues,
    isCreateUserFormOpen,
    setIsCreateUserFormOpen,
    // handleUpdateItem,
    setFormValues,
    formLabel
  } = useContext(UsersContext)

  const handleClose = () => {
    setIsCreateUserFormOpen(false)
  }

  const handleRegisterUser = async values => {
    await registerUser(values.email, values.name, values.password, values.phone, values.roles)
    setIsCreateUserFormOpen(false)
  }

  const handleUpdateUser = async values => {
    // Delete item/s from the database - Backend
    const response = await fetch(`http://localhost:4000/api/user/${values._id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: JSON.stringify(values)
    })

    const json = await response.json()

    // check for errors
    if (!response.ok) {
      setError(json.error)
    }
    // Remove the item/s from the DataGrid - Frontend
    dispatch({ type: 'users/update', payload: values })
    setIsCreateUserFormOpen(false)
  }

  return (
    <div>
      {error && <div>{error}</div>}
      <Dialog open={isCreateUserFormOpen} onClose={handleClose} fullWidth>
        <DialogTitle>{formLabel}</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill up all the required ( * ) fields.</DialogContentText>
          <Formik
            onSubmit={
              initFormValues._id
                ? (values, actions) => {
                    handleUpdateUser(values)
                  }
                : (values, actions) => {
                    handleRegisterUser(values)
                  }
            }
            initialValues={initFormValues}
          >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <Form>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' }
                  }}
                >
                  <TextField
                    fullWidth
                    autoFocus
                    autoComplete="off"
                    margin="dense"
                    name="name"
                    id="name"
                    value={values.name}
                    label="Name"
                    type="text"
                    variant="outlined"
                    sx={{ gridColumn: 'span 4' }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />

                  <TextField
                    autoComplete="off"
                    fullWidth
                    margin="dense"
                    name="email"
                    id="email"
                    value={values.email}
                    label="Email"
                    type="email"
                    variant="outlined"
                    sx={{ gridColumn: 'span 4' }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />

                  <TextField
                    autoComplete="off"
                    fullWidth
                    autoFocus
                    margin="dense"
                    name="phone"
                    id="phone"
                    value={values.phone}
                    label="Phone"
                    type="text"
                    variant="outlined"
                    sx={{ gridColumn: 'span 4' }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  <TextField
                    autoComplete="off"
                    fullWidth
                    margin="dense"
                    name="password"
                    id="password"
                    value={values.password}
                    label="Password"
                    type="password"
                    variant="outlined"
                    sx={{ gridColumn: 'span 4' }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  <FormControl sx={{ m: 1, minWidth: 150 }} required>
                    <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="roles"
                      name="roles"
                      value={values.roles}
                      label="Roles"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="manager">Manager</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <DialogActions>
                  <Button sx={{ minWidth: 100 }} onClick={handleClose} variant="outlined">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    sx={{ minWidth: 100 }}
                    variant="contained"
                    onClick={values._id ? () => setFormValues(values) : undefined}
                  >
                    {values._id ? 'Update' : 'Save'}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default UserForm
