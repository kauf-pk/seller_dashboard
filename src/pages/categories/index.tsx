// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
// ** Components Imports
import Categories from 'src/views/categories/categories'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const StoreSetup = () => {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Categories/>
        </Grid>
      </Grid>
    </>
  )
}

export default StoreSetup
