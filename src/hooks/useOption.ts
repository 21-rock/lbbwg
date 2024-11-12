import { addOptionalApi, deleteOptionalApi, isOptionalApi } from '@/api/trade'

const useOption = () => {
  // 是否自选
  const isOptional = ref(false)
  const optionalList = [
    {
      label: '加入自选',
      value: true
    },
    {
      label: '取消自选',
      value: false
    }
  ]
  const getIsOptional = async (currency: string) => {
    try {
      const res = await isOptionalApi(currency)
      isOptional.value = res.data === 1
    } catch (error) {
      console.log(error)
    }
  }

  const switchOptional = async (currency: string) => {
    try {
      let res = null
      if (!isOptional.value) {
        res = await addOptionalApi(currency)
      } else {
        res = await deleteOptionalApi(currency)
      }

      if (res.code === 1) {
        isOptional.value = !isOptional.value
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    optionalList,
    isOptional,
    getIsOptional,
    switchOptional
  }
}

export default useOption
