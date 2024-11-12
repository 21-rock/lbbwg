import http from '@/utils/http'

// /**
//  * 文件上传
//  * @param formData formData.append("file", file.file);
//  * @returns
//  */
// export const upload = (formData: FormData) => {
//   return http.post()
// }

// // '/ajax/upload',
// //   formData,
// //   {
// //     headers: {
// //       'Content-Type':
// //         'multipart/form-data; boundary=----WebKitFormBoundary18XLATOxolA4SMUB'
// //     }
// //   }

// 上传图片接口
export const uploadFile = (formData: FormData) => {
  return http.post<ResponseData<{ file: FileResponse }>>(
    {
      url: '/ajax/upload',
      data: formData
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}
