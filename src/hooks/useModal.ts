const useModal = () => {
  const modalVisible = ref(false)
  const modalLoading = ref(false)
  const onModalClose = () => {
    modalVisible.value = false
    modalLoading.value = false
  }
  const onModalOpen = () => {
    modalVisible.value = true
  }

  return {
    modalVisible,
    modalLoading,
    onModalClose,
    onModalOpen
  }
}

export default useModal
