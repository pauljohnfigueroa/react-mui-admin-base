import { Box, Button, TextField, Typography } from '@mui/material'

import { Formik, Form } from 'formik'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import Avatar from '@mui/material/Avatar'

import { useLoginUser } from '../../hooks/useLoginUser'

const LoginForm = () => {
  const { loginUser, initialFormValues } = useLoginUser()

  const handleLoginUser = async values => {
    await loginUser(values.email, values.password)
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h1">Sign In</Typography>
      </Box>
      <Formik
        initialValues={initialFormValues}
        onSubmit={(values, action) => handleLoginUser(values)}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <Form>
            <Box display="grid" gap="30px" minWidth="300px">
              <TextField
                fullWidth
                autoFocus
                name="email"
                id="email"
                label="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextField
                fullWidth
                name="password"
                id="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Box>
            <Box display="grid" gap="30px" minWidth="300px" height="50px" marginTop="40px">
              <Button
                type="submit"
                onSubmit={handleSubmit}
                variant="contained"
                //onClick={() => setUserData(values)}
              >
                Login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default LoginForm
