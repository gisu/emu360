<script lang="ts" setup>
import { UserSchema, type IUser } from '~/types/schemas/user.schema'

const { data: userData, refresh } = await useFetch<IUser>('http://koalityauth.test:8000/profile/sascha-12e2-4a71-add6-69d9753907e8', {
})
</script>

<template>
  <div class="page__index text">
    <Suspense>
      <main>
        <div v-if="userData && Object.keys(userData).length">
          <p class="font-medium mb-2 text-gray-500">
            Show collected Meta Information from user:
          </p>
          <div class="py-4 px-4 shadow-xl rounded-lg border border-gray-100">
            <pre>
Firstname: {{ userData.firstName }}
Lastname: {{ userData.lastName }}
Timezone: {{ userData.timeZone }}
Language: {{ userData.language }}</pre>
          </div>
          <div class="mt-8 flex gap-4">
            <div
              class="rounded text-white px-4 py-2 bg-cyan-900 hover:bg-cyan-700 duration-300 transition-colors flex items-center gap-2"
              @click.stop="refresh()"
            >
              <Icon name="material-symbols:cloud-download-rounded" />
              Collect Data
            </div>
            <NuxtLink
              class="rounded text-white px-4 py-2 bg-sky-800 hover:bg-sky-700 duration-300 transition-colors flex items-center gap-2"
              to="/updateUser"
            >
              <Icon name="grommet-icons:update" /> Update User Data
            </NuxtLink>
          </div>
        </div>
      </main>
      <template #fallback>
        <div>
          ... loading
        </div>
      </template>
    </Suspense>
  </div>
</template>
