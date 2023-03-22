import { createContext, useState, useEffect } from 'react'
import bcrypt from 'bcryptjs-react'
import apiRequest from '../api/apiRequest.api'

import { useAuthContext } from '../hooks/useAuthContext'

const API_URL = 'http://localhost:3500/users'

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

  const { user } = useAuthContext()

  const [gridData, setGridData] = useState([])
  const [isCreateUserFormOpen, setIsCreateUserFormOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [pageSize, setPageSize] = useState(5)
  const [checkedItemsIds, setCheckedItemsIds] = useState([])
  const [initFormValues, setInitFormValues] = useState(initialValues)
  const [formValues, setFormValues] = useState([])
  const [formLabel, setFormLabel] = useState('')

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:4000/api/user`, {
  //         headers: {
  //           Authorization: `Bearer ${user.token}`
  //         }
  //       })
  //       if (!response.ok) throw Error('Did not receive the expected data.')
  //       if (response.ok) {
  //         //dispatch
  //       }
  //       const listItems = await response.json()
  //       setGridData(listItems)
  //       setFetchError(null)
  //     } catch (err) {
  //       console.log(err.message)
  //       setFetchError(err.message)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  //   if (user) {
  //     fetchItems()
  //   }

  // }, [user])

  // const handleAddItem = async values => {
  //   // get the last id
  //   const response = await fetch(API_URL)
  //   const data = await response.json()
  //   const id = data.length ? data[data.length - 1].id + 1 : 1
  //   const salt = bcrypt.genSaltSync(5)
  //   const hashedPassword = bcrypt.hashSync(values.password, salt)
  //   const newItem = { ...values, password: hashedPassword, id }

  //   // Insert record in the backend
  //   const result = await apiRequest('/api/user/register', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(newItem)
  //   })

  //   if (result) setFetchError(result)
  //   setIsCreateUserFormOpen(false)

  //   // update the front-end
  //   const listItems = [...data, newItem]
  //   setGridData(listItems)
  // }

  const handleUpdateItem = async () => {
    // update the backend
    const item = gridData.filter(row => row.id === formValues.id)
    const updatedRow = JSON.stringify({ ...item[0], ...formValues })
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: updatedRow
    }

    const result = await apiRequest(`${API_URL}/${formValues.id}`, updateOptions)
    if (result) setFetchError(result)
    setIsCreateUserFormOpen(false)

    // update the front-end
    const response = await fetch(API_URL)
    const data = await response.json()
    setGridData([...data])
  }

  // const handleDeleteMultiple = () => {
  //   const items = gridData.filter(item => !checkedItemsIds.includes(item.id))
  //   // remove the item/s from the front-end
  //   setGridData(items)
  //   //console.log(checkedItemsIds)
  //   // delete items from the backend
  //   const deleteOptions = { method: 'DELETE' }
  //   checkedItemsIds.map(async id => {
  //     const results = await apiRequest(`${API_URL}/${id}`, deleteOptions)
  //     if (results) setFetchError(results)
  //   })
  //   setIsCreateUserFormOpen(false)
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
    isLoading,
    fetchError,
    gridData,
    isCreateUserFormOpen,
    setIsCreateUserFormOpen,
    pageSize,
    setPageSize,
    setFetchError,
    setGridData,
    // handleAddItem,
    handleUpdateItem,
    // handleDeleteMultiple,
    showEditForm,
    setCheckedItemsIds,
    showCreateForm,
    formValues,
    formLabel,
    setFormValues,
    API_URL
  }

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}
