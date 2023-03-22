import { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
import { useTheme, Box, IconButton } from '@mui/material'
import { ColorModeContext, tokens } from '../../theme'
import InputBase from '@mui/material/InputBase'

// MUI Icons
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import SearchIcon from '@mui/icons-material/Search'

import { useLogoutUser } from '../../hooks/useLogoutUser'

const Topbar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)

  const { logoutUser } = useLogoutUser()

  //const navigate = useNavigate()

  const handleClick = (e, path) => {
    alert(path)
    //navigate(path)
  }

  const handleLogoutUser = async () => {
    logoutUser()
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </IconButton>
        <IconButton onClick={e => handleClick(e, '/notifications')}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton onClick={e => handleClick(e, '/settings')}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleLogoutUser}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
export default Topbar
