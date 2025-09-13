<script setup lang="ts">
import question from '@/assets/question-circle.svg'
import trash from '@/assets/trash.svg'
import { useFormManagementStore } from '@/stores/form-management'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import type { IForm } from '@/types'

const { inputs } = storeToRefs(useFormManagementStore())
const { addAccount, deleteAccount, validateField, handleTypeChange } = useFormManagementStore()

const autoResize = (event: Event) => {
  const textarea = event.target as HTMLTextAreaElement
  textarea.style.height = 'auto'
  textarea.style.height = textarea.scrollHeight + 'px'
}

const handleMarkInput = (value: IForm, textValue: string, event: Event) => {
  value.markString = textValue

  value.marks = textValue
    .split(';')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .map((item) => ({ text: item }))

  autoResize(event)
}

onMounted(() => {
  const textareas = document.querySelectorAll('.textarea')
  textareas.forEach((textarea) => {
    const element = textarea as HTMLTextAreaElement
    element.style.height = 'auto'
    element.style.height = element.scrollHeight + 'px'
  })
})
</script>

<template>
  <form class="form">
    <div class="form__header">
      <h4>Учётные записи</h4>
      <button type="button" @click="addAccount">+</button>
    </div>

    <div class="form__hint">
      <img :src="question" alt="question" />
      <p>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
    </div>

    <div class="form__content">
      <div class="form__labels">
        <div class="form__label">Метки</div>
        <div class="form__label">Тип записи</div>
        <div class="form__label">Логин</div>
        <div class="form__label">Пароль</div>
      </div>
      <div
        v-for="value in inputs"
        :key="value.id"
        :class="{ form__inputs: value.type === 'Локальная', form__wrapper: value.type === 'LDAP' }"
      >
        <textarea
          :value="value.markString"
          type="text"
          name="mark"
          placeholder="Метки"
          class="form__input textarea"
          rows="1"
          maxlength="50"
          @input="(e) => handleMarkInput(value, (e.target as HTMLTextAreaElement).value, e)"
        />
        <select
          v-model="value.type"
          name="type"
          class="form__input select"
          @change="handleTypeChange(value)"
        >
          <option value="Локальная">Локальная</option>
          <option value="LDAP">LDAP</option>
        </select>
        <input
          v-model="value.login"
          type="text"
          name="login"
          placeholder="Логин"
          maxlength="100"
          required
          class="form__input input"
          :class="{ form__input_error: value.errors?.login }"
          @blur="validateField(value, 'login')"
        />
        <input
          v-if="value.type === 'Локальная'"
          v-model="value.password"
          type="password"
          name="password"
          autocomplete=""
          placeholder="Пароль"
          required
          maxlength="100"
          class="form__input input"
          :class="{ form__input_error: value.errors?.password }"
          @blur="validateField(value, 'password')"
        />
        <button type="button" @click="deleteAccount(value.id)">
          <img :src="trash" alt="trash" class="form__trash" />
        </button>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.form {
  margin-top: 40px;

  &__header {
    display: flex;
    align-items: center;
    column-gap: 20px;
    margin-bottom: 10px;

    > h4 {
      font-weight: 600;
      font-size: 24px;
    }

    > button {
      width: 32px;
      height: 32px;
      font-size: 24px;
      font-weight: 500;
      background-color: rgb(233, 233, 233);
      color: black;
      border: 1px solid black;
      border-radius: 8px;
      cursor: pointer;
    }
  }

  &__hint {
    display: flex;
    align-items: center;
    column-gap: 10px;
    background-color: #ccccfb;
    margin-bottom: 10px;

    > img {
      width: 30px;
      height: 30px;
    }

    > p {
      font-size: 16px;
      color: #000;
      font-weight: 600;
    }
  }

  &__inputs {
    display: grid;
    grid-template-columns: 240px 160px 240px 240px 20px;
    column-gap: 10px;
    align-items: center;

    > textarea {
      resize: none;
      overflow: hidden;
    }
  }

  &__wrapper {
    display: grid;
    grid-template-columns: 240px 160px 490px 20px;
    column-gap: 10px;
    align-items: center;

    > textarea {
      resize: none;
      overflow: hidden;
    }
  }

  &__labels {
    display: grid;
    grid-template-columns: 240px 160px 240px 240px;
    column-gap: 10px;
    margin-bottom: 8px;
  }

  &__label {
    font-size: 16px;
    color: #9a9797;
    font-weight: 400;
  }

  &__wrapper + &__inputs,
  &__inputs + &__wrapper,
  &__wrapper + &__wrapper,
  &__inputs + &__inputs {
    margin-top: 10px;
  }

  &__input {
    border: 1px solid black;
    padding: 6px;
    border-radius: 8px;
    width: 100%;
    height: 30px;
    min-height: 30px;

    &_error {
      border: 1px solid red;
    }
  }

  &__trash {
    width: 20px;
    height: 20px;
  }
}
</style>
