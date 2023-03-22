import { Box, useTheme, Typography } from '@mui/material'
import Header from '../../components/header/Header.component'
import LineChart from '../../components/line-chart/LineChart.component'

const Line = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Visual representation of data in a line chart." />
      <Box height="70vh">
        <LineChart />
      </Box>
    </Box>
  )
}
export default Line
