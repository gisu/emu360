<script lang="ts" setup>
import { UserSchema, type IUser } from '~/types/schemas/user.schema'
import timezones from '~/data/timezones.json'

const { data: userData } = await useFetch<IUser>('http://koalityauth.test:8000/profile/sascha-12e2-4a71-add6-69d9753907e8')

const formData = reactive<IUser>({
  firstName: '',
  lastName: '',
  timeZone: '',
  language: ''
})

watch(() => userData.value, () => {
  if (!userData.value) return
  formData.firstName = userData.value.firstName
  formData.lastName = userData.value.lastName
  formData.timeZone = userData.value.timeZone
  formData.language = userData.value.language
}, { immediate: true })

const router = useRouter()

const errorMessage = ref<string|null>(null)

const checkFormBeforeSend = () => {
  return UserSchema.safeParse(formData).success
}

const updateUser = async () => {
  errorMessage.value = null
  if (!checkFormBeforeSend()) {
    errorMessage.value = 'Please fill out all fields.'
    return
  }
  try {
    await fetch('http://koalityauth.test:8000/profile/sascha-12e2-4a71-add6-69d9753907e8', {
      mode: 'no-cors',
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    router.push('/')
  } catch (error) {
    errorMessage.value = 'Something went wrong.'
  }
}
</script>

<template>
  <div class="page__updateUser">
    <p class="font-medium mb-4 text-gray-500">
      Update some specific user meta data:
    </p>
    <p
      v-if="errorMessage"
      class="text-rose-700 mb-2"
    >
      {{ errorMessage }}
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
