import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { Formik, Form } from 'formik'
import * as yup from 'yup'

const ConfirmDialogForm = ({ open, confirmationStr, handleClose, handleConfirm }) => {
  const initialValues = {
    confirmation: ''
  }

  const dialogSchema = yup.object().shape({
    confirmation: yup
      .string()
      .matches(confirmationStr, `Please type "${confirmationStr}" to confirm action.`)
      .required('Required')
  })

  const handleConfirmSubmit = values => {
    if (values.confirmation !== confirmationStr) {
      console.log(confirmationStr)
      return
    }
    handleConfirm()
  }

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are going to delete record/s from the database. Please type <em>delete</em> to
            confirm action.
          </DialogContentText>
          <Formik
            onSubmit={values => {
              handleConfirmSubmit(values)
            }}
            initialValues={initialValues}
            validationSchema={dialogSchema}
          >
            {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
              <Form>
                <TextField
                  fullWidth
                  margin="dense"
                  label="Confirm Action"
                  type="text"
                  variant="outlined"
                  value={values.confirmation}
                  name="confirmation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.confirmation && !!errors.confirmation}
                  helperText={touched.confirmation && errors.confirmation}
                />
                <DialogActions>
                  <Button onClick={handleClose} variant="contained">
                    Cancel
                  </Button>
                  <Button
                    disabled={values.confirmation !== confirmationStr ? true : false}
                    type="submit"
                    sx={{ minWidth: 100 }}
                    variant="outlined"
                  >
                    Delete
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

export default ConfirmDialogForm
