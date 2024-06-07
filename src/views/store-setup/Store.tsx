// ** React Imports
import {ChangeEvent, ElementType, forwardRef, MouseEvent, useEffect, useState} from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import {SelectChangeEvent} from '@mui/material/Select'
import Box from '@mui/material/Box'
import {styled, Theme, useTheme} from '@mui/material/styles'
import Button, {ButtonProps} from '@mui/material/Button'

// ** Third Party Imports

// ** Icons Imports
import dynamic from 'next/dynamic'
import TextFieldController from 'src/@core/components/text-field-controller'
import {SubmitHandler, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {storeFormSchema} from 'src/@core/schema'
import useAxios from 'src/@core/hooks/useAxios'
import {enqueueSnackbar} from 'notistack'
import {useRouter} from 'next/router'
import {LoadingButton} from '@mui/lab'

const CustomMap = dynamic(() => import('src/@core/components/custom-map'), {ssr: false})

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
]

function getMultiSelectStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
  }
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

interface State {
  password: string
  password2: string
  showPassword: boolean
  showPassword2: boolean
}

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Birth Date' autoComplete='off'/>
})

const ImgStyled = styled('img')(({theme}) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({theme}) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const StoreInformation = () => {
  // ** States

  const [language, setLanguage] = useState<string[]>([])
  const [date, setDate] = useState<Date | null | undefined>(null)
  const [values, setValues] = useState<State>({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [personName, setPersonName] = useState<string[]>([])

  // hooks
  const theme = useTheme()
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: {errors, isValid, isDirty}
  } = useForm({
    defaultValues: {
      businessName: '',
      businessContact1: '',
      businessContact2: '',
      tagline: '',
      ownerName: '',
      ownerCnic: '',
      ownerDob: '',
      businessAddress: '',
      city: '',
      district: '',
      province: '',
      accountNumber: '',
      accountType: '',
      bankDetail: '',
      comments: ''
    },
    resolver: yupResolver(storeFormSchema)
  })
  const {data, error, loading, sendRequest} = useAxios<any>({
    url: '/business/addBusiness',
    method: 'POST'
  })

  // Handle Password
  const handlePasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [prop]: event.target.value})
  }
  const handleClickShowPassword = () => {
    setValues({...values, showPassword: !values.showPassword})
  }
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [prop]: event.target.value})
  }
  const handleClickShowConfirmPassword = () => {
    setValues({...values, showPassword2: !values.showPassword2})
  }
  const handleMouseDownConfirmPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // Handle Select
  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    setLanguage(event.target.value as string[])
  }

  // Handle Upload
  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const {files} = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }

  // Handle Multi-Select
  const handleMultiSelectChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: {value}
    } = event
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const onSubmit: SubmitHandler<any> = formData => {
    const data = {
      ...formData,
      ownerPic: 'https://deploy.com/ownser_pic.jpg',
      location: {
        type: 'Point',
        coordinates: [33.76643483541374, 72.82593471484259]
      },
      businessLogo: 'https://deploy.com/business_logo.jpg',
      cnicFrontPicture: 'https://deploy.com/cnic_front.jpg',
      cnicBackPicture: 'https://deploy.com/cnic_back.jpg',
      isPending: false
    }

    console.log('formData', formData)
    console.log('payload', data)
    sendRequest({data})
  }

  useEffect(() => {
    if (data) {
      enqueueSnackbar('Store updated successfully!', {variant: 'success'})
      router.push('/store-details')
    }
  }, [data])

  useEffect(() => {
    if (error) enqueueSnackbar('Something went wrong!', {variant: 'error'})
  }, [error])

  return (
    <Card>
      <CardHeader title='Store Details' titleTypographyProps={{variant: 'h6'}}/>
      <Divider sx={{margin: 0}}/>
      <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <TextFieldController
                fieldName='businessName'
                placeholder='ABC, Inc.'
                control={control}
                errors={errors}
                labelText={'Legal Business Name'}
                fullWidth
                type='text'
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextFieldController
                fieldName='businessContact1'
                placeholder='+92-123-1234567'
                control={control}
                errors={errors}
                labelText={'Business Contact No. 1'}
                fullWidth
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldController
                fieldName='businessContact2'
                placeholder='+92-123-1234567'
                control={control}
                errors={errors}
                labelText={'Business Contact No. 2'}
                fullWidth
                type='text'
              />
            </Grid>

            <Grid item xs={12}>
              <TextFieldController
                fieldName='tagline'
                placeholder='Write a short tagline here'
                control={control}
                errors={errors}
                labelText={'Tagline'}
                fullWidth
                multiline
                minRows={3}
                type='text'
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <ImgStyled src={imgSrc} alt='Store Pic'/>
                <Box>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    Upload New Photo
                    <input
                      hidden
                      type='file'
                      onChange={onChange}
                      accept='image/png, image/jpeg'
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled
                    color='error'
                    variant='outlined'
                    onClick={() => setImgSrc('/images/avatars/1.png')}
                  >
                    Reset
                  </ResetButtonStyled>
                  <Typography variant='body2' sx={{marginTop: 5}}>
                    Allowed PNG or JPEG. Max size of 800K.
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextFieldController
                fieldName='ownerName'
                placeholder='Enter owner name here'
                control={control}
                errors={errors}
                labelText={'Owner Name'}
                fullWidth
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldController
                fieldName='ownerCnic'
                placeholder='12345-1234567-1'
                control={control}
                errors={errors}
                labelText={'Owner CNIC'}
                fullWidth
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldController
                fieldName='ownerDob'
                placeholder='YYYY-MM-DD'
                control={control}
                errors={errors}
                labelText={'Owner DOB'}
                fullWidth
                type='text'
              />
            </Grid>
            <Grid item xs={0} sm={6}/>

            <Grid item xs={12} sm={6}>
              <TextFieldController
                fieldName='businessAddress'
                placeholder='456 Street # 20, Main Road'
                control={control}
                errors={errors}
                labelText={'Address'}
                fullWidth
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldController
                fieldName='city'
                placeholder='ABC City'
                control={control}
                errors={errors}
                labelText={'City'}
                fullWidth
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldController
                fieldName='district'
                placeholder='District'
                control={control}
                errors={errors}
                labelText={'District'}
                fullWidth
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldController
                fieldName='province'
                placeholder='Province'
                control={control}
                errors={errors}
                labelText={'Province'}
                fullWidth
                type='text'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField fullWidth label='Locate on Map' placeholder='Selected location will show here'/>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1' fontWeight={'bold'}>
                Click anywhere on the map to get your current location
              </Typography>
              <CustomMap/>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextFieldController
                fieldName='accountNumber'
                placeholder='Enter your account number here'
                control={control}
                errors={errors}
                labelText={'Account Number'}
                fullWidth
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldController
                fieldName='accountType'
                placeholder='Enter your account type here'
                control={control}
                errors={errors}
                labelText={'Account Type'}
                fullWidth
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldController
                fieldName='bankDetail'
                placeholder='Enter bank name here'
                control={control}
                errors={errors}
                labelText={'Bank Name'}
                fullWidth
                type='text'
              />
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-multiple-chip-label'>Categories</InputLabel>
                <Select
                  labelId='demo-multiple-chip-label'
                  id='demo-multiple-chip'
                  multiple
                  value={personName}
                  onChange={handleMultiSelectChange}
                  input={<OutlinedInput id='select-multiple-chip' label='Categories' />}
                  renderValue={selected => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map(value => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map(name => (
                    <MenuItem key={name} value={name} style={getMultiSelectStyles(name, personName, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={12}>
              <TextFieldController
                fieldName='comments'
                placeholder='Write here'
                control={control}
                errors={errors}
                labelText={'Comments'}
                fullWidth
                multiline
                minRows={3}
                type='text'
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{margin: 0}}/>
        <CardActions>
          <LoadingButton loading={loading} size='large' type='submit' variant='contained'>
            Save
          </LoadingButton>
        </CardActions>
      </form>
    </Card>
  )
}

export default StoreInformation
