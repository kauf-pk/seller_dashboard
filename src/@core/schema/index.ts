import * as yup from 'yup'

export const loginSchema = yup
  .object({
    email: yup.string().email('Invalid Email').required('This field is required'),
    password: yup.string().required('This field is required')
  })
  .required()

export const registerSchema = yup
  .object({
    username: yup.string().required('This field is required'),
    email: yup.string().email('Invalid Email').required('This field is required'),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must contain 8 Characters, One Uppercase, One Lowercase, One Number & One Special Case Character'
      )
      .required('This field is required')
  })
  .required()

export const storeFormSchema = yup
  .object({
    businessName: yup.string().required('This field is required'),
    businessContact1: yup.string().required('This field is required'),
    businessContact2: yup.string().required('This field is required'),
    tagline: yup.string().required('This field is required'),
    ownerName: yup.string().required('This field is required'),
    ownerCnic: yup.string().min(13, 'CNIC should be 13 characters').required('This field is required'),
    ownerDob: yup.string().required('This field is required'),
    businessAddress: yup.string().required('This field is required'),
    city: yup.string().required('This field is required'),
    district: yup.string().required('This field is required'),
    province: yup.string().required('This field is required'),
    accountNumber: yup.string().required('This field is required'),
    accountType: yup.string().required('This field is required'),
    bankDetail: yup.string().required('This field is required'),
    comments: yup.string().required('This field is required')
  })
  .required()

export const categoryFormSchema = yup
  .object({
    category: yup.string().required('This field is required')
  })
  .required()

export const productFormSchema = yup
  .object({
    name: yup.string().required('This field is required'),
    qty: yup.string().required('This field is required'),
    brand: yup.string().required('This field is required'),
    barCode: yup.string().required('This field is required'),
    batchNo: yup.string().required('This field is required'),
    description: yup.string().required('This field is required'),
    costPrice: yup.string().required('This field is required'),
    salePrice: yup.string().required('This field is required'),
    discountPercentage: yup.string().required('This field is required')
  })
  .required()
