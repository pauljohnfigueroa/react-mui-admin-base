import { createContext, useState } from 'react'
// import apiRequest from '../api/apiRequest.api'

// import { useAuthContext } from '../hooks/useAuthContext'

// const API_URL = 'http://localhost:3500/users'

const initialValues = {
  _id: null,
  name: '',
  email: '',
  password: '',
  phone: '',
  roles: ''
}

export const UsersContext = createContext()

export const UsersProvider = ({ children }) => {

  // const { user } = useAuthContext()

  const [gridData, setGridData] = useState([])
  const [isCreateUserFormOpen, setIsCreateUserFormOpen] = useState(false)
  // const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [pageSize, setPageSize] = useState(5)
  const [initFormValues, setInitFormValues] = useState(initialValues)
  const [formValues, setFormValues] = useState([])
  const [formLabel, setFormLabel] = useState('')

  // const handleUpdateItem = async () => {
  //   // update the backend
  //   const item = gridData.filter(row => row.id === formValues.id)
  //   const updatedRow = JSON.stringify({ ...item[0], ...formValues })
  //   const updateOptions = {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: updatedRow
  //   }

  //   const result = await apiRequest(`${API_URL}/${formValues.id}`, updateOptions)
  //   if (result) setFetchError(result)
  //   setIsCreateUserFormOpen(false)

  //   // update the front-end
  //   const response = await fetch(API_URL)
  //   const data = await response.json()
  //   setGridData([...data])
  // }

  const showEditForm = row => {
    setFormLabel('Update User Information')
    setInitFormValues(row)
    setIsCreateUserFormOpen(true)
  }

  const showCreateForm = () => {
    setFormLabel('Create a New User')
    setInitFormValues(initialValues)
    setIsCreateUserFormOpen(true)
  }

  const value = {
    initialValues,
    initFormValues,
    setInitFormValues,
    // isLoading,
    fetchError,
    gridData,
    isCreateUserFormOpen,
    setIsCreateUserFormOpen,
    pageSize,
    setPageSize,
    setFetchError,
    setGridData,
    // handleAddItem,
    // handleUpdateItem,
    // handleDeleteMultiple,
    showEditForm,
    // setCheckedItemsIds,
    showCreateForm,
    formValues,
    formLabel,
    setFormValues,
    // API_URL
  }

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}
