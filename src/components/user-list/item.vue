<template>
  <div
    ref="container"
    class="user-list-item h-70 bg-neutral-800 rounded-xl overflow-hidden"
  >
    <div
      class="h-70 px-4 py-8"
      @click="liked = true"
    >
      <div class="flex items-center">
        <q-avatar
          size="64px"
          color="white"
        >
          <q-avatar size="60px">
            <q-img :src="user.user.avatar" />
          </q-avatar>
        </q-avatar>
        <div class="ml-2">
          <div class="flex items-center text-lg font-semibold">
            <span class="mr-2">
              {{ user.user.username }}
            </span>

            <q-icon
              class="transition duration-300"
              :class="{ 'opacity-0': !liked }"
              color="negative"
              name="mdi-heart"
            />
          </div>
          <div class="opacity-70">
            {{ user.user.tagline }}
          </div>
        </div>
      </div>
      <div
        v-for="skill in user.user.skills"
        :key="skill.skillId"
        class="mt-4"
      >
        <div class="font-semibold opacity-80 pl-1">
          {{ skill.name }}
        </div>
        <q-linear-progress
          :color="getSkillColor(skill.level)"
          :value="skill.level / 5"
        />
      </div>
    </div>
    <div
      v-if="liked"
      class="user-list-item__heart-wrapper"
    >
      <q-icon
        class="user-list-item__heart text-8xl"
        color="negative"
        name="mdi-heart"
      />
    </div>
    <div
      ref="overlay"
      class="user-list-item__overlay bg-gray-700 text-center rounded-xl p-4"
    >
      <q-avatar
        size="208px"
        color="white"
      >
        <q-avatar size="200px">
          <q-img :src="user.user.avatar" />
        </q-avatar>
      </q-avatar>
      <div class="max-w-4/5 text-lg font-semibold mt-2 mx-auto">
        {{ user.user.username }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { SwipeDirection, useSwipe } from '@vueuse/core'
import { User } from 'src/types/user'

defineProps<{
  user: User
}>()

const container = ref({} as HTMLDivElement)
const overlay = ref()
const left = ref('0')
const opacity = ref(1)
const liked = ref(false)

const containerWidth = computed(() => container.value?.offsetWidth)
const getSkillColor = (skill: number) => {
  if (skill >= 5) {
    return 'positive'
  } else if (skill >= 3) {
    return 'warning'
  } else {
    return 'negative'
  }
}

const { lengthX } = useSwipe(overlay, {
  onSwipe: (e: TouchEvent) => {
    if (containerWidth.value) {
      if (lengthX.value < 0) {
        const length = Math.abs(lengthX.value)
        left.value = `${length}px`
        opacity.value = 1 - length / containerWidth.value
      } else {
        left.value = '0'
        opacity.value = 1
      }
    }
  },
  onSwipeEnd: (e: TouchEvent, direction: SwipeDirection) => {
    if (lengthX.value < 0 && containerWidth.value && (Math.abs(lengthX.value) / containerWidth.value) >= 0.5) {
      left.value = '100%'
      opacity.value = 0
    } else {
      left.value = '0'
      opacity.value = 1
    }
  }
})
</script>

<style lang="scss">
.user-list-item {
  position: relative;

  &__overlay {
    position: absolute;
    top: 0;
    left: v-bind(left);
    width: 100%;
    height: 100%;
    transition: all 0.05s ease-in-out;
  }

  &__heart-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__heart {
    opacity: 0;
    animation-name: likeAnim;
    animation-duration: 3s;
  }
}

@keyframes likeAnim {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  10% {
    opacity: 1;
    transform: scale(1.2);
  }
  12% {
    transform: scale(1);
  }
  40% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
