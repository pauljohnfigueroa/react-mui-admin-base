import { Box } from '@mui/material'
import Header from '../../components/header/Header.component'
import BarChart from '../../components/bar-chart/BarChart.component'

const Bar = () => {
  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Visual representation of data." />
      <Box height="70vh">
        <BarChart />
      </Box>
    </Box>
  )
}
export default Bar
