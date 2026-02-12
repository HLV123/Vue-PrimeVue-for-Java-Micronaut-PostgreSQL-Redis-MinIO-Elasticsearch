export const validators = {
  required: (value) => !!value || 'Trường này là bắt buộc',

  email: (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(value) || 'Email không hợp lệ'
  },

  phone: (value) => {
    const pattern = /^(0[35789])\d{8}$/
    return pattern.test(value) || 'Số điện thoại không hợp lệ'
  },

  minLength: (min) => (value) => {
    return (value && value.length >= min) || `Tối thiểu ${min} ký tự`
  },

  maxLength: (max) => (value) => {
    return (!value || value.length <= max) || `Tối đa ${max} ký tự`
  },

  password: (value) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    return pattern.test(value) || 'Mật khẩu cần ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số'
  },

  confirmPassword: (password) => (value) => {
    return value === password || 'Mật khẩu không khớp'
  },

  positiveNumber: (value) => {
    return (value && Number(value) > 0) || 'Phải là số dương'
  },

  taxCode: (value) => {
    const pattern = /^\d{10}(-\d{3})?$/
    return pattern.test(value) || 'Mã số thuế không hợp lệ'
  }
}
