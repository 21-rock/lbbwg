<script setup lang="ts">
import { useModal } from '@/hooks'
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Popconfirm,
  Table,
  TableColumnProps
} from 'ant-design-vue'
import { AddressModal } from './components'
import useWithdraw from '@/hooks/useWithdraw'
import { WalletAddressItem } from '@/api/wallet'
import { DeleteOutlined } from '@ant-design/icons-vue'

const {
  coinList,
  loading,
  addrList,
  getWithdrawList,
  getWalletAddressList,
  deleteWalletAddress
} = useWithdraw()

const columns: TableColumnProps<WalletAddressItem>[] = [
  {
    dataIndex: 'currency',
    title: '币种'
  },
  {
    dataIndex: 'currency_network',
    title: '网络'
  },
  {
    dataIndex: 'currency_qr',
    title: '二维码'
  },
  {
    dataIndex: 'currency_address',
    title: '地址'
  },
  {
    dataIndex: 'create_time',
    title: '时间'
  },
  {
    dataIndex: 'operate',
    title: '操作',
    align: 'right',
    customRender({ record }) {
      return h(
        Popconfirm,
        {
          title: 'Are you sure delete this item?',
          okText: 'Yes',
          cancelText: 'No',
          onConfirm: () => handleDelete(record.id)
        },
        () =>
          h(
            Button,
            {
              type: 'primary',
              danger: true
            },
            () => h(DeleteOutlined)
          )
      )
    }
  }
]

function handleDelete(id: number) {
  deleteWalletAddress(id)
}

onMounted(() => {
  getWalletAddressList()
  getWithdrawList()
})

const { modalVisible, onModalClose, onModalOpen } = useModal()

const handleSuccess = () => {
  onModalClose()
  getWalletAddressList()
}
</script>

<template>
  <div class="w-[1200px] mx-auto pb-[60px]">
    <div class="my-[30px]">
      <Breadcrumb>
        <BreadcrumbItem>
          <router-link to="/withdraw"> 提现 </router-link>
        </BreadcrumbItem>
        <BreadcrumbItem> 钱包地址 </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="flex items-center justify-between">
      <h1 class="text-[32px] font-bold text-black">地址管理</h1>
      <a class="btn w-[136px] h-[36px] rounded-[18px]" @click="onModalOpen">
        添加地址
      </a>
    </div>
    <div class="mt-5">
      <Table :columns="columns" :dataSource="addrList" :loading="loading" />
    </div>
    <AddressModal
      :open="modalVisible"
      @cancel="onModalClose"
      :coinList="coinList"
      @success="handleSuccess"
    />
  </div>
</template>
