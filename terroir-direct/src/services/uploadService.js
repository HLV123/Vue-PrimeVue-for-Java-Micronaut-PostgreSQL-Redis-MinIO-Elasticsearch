import api from './api'

export const uploadService = {
  uploadImage(file, folder = 'general') {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)
    return api.post('/uploads/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  uploadMultipleImages(files, folder = 'general') {
    const formData = new FormData()
    files.forEach((file) => formData.append('files', file))
    formData.append('folder', folder)
    return api.post('/uploads/images', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  deleteImage(imageUrl) {
    return api.delete('/uploads/image', { params: { url: imageUrl } })
  }
}
