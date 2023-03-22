import { Box, useTheme } from '@mui/material'
import GeographyChart from '../../components/geography-chart/GeographyChart.component'
import Header from '../../components/header/Header.component'
import { tokens } from '../../theme'

const Geography = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box m="20px">
      <Header title="Geography Chart" subtitle="A nice geography chart." />
      <Box height="70vh" border={`1px solid ${colors.grey[100]}`}>
        <GeographyChart />
      </Box>
    </Box>
  )
}

export default Geography
