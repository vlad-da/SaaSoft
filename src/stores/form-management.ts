import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { INPUTS_VALUE } from '@/constants'
import type { IForm } from '@/types'

export const useFormManagementStore = defineStore('form-management', () => {
  const inputs = ref<IForm[]>(INPUTS_VALUE)

  const addAccount = () => {
    inputs.value.push({
      id: Date.now() + Math.random(),
      marks: [],
      markString: '',
      type: 'Локальная',
      login: '',
      password: '',
      errors: null,
    })
  }

  const deleteAccount = (index: number) => {
    inputs.value = inputs.value.filter((item) => item.id !== index)
  }

  const checkLocalStorage = () => {
    const localSt = localStorage.getItem('form-management')
    if (localSt) {
      inputs.value = JSON.parse(localSt)
    } else {
      setLocalStorage(INPUTS_VALUE)
    }
  }

  const setLocalStorage = (values: IForm[]) => {
    localStorage.setItem('form-management', JSON.stringify(values))
  }

  watch(
    inputs,
    (newValue) => {
      setLocalStorage(newValue)
    },
    { deep: true },
  )

  const validateField = (value: IForm, fieldName: string) => {
    if (!value.errors) {
      return
    }

    switch (fieldName) {
      case 'login':
        value.errors.login = !value.login || value.login.trim().length === 0 ? true : false
        break
      case 'password':
        if (value.type === 'Локальная') {
          value.errors.password =
            !value.password || value.password.trim().length === 0 ? true : false
        } else {
          value.errors.password = false
        }
        break
    }
  }

  return { inputs, addAccount, deleteAccount, checkLocalStorage, validateField }
})
