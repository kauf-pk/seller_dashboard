// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'

import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import React from 'react' // Import React

// ** Type import
import {VerticalNavItemsType} from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: React.createElement(HomeOutline), // Wrap the icon component with React.createElement
      path: '/dashboard'
    },
    {
      title: 'Store',
      icon: React.createElement(StoreOutlinedIcon),
      path: '/store-setup'
    },
    {
      title: 'Category',
      icon: React.createElement(CategoryOutlinedIcon),
      path: '/categories'
    },
    {
      title: 'Product',
      icon: React.createElement(Inventory2OutlinedIcon),
      path: '/products'
    },
    {
      title: 'Account Settings',
      icon: React.createElement(AccountCogOutline),
      path: '/account-settings'
    }
  ]
}

export default navigation
