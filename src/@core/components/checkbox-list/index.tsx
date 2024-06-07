// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'

import Typography from '@mui/material/Typography'

const CheckboxList = ({ heading, data }: { heading: string; data: string[] }) => {
  const [checked, setChecked] = useState<number[]>([]) // Specify the type of the checked state as number[]

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value) // No error now
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  return (
    <List sx={{ width: 'fit-content', bgcolor: 'background.paper' }}>
      <Typography variant='body1'>{heading}</Typography>
      {data?.map((value: string, index: number) => {
        const labelId = `checkbox-list-label-${index}`

        return (
          <ListItem key={index} disablePadding>
            <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
              <ListItemIcon>
                <Checkbox
                  edge='start'
                  checked={checked.indexOf(index) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}

export default CheckboxList
