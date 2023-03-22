import { createContext, useEffect, useState } from 'react'

export const InvoicesContext = createContext()
// export const InvoicesContext = createContext(
//   {
//     gridData: [],
//     fetchError: null,
//     isLoading: true,
//     pageSize: 5,
//     setPageSize: () => { }
//   }
// )

export const InvoicesProvider = ({ children }) => {
  const API_URL = 'http://localhost:3500/mockDataInvoices'

  const [gridData, setGridData] = useState([])
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [pageSize, setPageSize] = useState(5)

  const value = { gridData, fetchError, isLoading, pageSize, setPageSize }

  return <InvoicesContext.Provider value={value}>{children}</InvoicesContext.Provider>
}
