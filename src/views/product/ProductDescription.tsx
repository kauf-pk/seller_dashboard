// ** React Imports

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import TextField from '@mui/material/TextField'

const ProductDescription = () => {
  return (
    <Paper sx={{width: '100%', overflow: 'hidden', p: 3}}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant='h6'>Fill in the basic information about your item</Typography>
        </Grid>

        <Grid item xs={12} sm={8}>
          <TextField fullWidth label='Title' placeholder='Graphic card GIGABYTE GeForce RTX 3050'/>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField fullWidth label='Number of units available' placeholder='0'/>
        </Grid>

        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            multiline
            minRows={13}
            label='Description'
            placeholder='The NVIDIA RTX 3050 graphics card is a design equipped with 8GB of GDDR6 memory, supports PCI-E 4.0 and offers a number of unique technologies from NVIDIA to enhance the smoothness and high quality of generated graphics. At the same time, it provides support for Ray Tracing, allowing you to enjoy photorealistic graphics.'
            sx={{'& .MuiOutlinedInpu3-root': {alignItems: 'baseline'}}}
          />
        </Grid>

        <Grid item container xs={12} sm={4} spacing={2}>
          <Grid item xs={12}>
            <Typography variant='body1'>Dimensions (Optional)</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label='Length [mm]' placeholder='00'/>
          </Grid>
          <Grid item xs={0} sm={8}/>

          <Grid item xs={12} sm={4}>
            <TextField fullWidth label='Width [mm]' placeholder='00'/>
          </Grid>
          <Grid item xs={0} sm={8}/>

          <Grid item xs={12} sm={4}>
            <TextField fullWidth label='Height [mm]' placeholder='00'/>
          </Grid>
          <Grid item xs={0} sm={8}/>

          <Grid item xs={12}>
            <Typography variant='body1'>Price</Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField fullWidth placeholder='Product price in PKR (gross)  '/>
          </Grid>
          <Grid item xs={0} sm={4}/>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ProductDescription
