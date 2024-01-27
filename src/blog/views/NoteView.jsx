import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"

export const NoteView = () => {
  return (
    <Grid 
      container 
      direction='row' 
      justifyContent='space-between' 
      alignItems='center' 
      sx={{ mb: 1 }}
      className='animate__animated animate__fadeIn animate__faster'
    >
      <Grid item>
        <Typography fontSize={ 39 } fontWeight='light'>28 Agosto 2023</Typography>
      </Grid>

    </Grid>
  )
}
