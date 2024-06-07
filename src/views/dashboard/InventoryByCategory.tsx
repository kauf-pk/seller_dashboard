// ** MUI Imports
import {useTheme} from '@mui/material'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import {ApexOptions} from 'apexcharts'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const useChartOptions = (labels: string[]): ApexOptions => {
  const theme = useTheme()

  return {
    chart: {
      background: 'transparent'
    },
    dataLabels: {
      enabled: false
    },
    labels,
    legend: {
      show: true,
      position: 'bottom'
    },
    plotOptions: {
      pie: {
        expandOnClick: false
      }
    },
    states: {
      active: {
        filter: {
          type: 'none'
        }
      },
      hover: {
        filter: {
          type: 'none'
        }
      }
    },
    stroke: {
      width: 0
    },
    theme: {
      mode: theme.palette.mode
    },
    tooltip: {
      fillSeriesColor: true
    }
  }
}

const InventoryByCategory = () => {
  const chartOptions = useChartOptions(['Hardware', 'Food', 'Toiletry', 'Utensil', 'Cosmetics'])

  return (
    <Card>
      <CardHeader
        title='Inventory By Category'
        titleTypographyProps={{sx: {lineHeight: '1.2 !important', letterSpacing: '0.31px !important'}}}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{color: 'text.secondary'}}>
            <DotsVertical/>
          </IconButton>
        }
      />
      <CardContent sx={{pt: theme => `${theme.spacing(2)} !important`}}>
        <ReactApexcharts height={333} options={chartOptions} series={[63, 15, 22, 34, 29]} type='donut' width='100%'/>
      </CardContent>
    </Card>
  )
}

export default InventoryByCategory
