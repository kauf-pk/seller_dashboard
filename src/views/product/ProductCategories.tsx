// ** React Imports
import {SyntheticEvent, useState} from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import CheckboxList from 'src/@core/components/checkbox-list'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <>{children}</>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  }
}

const electronics = [
  {
    label: 'Phones and axesories',
    data: ['Smartphones', 'Smartwatches', 'Tablets', 'Axesories GSM', 'Cases and covers']
  },
  {
    label: 'Computers',
    data: ['Laptops', 'Laptop components', 'Desktop Computers', 'Computer components', 'Printers and scanners']
  },
  {
    label: 'TVs and axesories',
    data: ['TVs', 'Projectors', 'Headphones', 'Audio for home', 'Home cinema']
  },
  {
    label: 'Consoles and slot machines',
    data: [
      'Consoles PlayStation 5',
      'Consoles Xbox Series X/S',
      'Consoles PlayStation 4',
      'Consoles Xbox One',
      'Consoles Nintendo Switch'
    ]
  },
  {
    label: 'Minor appliances',
    data: ['Kitchen, cooking', 'Hygiene and care', 'For home', 'Vacuum cleaners']
  },
  {
    label: 'Appliances',
    data: ['Fridges', 'Washing machines', 'Clothes dryers', 'Free-standing kitchens']
  },
  {
    label: 'Built-in appliances',
    data: ['Hotplates', 'Built-in ovens', 'Built-in dishwashers', 'Hoods']
  },
  {
    label: 'Photography',
    data: ['Digital cameras', 'Lenses', 'Photo axesories', 'Instant cameras (Instax, Polaroid)']
  }
]

const fashion = [
  {
    label: 'Men',
    data: ['Shirts', 'Trousers', 'Jackets', 'Shoes']
  },
  {
    label: 'Women',
    data: ['Dresses', 'Tops', 'Skirts', 'Heels']
  },
  {
    label: 'Accessories',
    data: ['Bags', 'Watches', 'Jewelry', 'Belts']
  },
  {
    label: 'Kids',
    data: ['T-shirts', 'Shorts', 'Sneakers', 'Hats']
  }
]

const homeAndGarden = [
  {
    label: 'Furniture',
    data: ['Sofas', 'Beds', 'Tables', 'Chairs']
  },
  {
    label: 'Garden tools',
    data: ['Lawnmowers', 'Hedge trimmers', 'Shovels', 'Rakes']
  },
  {
    label: 'Decor',
    data: ['Lamps', 'Rugs', 'Curtains', 'Wall art']
  },
  {
    label: 'Kitchenware',
    data: ['Pots and pans', 'Cutlery', 'Plates', 'Glasses']
  }
]

const beauty = [
  {
    label: 'Skincare',
    data: ['Moisturizers', 'Cleansers', 'Serums', 'Sunscreens']
  },
  {
    label: 'Makeup',
    data: ['Foundations', 'Lipsticks', 'Mascaras', 'Eyeshadows']
  },
  {
    label: 'Haircare',
    data: ['Shampoos', 'Conditioners', 'Hair oils', 'Hair tools']
  },
  {
    label: 'Fragrances',
    data: ['Perfumes', 'Colognes', 'Body sprays', 'Deodorants']
  }
]

const culture = [
  {
    label: 'Books',
    data: ['Fiction', 'Non-fiction', 'Comics', 'E-books']
  },
  {
    label: 'Music',
    data: ['CDs', 'Vinyl records', 'Digital downloads', 'Instruments']
  },
  {
    label: 'Movies',
    data: ['DVDs', 'Blu-rays', 'Streaming subscriptions', 'Projectors']
  },
  {
    label: 'Art',
    data: ['Paintings', 'Sculptures', 'Prints', 'Art supplies']
  }
]

const sportsAndTourism = [
  {
    label: 'Sports equipment',
    data: ['Bikes', 'Tennis rackets', 'Basketballs', 'Football gear']
  },
  {
    label: 'Outdoor gear',
    data: ['Tents', 'Sleeping bags', 'Backpacks', 'Camping stoves']
  },
  {
    label: 'Fitness',
    data: ['Yoga mats', 'Dumbbells', 'Resistance bands', 'Fitness trackers']
  },
  {
    label: 'Travel',
    data: ['Suitcases', 'Travel pillows', 'Luggage tags', 'Travel guides']
  }
]

const automotive = [
  {
    label: 'Car accessories',
    data: ['Seat covers', 'Floor mats', 'Steering wheel covers', 'Car organizers']
  },
  {
    label: 'Car care',
    data: ['Car wash', 'Wax', 'Polish', 'Cleaning cloths']
  },
  {
    label: 'Parts',
    data: ['Batteries', 'Tires', 'Brakes', 'Engine parts']
  },
  {
    label: 'Tools',
    data: ['Wrenches', 'Screwdrivers', 'Jacks', 'Diagnostic tools']
  }
]

const TabData = [
  {
    label: 'Electronics',
    content: (
      <Box display={'flex'} flexWrap={'wrap'} gap={10}>
        {electronics?.map((data, index) => (
          <CheckboxList key={index} heading={data?.label} data={data?.data}/>
        ))}
      </Box>
    )
  },
  {
    label: 'Fashion',
    content: (
      <Box display={'flex'} flexWrap={'wrap'} gap={10}>
        {fashion?.map((data, index) => (
          <CheckboxList key={index} heading={data?.label} data={data?.data}/>
        ))}
      </Box>
    )
  },
  {
    label: 'Home and Garden',
    content: (
      <Box display={'flex'} flexWrap={'wrap'} gap={10}>
        {homeAndGarden?.map((data, index) => (
          <CheckboxList key={index} heading={data?.label} data={data?.data}/>
        ))}
      </Box>
    )
  },
  {
    label: 'Beauty',
    content: (
      <Box display={'flex'} flexWrap={'wrap'} gap={10}>
        {beauty?.map((data, index) => (
          <CheckboxList key={index} heading={data?.label} data={data?.data}/>
        ))}
      </Box>
    )
  },
  {
    label: 'Culture',
    content: (
      <Box display={'flex'} flexWrap={'wrap'} gap={10}>
        {culture?.map((data, index) => (
          <CheckboxList key={index} heading={data?.label} data={data?.data}/>
        ))}
      </Box>
    )
  },
  {
    label: 'Sports and tourism',
    content: (
      <Box display={'flex'} flexWrap={'wrap'} gap={10}>
        {sportsAndTourism?.map((data, index) => (
          <CheckboxList key={index} heading={data?.label} data={data?.data}/>
        ))}
      </Box>
    )
  },
  {
    label: 'Automotive',
    content: (
      <Box display={'flex'} flexWrap={'wrap'} gap={10}>
        {automotive?.map((data, index) => (
          <CheckboxList key={index} heading={data?.label} data={data?.data}/>
        ))}
      </Box>
    )
  }
]

const ProductCategories = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Paper sx={{width: '100%', overflow: 'hidden', p: 3}}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant='h6'>Select the category your goods belong to (max. 3)</Typography>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{bgcolor: 'background.paper', display: 'flex'}}>
            <Tabs
              orientation='vertical'
              variant='scrollable'
              value={value}
              onChange={handleChange}
              aria-label='Vertical tabs example'
              sx={{borderRight: 1, borderColor: 'divider'}}
            >
              {TabData?.map((item, index) => (
                <Tab key={index} label={item?.label} {...a11yProps(index)} />
              ))}
            </Tabs>

            <Box>
              {TabData?.map((item, index) => (
                <TabPanel key={index} value={value} index={index}>
                  {item?.content}
                </TabPanel>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default ProductCategories
