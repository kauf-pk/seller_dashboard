// ** React Imports
// ** MUI Imports
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import ImageUpload from 'src/@core/components/image-upload'

const ProductPhotos = () => {
  return (
    <>
      <Paper sx={{width: '100%', overflow: 'hidden', p: 3}}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Box border={'1px dashed black'} padding={5}>
              <ImageUpload/>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default ProductPhotos
