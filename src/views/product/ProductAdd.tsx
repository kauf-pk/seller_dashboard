import LoadingButton from '@mui/lab/LoadingButton'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import {useRouter} from 'next/router'
import {enqueueSnackbar} from 'notistack'
import React, {useEffect, useState} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import TextFieldController from 'src/@core/components/text-field-controller'
import useAxios from 'src/@core/hooks/useAxios'
import {yupResolver} from '@hookform/resolvers/yup'
import {productFormSchema} from 'src/@core/schema'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import Box from '@mui/material/Box'
import ImageUpload from 'src/@core/components/image-upload'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'

const ProductAdd = () => {
  const [checked, setChecked] = useState(true)
  const [categoryStateData, setCategoryStateData] = useState<string[]>([])
  const [selectedCategoryData, setSelectedCategoryData] = useState<any>()

  const router = useRouter()
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid, isDirty}
  } = useForm({
    defaultValues: {
      name: '',
      qty: '',
      brand: '',
      barCode: '',
      batchNo: '',
      description: '',
      costPrice: '',
      salePrice: '',
      discountPercentage: ''
    },
    resolver: yupResolver(productFormSchema)
  })

  const {data, error, loading, sendRequest} = useAxios<any>({
    url: '/product/addProduct',
    method: 'POST'
  })
  const {
    data: businessData,
    error: businessError,
    loading: businessLoading,
    sendRequest: sendBusinessGetRequest
  } = useAxios<any>({
    url: '/business/getBusiness',
    method: 'GET'
  })
  const {
    data: getCategoryData,
    error: getCategoryError,
    loading: getCategoryLoading,
    sendRequest: sendCategoryGetRequest
  } = useAxios<any>({
    url: `/category/getCategory`,
    method: 'GET'
  })

  const onSubmit: SubmitHandler<any> = formData => {
    const data = {
      ...formData,
      businessId: businessData?._id,
      categoryId: selectedCategoryData?._id,
      packingMode: 'Box',
      reOrderLevel: 20,
      isActive: checked
    }

    console.log('formData', formData)

    console.log('payload', data)

    sendRequest({data})
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }

  const handleChip = (item: any) => {
    console.log('item', item)
    setSelectedCategoryData(item)
  }

  useEffect(() => {
    sendBusinessGetRequest()
    sendCategoryGetRequest()
  }, [])

  useEffect(() => {
    if (data) {
      enqueueSnackbar('New product added successfully!', {variant: 'success'})
      reset()
      router.push('/products')
    }
  }, [data])

  useEffect(() => {
    if (error) enqueueSnackbar('Something went wrong!', {variant: 'error'})
  }, [error])

  // handle success
  //   useEffect(() => {
  //     if (businessData) {
  //       enqueueSnackbar('Business data fetched successfully!', { variant: 'success' })
  //     }
  //   }, [businessData])
  useEffect(() => {
    if (getCategoryData) {
      //   enqueueSnackbar('Category data fetched successfully!', { variant: 'success' })
      setCategoryStateData(getCategoryData)
    }
  }, [getCategoryData])

  // handle error
  useEffect(() => {
    if (businessError) enqueueSnackbar('Something went wrong!', {variant: 'error'})
  }, [businessError])
  useEffect(() => {
    if (getCategoryError) enqueueSnackbar('Something went wrong!', {variant: 'error'})
  }, [getCategoryError])

  console.log('checked', checked)

  return (
    <>
      <Card>
        <CardHeader title='Add new product' titleTypographyProps={{variant: 'h6'}}/>

        <Divider sx={{margin: 0}}/>
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={10}>
                <TextFieldController
                  fieldName='name'
                  placeholder='Graphic card GIGABYTE GeForce RTX 3050'
                  control={control}
                  errors={errors}
                  labelText={'Title'}
                  fullWidth
                  type='text'
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextFieldController
                  fieldName='qty'
                  placeholder='0'
                  control={control}
                  errors={errors}
                  labelText={'Number of Units'}
                  fullWidth
                  type='text'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldController
                  fieldName='brand'
                  placeholder='NVIDIA'
                  control={control}
                  errors={errors}
                  labelText={'Brand'}
                  fullWidth
                  type='text'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextFieldController
                  fieldName='barCode'
                  placeholder='0'
                  control={control}
                  errors={errors}
                  labelText={'Bar Code'}
                  fullWidth
                  type='text'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextFieldController
                  fieldName='batchNo'
                  placeholder='0'
                  control={control}
                  errors={errors}
                  labelText={'Batch No.'}
                  fullWidth
                  type='text'
                />
              </Grid>

              <Grid item xs={12} sm={10}>
                <TextFieldController
                  fieldName='description'
                  placeholder='The NVIDIA RTX 3050 graphics card is a design equipped with 8GB of GDDR6 memory, supports PCI-E 4.0 and offers a number of unique technologies from NVIDIA to enhance the smoothness and high quality of generated graphics. At the same time, it provides support for Ray Tracing, allowing you to enjoy photorealistic graphics.'
                  control={control}
                  errors={errors}
                  labelText={'Description'}
                  fullWidth
                  type='text'
                  multiline
                  minRows={13}
                  sx={{'& .MuiOutlinedInpu3-root': {alignItems: 'baseline'}}}
                />
              </Grid>

              <Grid item container xs={12} sm={2} spacing={2}>
                <Grid item xs={12}>
                  <TextFieldController
                    fieldName='costPrice'
                    placeholder='0'
                    control={control}
                    errors={errors}
                    labelText={'Cost price'}
                    fullWidth
                    type='text'
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextFieldController
                    fieldName='salePrice'
                    placeholder='0'
                    control={control}
                    errors={errors}
                    labelText={'Sale price'}
                    fullWidth
                    type='text'
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextFieldController
                    fieldName='discountPercentage'
                    placeholder='0'
                    control={control}
                    errors={errors}
                    labelText={'Discount (%)'}
                    fullWidth
                    type='text'
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControlLabel control={<Switch checked={checked} onChange={handleChange}/>} label='Active'/>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12}>
                <Paper
                  sx={{
                    p: 5
                  }}
                >
                  <Typography variant='body1' fontWeight={'bold'}>
                    Available Categories
                  </Typography>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'start',
                      flexWrap: 'wrap',
                      pt: 3,
                      gap: 3
                    }}
                  >
                    {categoryStateData?.map((itemData: any) => {
                      return (
                        <Box key={itemData?.name}>
                          <Chip
                            variant={selectedCategoryData?.name === itemData?.name ? 'filled' : 'outlined'}
                            color='primary'
                            label={itemData?.name}
                            onClick={() => handleChip(itemData)}
                          />
                        </Box>
                      )
                    })}
                  </Box>

                  {getCategoryLoading ? <CircularProgress size={30}/> : null}
                </Paper>
              </Grid>

              <Grid item xs={12}>
                <ImageUpload/>
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
    </>
  )
}

export default ProductAdd
