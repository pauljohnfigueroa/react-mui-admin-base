import { Box } from '@mui/material'
import PieChart from '../../components/pie-chart/PieChart.component'
import Header from '../../components/header/Header.component'

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="A simple data visualization with a pie chart." />
      <Box height="70vh">
        <PieChart />
      </Box>
    </Box>
  )
}

export default Pie
