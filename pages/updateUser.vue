<script lang="ts" setup>
import type { IUser } from '~/types/general.interfaces'
import timezones from '~/data/timezones.json'

const { data: userData, pending, error, refresh } = await useFetch<IUser>('http://koalityauth.test:8000/profile/')

const formData = reactive<IUser>({
  firstName: '',
  lastName: '',
  timeZone: '',
  language: ''
})

const router = useRouter()

const updateUser = async () => {
  try {
    await useFetch<IUser>('http://koalityauth.test:8000/profile/', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    router.push('/')
  } catch (error) {
    console.log('error', error)
  }
}
</script>

<template>
  <div class="page__updateUser">
    <p class="font-medium mb-4 text-gray-500">
      Update some specific user meta data:
    </p>
    <FormKit type="form" @submit="updateUser">
      <div class="md:grid grid-cols-2 gap-8">
        <FormKit
          id="firstName"
          v-model="formData.firstName"
          type="text"
          name="firstName"
          validation="required"
          label="First Name"
        />
        <FormKit
          id="lastName"
          v-model="formData.lastName"
          type="text"
          name="lastName"
          validation="required"
          label="Last Name"
        />
      </div>
      <div class="md:grid grid-cols-2 gap-8">
        <FormKit
          id="timeZone"
          v-model="formData.timeZone"
          type="select"
          name="timeZone"
          label="Time Zone"
          :options="JSON.parse(JSON.stringify(timezones))"
        />
        <FormKit
          id="language"
          v-model="formData.language"
          type="select"
          name="language"
          label="Language"
          :options="{
            'en': 'English',
            'de': 'Deutsch',
            'fr': 'Français',
            'es': 'Español',
            'it': 'Italiano',
            'pt': 'Português',
            'ru': 'Русский',
            'ja': '日本語',
          }"
        />
      </div>
    </FormKit>
  </div>
</template>
