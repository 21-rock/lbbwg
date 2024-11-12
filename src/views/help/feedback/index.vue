<script setup lang="ts">
import { getImageUrl } from '@/assets'
import { MyUpload } from '@/components'
import { PlusCircleOutlined } from '@ant-design/icons-vue'
import { Form, FormItem, Input, Textarea } from 'ant-design-vue'

const fileList = ref([])
const imageUrl = ref<string>('')
</script>

<template>
  <div class="min-h-[calc(100vh-80px)]">
    <div class="text-white bg-black">
      <div
        class="h-[268px] w-[1200px] mx-auto flex justify-between items-center"
      >
        <div>
          <p class="text-[44px] mb-3">人人都是产品经理</p>
          <p class="text-[18px]">可提出您使用过程中的产品意见和Bug</p>
        </div>
        <img :src="getImageUrl('fb-1.png')" class="h-[160px] w-auto" alt="" />
      </div>
    </div>
    <div class="w-[800px] mx-auto py-20">
      <Form
        :label-col="{ span: 24 }"
        size="large"
        class="feedback-form-wrapper form-2xl form-light"
      >
        <FormItem label="标题">
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem label="反馈意见">
          <Textarea placeholder="请输入" :rows="4" />
        </FormItem>
        <FormItem label="图片">
          <MyUpload
            class="block"
            :show-upload-list="false"
            v-model:value="fileList"
          >
            <div
              class="flex justify-center items-center w-[160px] h-[160px] bg-[#f5f5f6] border border-[#d9d9d9] rounded-[4px]"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                alt="avatar"
                class="w-full h-full"
              />
              <div v-else class="overlay">
                <div class="overlay-cont">
                  <PlusCircleOutlined
                    class="text-4xl text-gray-300"
                  ></PlusCircleOutlined>
                </div>
              </div>
            </div>
          </MyUpload>
        </FormItem>
        <FormItem label="邮箱(选填)">
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<style lang="scss">
.feedback-form-wrapper {
  .ant-form-item {
    margin-bottom: 72px;

    label {
      height: 40px !important;
      margin-bottom: 20px;
      font-size: 32px;
      font-weight: 700;
      line-height: 40px !important;
    }

    .ant-upload {
      width: 160px !important;
      height: 160px !important;
      border-style: solid !important;
    }
  }
}
</style>
