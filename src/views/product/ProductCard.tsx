// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import {useState} from 'react'

const ProductCard = ({data}: { data: any }) => {
  console.log('product data inside', data)

  const [collapse, setCollapse] = useState<boolean>(false)

  const handleClick = () => {
    setCollapse(!collapse)
  }

  const setImage = () => {
    if (data?.name === 'Samsung S23') {
      return '/images/cards/s23.jpg'
    } else if (data?.name === 'Samsung S21') {
      return '/images/cards/S21-ultra-1.jpg'
    } else if (data?.name === 'Samsung S22') {
      return '/images/cards/galaxy-s22.jpg'
    } else if (data?.name === 'Apple Iphone 15') {
      return '/images/cards/iphone15.jpg'
    } else {
      return '/images/cards/iphone15.jpg'
    }
  }

  return (
    <Card>
      <CardMedia component='img' height='250px' image={setImage()}/>
      <CardContent sx={{padding: theme => `${theme.spacing(3, 5.25, 4)} !important`}}>
        <Typography variant='h5' sx={{marginBottom: 2}}>
          {data?.name}
        </Typography>
        <Typography variant='h6' sx={{marginBottom: 2}}>
          {data?.brand}
        </Typography>
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
          <Typography sx={{fontWeight: 500, marginBottom: 3}}>
            {'Cost Price'}:{' '}
            <Box component='span' sx={{fontWeight: 'bold'}}>
              {'$'}
              {data?.costPrice}
            </Box>
          </Typography>
          <Typography sx={{fontWeight: 500, marginBottom: 3}}>
            {'Sale Price'}:{' '}
            <Box component='span' sx={{fontWeight: 'bold'}}>
              {'$'}
              {data?.salePrice}
            </Box>
          </Typography>
          <Typography sx={{fontWeight: 500, marginBottom: 3}}>
            {'Quantity'}:{' '}
            <Box component='span' sx={{fontWeight: 'bold'}}>
              {data?.qty}
            </Box>
          </Typography>
          <Typography variant='body2'>{data?.description}</Typography>
        </CardContent>
      </Collapse>
      <Button variant='contained' sx={{py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0}}>
        View
      </Button>
    </Card>
  )
}

export default ProductCard
