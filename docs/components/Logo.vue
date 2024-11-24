<script lang="ts" setup>

</script>

<template>
  <svg
    class="w-8 h-8"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 970 1008"
  >
    <g id="rayine">
      <g id="r_leg">
        <path
          class="cls-1"
          d="m921.3,858.91v121.45c0,15.27-12.38,27.64-27.64,27.64h-122.51c-7.33,0-14.36-2.91-19.55-8.1l-384.22-384.22,262.61-3.69c18.78,0,28.64-6.04,46.42-9.42l236.79,236.79c5.18,5.18,8.1,12.22,8.1,19.55Z"
        />
      </g>
      <path
        id="r_head"
        class="cls-2"
        d="m921.3,323.84c0,142.4-102,260.99-236.93,286.69-17.79,3.38-36.14,5.16-54.91,5.16h-262.07v-208.38h207.85c20.44,0,39.18-7.36,53.69-19.57,18.2-15.3,29.77-38.24,29.77-63.89s-11.57-48.59-29.77-63.89c-14.51-12.22-33.25-19.57-53.69-19.57-.18,0-.35,0-.53.01h0s-207.32-.01-207.32-.01V32h262.07c161.18,0,291.84,130.66,291.84,291.84Z"
      />
      <g id="cube_3">
        <rect
          class="cls-1"
          x="48.7"
          y="698.61"
          width="249.85"
          height="309.39"
          rx="26"
          ry="26"
        />
      </g>
      <rect
        id="cube_2"
        class="cls-3"
        x="48.7"
        y="407.3"
        width="249.85"
        height="208.38"
        rx="26"
        ry="26"
      />
      <g id="cube_1">
        <rect
          class="cls-1"
          x="48.7"
          y="32"
          width="249.85"
          height="292.37"
          rx="26"
          ry="26"
        />
      </g>
    </g>
  </svg>
</template>

<style scoped>
#cube_1,
#cube_3 {
  @apply fill-zinc-600;
}

#cube_2 {
  @apply fill-primary-400;
}

#r_head {
  @apply fill-zinc-500 drop-shadow-2xl;
}

#r_leg {
  @apply fill-zinc-600;
}
</style>
