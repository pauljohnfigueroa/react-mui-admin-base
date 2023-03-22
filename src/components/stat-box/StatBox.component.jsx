import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'

import ProgressCircle from '../progress-circle/ProgressCircle.component'

const StatBox = ({ icon, title, subtitle, progress, increase }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box width="100%" m="0 20px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography variant="h4" fontWeight="bold" sx={{ color: colors.grey[100] }}>
            {title}
          </Typography>
        </Box>

        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" sx={{ color: colors.greenAccent[600] }}>
          {subtitle}
        </Typography>
        <Typography variant="h5" fontStyle="italic" sx={{ color: colors.greenAccent[600] }}>
          {increase}
        </Typography>
      </Box>
    </Box>
  )
}
export default StatBox
