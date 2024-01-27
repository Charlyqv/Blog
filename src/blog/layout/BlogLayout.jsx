import { Box, Toolbar } from "@mui/material"
import { NavBar } from "../components/NavBar"
import { SideBar } from "../components/SideBar";
import { useUiStore } from "../../hooks";
import { BlogModal } from "../components";
import { AddNew } from "../components/AddNew";

const drawerWidth = 340;

export const BlogLayout = ({ children }) => {

  const { openDateModal } = useUiStore();

  return (
    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>

      <NavBar drawerWidth={ drawerWidth }/>

      <SideBar drawerWidth={ drawerWidth }/>

      <Box
        component='main'
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Toolbar/>

        { children }

      </Box>

    </Box>
  )
}
