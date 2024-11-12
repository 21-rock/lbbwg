<script lang="ts" setup>
import { AuthParams, submitAuthApi } from '@/api/user'
import { MyUpload } from '@/components'
import router from '@/router'
import { PlusCircleOutlined } from '@ant-design/icons-vue'
import { Form, FormItem, message } from 'ant-design-vue'
import { RuleObject } from 'ant-design-vue/es/form'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { UnwrapRef } from 'vue'
interface FormState {
  name: string
  idNo: string
}

const formRef = ref()
const formState: UnwrapRef<
  Pick<AuthParams, 'tab' | 'senior_front' | 'senior_back' | 'senior_hand'>
> = reactive({
  tab: 'senior',
  senior_front: '',
  senior_back: '',
  senior_hand: ''
})

const rules: Record<string, RuleObject | RuleObject[]> = {
  senior_front: [
    {
      required: true,
      message: '请上传证件照正面',
      trigger: 'change'
    }
  ],
  senior_back: [
    {
      required: true,
      message: '请上传证件照反面',
      trigger: 'change'
    }
  ],
  senior_hand: [
    { required: true, message: '请上传手持证件照', trigger: 'change' }
  ]
}

const handleFinish = (values: FormState) => {
  console.log(values, formState)
  submitAuthApi(toRaw(formState)).then((res) => {
    if (res.code === 1) {
      message.success('提交成功，请耐心等侯审核', 1.5, () => {
        router.back()
      })
    } else {
      message.error('正在审核中,请勿提交')
    }
  })
}
const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
  console.log(errors)
}

const handleSuccess = (
  field: 'senior_front' | 'senior_back' | 'senior_hand'
) => {
  formRef.value.validate(field)
}
</script>

<template>
  <div class="w-[1200px] mx-auto pb-10">
    <h3 class="pt-6 pb-12 text-3xl font-bold text-white">高级认证</h3>

    <div class="border border-[#313131] p-10 rounded-[8px]">
      <p class="mb-5 text-sm text-gray-400">
        UZX会严格对个人信息进行加密保护，以保障用户隐私和安全。请您放心，个人信息只会用于认证用户身份，从而为用户提供更佳服务，绝不会对外分享或用于任何其他用途。
      </p>
      <Form
        class="high-verify-container"
        size="large"
        :label-col="{ span: 24 }"
        ref="formRef"
        :rules="rules"
        :model="formState"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <FormItem
          label="证件照正面"
          name="senior_front"
          validateTrigger="change"
        >
          <MyUpload
            class="block w-[257px] upload-wrapper"
            :show-upload-list="false"
            v-model:value="formState.senior_front"
            @success="handleSuccess('senior_front')"
          >
            <div class="upload-content">
              <img
                v-if="formState.senior_front"
                :src="formState.senior_front"
                class="object-cover w-full h-full"
              />
              <div v-else class="overlay">
                <div class="overlay-cont">
                  <PlusCircleOutlined
                    class="text-4xl text-white"
                  ></PlusCircleOutlined>
                  <p class="text-base text-white">上传证件照正面</p>
                </div>
              </div>
            </div>
          </MyUpload>
        </FormItem>
        <FormItem
          label="证件照反面"
          name="senior_back"
          validateTrigger="change"
        >
          <MyUpload
            class="block w-[257px] upload-wrapper"
            :show-upload-list="false"
            v-model:value="formState.senior_back"
            @success="handleSuccess('senior_back')"
          >
            <div class="upload-content">
              <img
                v-if="formState.senior_back"
                :src="formState.senior_back"
                class="object-cover w-full h-full"
              />
              <div v-else class="overlay">
                <div class="overlay-cont">
                  <PlusCircleOutlined
                    class="text-4xl text-white"
                  ></PlusCircleOutlined>
                  <p class="text-base text-white">上传证件照反面</p>
                </div>
              </div>
            </div>
          </MyUpload>
        </FormItem>
        <FormItem
          label="手持证件照"
          name="senior_hand"
          validateTrigger="change"
          @success="handleSuccess('senior_hand')"
        >
          <MyUpload
            class="block w-[257px] upload-wrapper"
            :show-upload-list="false"
            v-model:value="formState.senior_hand"
          >
            <div class="upload-content">
              <img
                v-if="formState.senior_hand"
                :src="formState.senior_hand"
                class="object-cover w-full h-full"
              />
              <div v-else class="overlay">
                <div class="overlay-cont">
                  <PlusCircleOutlined
                    class="text-4xl text-white"
                  ></PlusCircleOutlined>
                  <p class="text-base text-white">上传证件照反面</p>
                </div>
              </div>
            </div>
          </MyUpload>
        </FormItem>
        <FormItem>
          <button class="btn w-[100%] h-[40px] rounded-[20px]">提交审核</button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.high-verify-container {
  width: 400px;

  :deep(.ant-form-item) {
    label {
      color: #fff !important;
    }
  }
}

.upload-wrapper {
  position: relative;
}

.upload-content {
  position: relative;
  width: 250px;
  height: 150px;

  .overlay {
    width: 100%;
    height: 100%;
    border: 1px dashed #fff;
    border-radius: 8px;

    .overlay-cont {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      gap: 12px;
    }

    &:hover {
      opacity: 1;
    }
  }
}
</style>
