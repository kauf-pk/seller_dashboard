import Grid from '@mui/material/Grid'
import React from 'react'
import StoreCard from 'src/views/store-setup/StoreCard'

const StoreDetails = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <StoreCard/>
        </Grid>
      </Grid>
    </>
  )
}

export default StoreDetails
