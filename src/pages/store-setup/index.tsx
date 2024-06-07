// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Components Imports
import Store from 'src/views/store-setup/Store'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const StoreSetup = () => {
  return (
    <>
      <DatePickerWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Store/>
          </Grid>
        </Grid>
      </DatePickerWrapper>
    </>
  )
}

export default StoreSetup
