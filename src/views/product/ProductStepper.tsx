// ** React Imports
import {useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// ** Styled Component

// ** Components Imports
import ProductDescription from './ProductDescription'
import ProductCategories from './ProductCategories'
import ProductPhotos from './ProductPhotos'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const steps = ['Description', 'Categories', 'Photos']

const components = [
  <ProductDescription key='first'/>,
  <ProductCategories key='second'/>,
  <ProductPhotos key='third'/>
]

const ProductStepper = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set<number>())

  const isStepOptional = (step: number) => {
    return step === 1
  }

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1)
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)

      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <>
      <Box sx={{width: '100%'}}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {}
            const labelProps: {
              optional?: React.ReactNode
            } = {}

            // if (isStepOptional(index)) {
            //   labelProps.optional = <Typography variant='caption'>Optional</Typography>
            // }
            if (isStepSkipped(index)) {
              stepProps.completed = false
            }

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography sx={{mt: 2, mb: 1}}>All steps completed - you&apos;re finished</Typography>
            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
              <Box sx={{flex: '1 1 auto'}}/>
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{pt: 3}}>{components[activeStep]}</Box>
            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
              <Button color='inherit' disabled={activeStep === 0} onClick={handleBack} sx={{mr: 1}}>
                Back
              </Button>
              <Box sx={{flex: '1 1 auto'}}/>
              {/* {isStepOptional(activeStep) && (
                <Button color='inherit' onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}
              <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
            </Box>
          </>
        )}
      </Box>
    </>
  )
}

export default ProductStepper
