// components/ImageUpload.tsx
import React, {useState} from 'react'
import {Box, Button, Grid, IconButton, LinearProgress, Paper, Typography} from '@mui/material'
import {styled} from '@mui/system'
import DeleteIcon from '@mui/icons-material/Delete'
import ImageIcon from '@mui/icons-material/Image'

const Input = styled('input')({
  display: 'none'
})

interface ImageFile {
  name: string
  size: number
  url: string
}

const ImageUpload: React.FC = () => {
  const [files, setFiles] = useState<ImageFile[]>([])
  const [progress, setProgress] = useState(0)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles).map(file => ({
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file)
      }))
      setFiles(prevFiles => [...prevFiles, ...newFiles])
      const totalNewSize = newFiles.reduce((sum, file) => sum + file.size, 0)
      const totalSize = files.reduce((sum, file) => sum + file.size, 0) + totalNewSize
      setProgress((totalSize / 25000000) * 100)
    }
  }

  const handleDelete = (fileName: string) => {
    const fileToDelete = files.find(file => file.name === fileName)
    if (fileToDelete) {
      setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName))
      const remainingSize = files.reduce((sum, file) => sum + file.size, 0) - fileToDelete.size
      setProgress((remainingSize / 25000000) * 100)
    }
  }

  return (
    <>
      <Paper
        sx={{
          p: 5
        }}
      >
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2}}>
          <label htmlFor='upload-button'>
            <Input id='upload-button' type='file' onChange={handleFileUpload} multiple/>
            <Button variant='contained' component='span' startIcon={<ImageIcon/>}>
              Upload product photos
            </Button>
          </label>
          <Typography variant='body2' color='textSecondary'>
            Max size - 25Mb. Jpg, Png, Gif
          </Typography>
        </Box>
        <Box sx={{width: '100%', mb: 2}}>
          <LinearProgress variant='determinate' value={progress}/>
        </Box>
        <Grid container spacing={2} sx={{mb: 2}}>
          {files.map((file, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Box sx={{position: 'relative', width: '100%', paddingTop: '100%'}}>
                <Box
                  component='img'
                  src={file.url}
                  alt={file.name}
                  sx={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover'}}
                />
                <IconButton
                  onClick={() => handleDelete(file.name)}
                  sx={{position: 'absolute', top: 0, right: 0, color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                >
                  <DeleteIcon/>
                </IconButton>
                <Typography
                  variant='caption'
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    width: '100%',
                    textAlign: 'center',
                    padding: '2px 0'
                  }}
                >
                  {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} Mb)
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  )
}

export default ImageUpload
