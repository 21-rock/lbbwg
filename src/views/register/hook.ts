// 邀请码相关操作
export const useInvite = () => {
  const inviteVisible = ref(false)
  const toggleInviteVisible = () => {
    inviteVisible.value = !inviteVisible.value
  }

  return {
    inviteVisible,
    toggleInviteVisible
  }
}
