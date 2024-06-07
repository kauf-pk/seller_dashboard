import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import {useRouter} from 'next/router'
import React, {useEffect} from 'react'
import useAxios from 'src/@core/hooks/useAxios'
import ProductCard from 'src/views/product/ProductCard'

const Products = () => {
  const router = useRouter()
  const {data, error, loading, sendRequest} = useAxios<any>({
    url: '/product/getProduct',
    method: 'GET'
  })

  useEffect(() => {
    sendRequest()
  }, [])

  useEffect(() => {
    if (data) {
      console.log('data product', data)
    }
  }, [data])

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Box display={'flex'} justifyContent={'end'}>
            <Button variant='contained' onClick={() => router.push('/products/add')}>
              Add new product
            </Button>
          </Box>
        </Grid>
        {data?.map((item: any, index: React.Key | null | undefined) => (
          <Grid item xs={3} key={index}>
            <ProductCard data={item}/>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Products
