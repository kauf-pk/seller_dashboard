import React, {useEffect, useState} from 'react'

import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TextFieldController from 'src/@core/components/text-field-controller'
import {yupResolver} from '@hookform/resolvers/yup'
import {SubmitHandler, useForm} from 'react-hook-form'
import {categoryFormSchema} from 'src/@core/schema'
import {LoadingButton} from '@mui/lab'
import useAxios from 'src/@core/hooks/useAxios'
import {enqueueSnackbar} from 'notistack'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'

const Categories = () => {
  // ** States
  const [categoryStateData, setCategoryStateData] = useState<string[]>([])
  const [trigger, setTrigger] = useState<boolean>(false)

  // hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors, isValid, isDirty}
  } = useForm({
    defaultValues: {
      category: ''
    },
    resolver: yupResolver(categoryFormSchema)
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
  const {
    data: deleteCategoryData,
    error: deleteCategoryError,
    loading: deleteCategoryLoading,
    sendRequest: sendCategoryDeleteRequest
  } = useAxios<any>()
  const {data, error, loading, sendRequest} = useAxios<any>({
    url: '/category/addCategory',
    method: 'POST'
  })

  //   console.log('category', category)

  const onSubmit: SubmitHandler<any> = formData => {
    const data = {
      name: formData?.category,
      description: 'description',
      businessId: businessData?._id
    }

    console.log('formData', formData)
    console.log('payload', data)

    sendRequest({data})
  }

  const handleDelete = (item: any) => {
    console.log('delete clicked', item)
    sendCategoryDeleteRequest({
      url: `/category/deleteCategory/${item?._id}`,
      method: 'DELETE'
    })
  }

  useEffect(() => {
    sendBusinessGetRequest()
  }, [])
  useEffect(() => {
    sendCategoryGetRequest()
  }, [trigger])

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
  useEffect(() => {
    if (data) {
      enqueueSnackbar('New category added successfully!', {variant: 'success'})
      reset()
      setTrigger(!trigger)
    }
  }, [data])
  useEffect(() => {
    if (deleteCategoryData) {
      enqueueSnackbar('Category deleted successfully!', {variant: 'success'})
      setTrigger(!trigger)
    }
  }, [deleteCategoryData])

  // handle error
  useEffect(() => {
    if (businessError) enqueueSnackbar('Something went wrong!', {variant: 'error'})
  }, [businessError])
  useEffect(() => {
    if (getCategoryError) enqueueSnackbar('Something went wrong!', {variant: 'error'})
  }, [getCategoryError])
  useEffect(() => {
    if (error) enqueueSnackbar('Error in creating category!', {variant: 'error'})
  }, [error])
  useEffect(() => {
    if (deleteCategoryError) enqueueSnackbar('Error in deleting category!', {variant: 'error'})
  }, [deleteCategoryError])

  return (
    <>
      <Paper sx={{width: '100%', overflow: 'hidden', p: 3}}>
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='h6'>Category Settings</Typography>
            </Grid>
            <Grid item xs={12} sm={5} display={'flex'} gap={6}>
              <TextFieldController
                fieldName='category'
                placeholder='Enter your '
                control={control}
                errors={errors}
                labelText={'Enter the category your goods belong to'}
                fullWidth
                type='text'
              />
              <LoadingButton
                sx={{height: '55px'}}
                loading={businessLoading || loading}
                size='large'
                type='submit'
                variant='contained'
              >
                Add
              </LoadingButton>
            </Grid>

            <Grid item xs={12} sm={7}>
              <Paper
                sx={{
                  display: 'flex',
                  justifyContent: 'start',
                  flexWrap: 'wrap',
                  p: 5,
                  m: 0,
                  gap: 3
                }}
              >
                {categoryStateData?.map((itemData: any) => {
                  return (
                    <Box key={itemData?.name}>
                      <Chip
                        variant='outlined'
                        color='primary'
                        label={itemData?.name}
                        onDelete={() => handleDelete(itemData)}
                      />
                    </Box>
                  )
                })}
                {getCategoryLoading ? <CircularProgress size={30}/> : null}
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  )
}

export default Categories
