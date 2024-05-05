import * as yup from 'yup'

export const schemaLogin = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
})

export const schemaLoginAdmin = yup.object({
  user_name: yup
    .string()
    .required('Tên tài khoản là bắt buộc')
    .min(5, 'Độ dài từ 5 - 160 ký tự')
    .max(160, 'Độ dài từ 5 - 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
})

export const schemaRegister = yup.object({
  name: yup.string().required('Tên là bắt buộc').min(3, 'Độ dài từ 5 - 160 ký tự').max(160, 'Độ dài từ 5 - 160 ký tự'),
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 3 - 160 ký tự')
    .max(160, 'Độ dài từ 3 - 160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 - 160 ký tự')
    .max(160, 'Độ dài từ 6 - 160 ký tự')
    .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
})

export const schemaCreateBlog = yup.object({
  title: yup.string().required('Tiêu đề là bắt buộc').min(10, 'Độ dài từ 10 ký tự').max(160, 'Độ dài tối đa 160 ký tự'),
  image: yup.string().required('Link ảnh là bắt buộc').url('Link ảnh không đúng định dạng'),
  description: yup.string().required('Mô tả là bắt buộc').min(10, 'Độ dài từ 10 ký tự'),
  // nếu category_blog_id = DEFAULT thì sẽ báo lỗi
  category_blog_id: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn 1 thể loại blog'),
  content: yup.string().required('Nội dung là bắt buộc').min(10, 'Độ dài từ 100 ký tự')
})

export const schemaCreateAlbum = yup.object({
  title: yup.string().required('Tiêu đề là bắt buộc').min(10, 'Độ dài từ 10 ký tự').max(160, 'Độ dài tối đa 160 ký tự'),
  image: yup.string().required('Link ảnh là bắt buộc').url('Link ảnh không đúng định dạng'),
  category_album: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn 1 thể loại album'),
  description: yup.string().required('Mô tả là bắt buộc').min(10, 'Độ dài từ 10 ký tự')
})

export const schemaCreateRecipe = yup.object({
  title: yup.string().required('Tiêu đề là bắt buộc').min(10, 'Độ dài từ 10 ký tự').max(160, 'Độ dài tối đa 160 ký tự'),
  // image là dạng file , bắt buộc và có định dạng jpg
  image: yup
    .mixed()
    .required('Ảnh là bắt buộc')
    .test('fileType', 'Ảnh phải có định dạng jpg', (value) => {
      if (value) {
        return value && value[0]?.type === 'image/jpeg'
      }
      return false
    }),
  description: yup.string().required('Mô tả là bắt buộc').min(10, 'Độ dài từ 10 ký tự'),
  // nếu category_recipe_id = DEFAULT thì sẽ báo lỗi
  category_recipe_id: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn 1 thể loại món ăn'),
  content: yup.string().required('Nội dung là bắt buộc').min(10, 'Độ dài từ 100 ký tự'),
  time: yup.number().required('Thời gian là bắt buộc').min(1, 'Thời gian phải lớn hơn 0'),
  difficult_level: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn 1 mức độ khó'),
  region: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn 1 khu vực'),
  processing_food: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn 1 loại thực phẩm'),

  // video là url không bắt buộc phải có định dạng
  video: yup.string().url('Link video không đúng định dạng')
})

export const schemaUpdateRecipe = yup.object({
  title: yup.string().required('Tiêu đề là bắt buộc').min(10, 'Độ dài từ 10 ký tự').max(160, 'Độ dài tối đa 160 ký tự'),
  description: yup.string().required('Mô tả là bắt buộc').min(10, 'Độ dài từ 10 ký tự'),
  // nếu category_recipe_id = DEFAULT thì sẽ báo lỗi
  category_recipe_id: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn 1 thể loại món ăn'),
  content: yup.string().required('Nội dung là bắt buộc').min(10, 'Độ dài từ 100 ký tự'),
  time: yup.number().required('Thời gian là bắt buộc').min(1, 'Thời gian phải lớn hơn 0'),
  difficult_level: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn 1 mức độ khó'),
  region: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn 1 khu vực'),
  processing_food: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn 1 loại thực phẩm'),
  // video là url không bắt buộc phải có định dạng
  video: yup.string().url('Link video không đúng định dạng')
})

export const schemaCreateReport = yup.object({
  reason: yup.string().required('Lý do là bắt buộc').min(10, 'Độ dài từ 10 ký tự').max(160, 'Độ dài tối đa 160 ký tự')
})

export const schemaBMI = yup.object({
  height: yup.number().required('Chiều cao là bắt buộc').min(1, 'Chiều cao phải lớn hơn 0'),
  weight: yup.number().required('Cân nặng là bắt buộc').min(1, 'Cân nặng phải lớn hơn 0')
})

export const schemaBMR = yup.object({
  age: yup.number().required('Tuổi là bắt buộc').min(1, 'Tuổi phải lớn hơn 0'),
  weight: yup.number().required('Cân nặng là bắt buộc').min(1, 'Cân nặng phải lớn hơn 0'),
  height: yup.number().required('Chiều cao là bắt buộc').min(1, 'Chiều cao phải lớn hơn 0')
})

export const schemaTDEE = yup.object({
  age: yup.number().required('Tuổi là bắt buộc').min(1, 'Tuổi phải lớn hơn 0'),
  weight: yup.number().required('Cân nặng là bắt buộc').min(1, 'Cân nặng phải lớn hơn 0'),
  height: yup.number().required('Chiều cao là bắt buộc').min(1, 'Chiều cao phải lớn hơn 0'),
  //nếu activity = DEFAULT thì sẽ báo lỗi
  activity: yup.string().notOneOf(['DEFAULT'], 'Hãy chọn mức độ hoạt động')
})

export const schemaIBW = yup.object({
  height: yup.number().required('Chiều cao là bắt buộc').min(1, 'Chiều cao phải lớn hơn 0')
})

export const schemaLBM = yup.object({
  weight: yup.number().required('Cân nặng là bắt buộc').min(1, 'Cân nặng phải lớn hơn 0'),
  height: yup.number().required('Chiều cao là bắt buộc').min(1, 'Chiều cao phải lớn hơn 0')
})

export const schemaBodyFat = yup.object({
  height: yup.number().required('Chiều cao là bắt buộc').min(1, 'Chiều cao phải lớn hơn 0'),
  hip: yup.number().required('Vòng mông là bắt buộc').min(1, 'Vòng mông phải lớn hơn 0'),
  waist: yup.number().required('Vòng eo là bắt buộc').min(1, 'Vòng eo phải lớn hơn 0'),
  neck: yup.number().required('Vòng cổ là bắt buộc').min(1, 'Vòng cổ phải lớn hơn 0')
})

export const schemaWaterPerDay = yup.object({
  weight: yup.number().required('Cân nặng là bắt buộc').min(1, 'Cân nặng phải lớn hơn 0'),
  time: yup.number().required('Thời gian là bắt buộc').min(1, 'Thời gian phải lớn hơn 0')
})

export const schemaCaloriesBurned = yup.object({
  weight: yup.number().required('Cân nặng là bắt buộc').min(1, 'Cân nặng phải lớn hơn 0'),
  time: yup.number().required('Thời gian là bắt buộc').min(1, 'Thời gian phải lớn hơn 0'),
  met: yup.number().required('MET là bắt buộc').min(1, 'MET phải lớn hơn 0')
})

export const schemaCreateWorkout = yup.object({
  name: yup.string().required('Tên là bắt buộc').min(3, 'Độ dài từ 3 - 160 ký tự').max(160, 'Độ dài từ 3 - 160 ký tự'),
  weight: yup.number().required('Cân nặng là bắt buộc').min(1, 'Cân nặng phải lớn hơn 0'),
  calo_target: yup.number().required('Lượng calo là bắt buộc').min(1, 'Lượng calo phải lớn hơn 0'),
  // ngày bắt đầu phải nhỏ hơn ngày kết thúc
  start_date: yup
    .date()
    .required('Ngày bắt đầu là bắt buộc')
    .max(yup.ref('end_date'), 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc'),
  end_date: yup.date().required('Ngày kết thúc là bắt buộc')
})

export const schemaUpdateWorkout = yup.object({
  name: yup.string().required('Tên là bắt buộc').min(3, 'Độ dài từ 3 - 160 ký tự').max(160, 'Độ dài từ 3 - 160 ký tự'),
  calo_target: yup.number().required('Lượng calo là bắt buộc').min(1, 'Lượng calo phải lớn hơn 0'),
  // ngày bắt đầu phải nhỏ hơn ngày kết thúc
  end_date: yup.date().required('Ngày kết thúc là bắt buộc')
})

export const schemaAddItemWorkout = yup.object({
  activity_name: yup
    .string()
    .required('Hoạt động là bắt buộc')
    .min(3, 'Độ dài từ 3 - 160 ký tự')
    .max(160, 'Độ dài từ 3 - 160 ký tự'),
  time: yup.number().required('Thời gian là bắt buộc').min(1, 'Thời gian phải lớn hơn 0'),
  met: yup.number().required('MET là bắt buộc').min(1, 'MET phải lớn hơn 0')
})

export const schemaAddTimeWorkout = yup.object({
  time: yup.number().required('Thời gian là bắt buộc').min(1, 'Thời gian phải lớn hơn 0')
})
