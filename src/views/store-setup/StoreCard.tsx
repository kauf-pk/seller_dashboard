// ** React Imports
import {Key, useEffect, useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

import useAxios from 'src/@core/hooks/useAxios'

const StoreCard = () => {
  // ** State
  const [collapse, setCollapse] = useState<boolean>(false)

  const handleClick = () => {
    setCollapse(!collapse)
  }

  const { data, error, loading, sendRequest } = useAxios<any>({
    url: '/business/getBusiness',
    method: 'GET'
  })

  useEffect(() => {
    sendRequest()
  }, [])

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

  const detailData = [
    {
      key: 'Business Name',
      value: data?.businessName
    },
    {
      key: 'Owner Name',
      value: data?.ownerName
    },
    {
      key: 'Owner Cnic',
      value: data?.ownerCnic
    },
    {
      key: 'Owner Dob',
      value: data?.ownerDob
    },
    {
      key: 'Business Contact1',
      value: data?.businessContact1
    },
    {
      key: 'Business Contact2',
      value: data?.businessContact2
    },
    {
      key: 'Business Address',
      value: data?.businessAddress
    },
    {
      key: 'Tagline',
      value: data?.tagline
    },
    {
      key: 'City',
      value: data?.city
    },
    {
      key: 'District',
      value: data?.district
    },
    {
      key: 'Province',
      value: data?.province
    },
    {
      key: 'Account Number',
      value: data?.accountNumber
    },
    {
      key: 'Account Type',
      value: data?.accountType
    },
    {
      key: 'Bank Detail',
      value: data?.bankDetail
    }
  ]

  return (
    <Card>
      <CardMedia sx={{height: '14.5625rem'}} image='/images/cards/glass-house.png'/>
      <CardContent>
        <Typography variant='h6' sx={{marginBottom: 2}}>
          {data?.businessName}
        </Typography>
        <Typography variant='body2'>{data?.tagline}</Typography>
      </CardContent>
      <CardActions className='card-action-dense'>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Button onClick={handleClick}>Details</Button>
          <IconButton size='small' onClick={handleClick}>
            {collapse ? <ChevronUp sx={{fontSize: '1.875rem'}}/> : <ChevronDown sx={{fontSize: '1.875rem'}}/>}
          </IconButton>
        </Box>
      </CardActions>
      <Collapse in={collapse}>
        <Divider sx={{margin: 0}}/>
        <CardContent>
          {detailData?.map((item, index: Key | null | undefined) => (
            <Box key={index}>
              <Typography sx={{fontWeight: 500, marginBottom: 3}}>
                {item?.key}:
                <Box component='span' sx={{fontWeight: 'bold'}}>
                  {item?.value}
                </Box>
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default StoreCard
