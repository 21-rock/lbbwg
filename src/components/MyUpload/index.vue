<script setup lang="ts">
import { uploadFile } from '@/api/file'
import { LoadingOutlined } from '@ant-design/icons-vue'
import { Spin, Upload, message } from 'ant-design-vue'
import { UploadRequestOption } from 'ant-design-vue/es/vc-upload/interface'

// const VITE_BASE_API = import.meta.env.VITE_BASE_API
// const action = VITE_BASE_API + '/file/uploadImage'

const model = defineModel<string | any[]>('value')
const loading = ref(false)

const beforeUpload = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  return isJpgOrPng || Upload.LIST_IGNORE
}

const customRequest = (option: UploadRequestOption) => {
  const { onSuccess, onError, file, data = {} } = option // 从option中获取参数
  console.log('option', option)
  // 这里可以添加上传逻辑，例如使用fetch或者其他HTTP库
  const formData = new FormData()
  formData.append('file', file)
  // 添加额外的参数到formData
  for (let key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      formData.append(key, data[key] as string)
    }
  }
  loading.value = true
  // 这里只是单文件处理，多文件，另外写个方法
  uploadFile(formData)
    .then((res) => {
      console.log('res', res)
      if (res.code === 1) {
        model.value = res.data.file.full_url
        onSuccess?.(res.data)
        console.log('上传成功', res.data.file.full_url)
      } else {
        onError?.(res as any)
      }
    })
    .catch((error: any) => {
      onError?.(error)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <Upload
    :beforeUpload="beforeUpload"
    :customRequest="customRequest"
    name="file"
    v-bind="$attrs"
    :isabled="loading"
  >
    <Spin :spinning="loading">
      <template #indicator>
        <LoadingOutlined
          :style="{
            fontSize: '24px',
            color: '#fff'
          }"
        />
      </template>
      <slot />
    </Spin>
  </Upload>
</template>

<style></style>
