<template>
  <div class="source-logo">
    <svg v-if="name === 'Albert Heijn'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 948">
      <g fill="none" fill-rule="nonzero">
        <path fill="#00A0E2" d="M889 452.7L670.6 45.9a86 86 0 0 0-117.8-35L153.1 233.8a92.2 92.2 0 0 0-42.5 53.7L3.4 660.1a84.4 84.4 0 0 0 56.1 104.4l630.2 179.2a82.6 82.6 0 0 0 102.7-57.2l104.2-365.3c6.8-21.4 3-47.9-7.6-68.5z"/>
        <path fill="#FFF" d="M488.2 418.2c35.5-51 67.6-101.7 127.7-101.7 66.4 0 102.5 55.6 102.7 102.4l-.3 299.8h-74.6l-.4-283.8c0-39-31.3-38.8-31.7-38.8-25.3 0-71.7 63.3-123.3 133.6v189.1h-75.5v-87.5S362.7 719 288 719c-84.8 0-113.6-58.3-113.8-198-.1-133 18.8-204.1 109.6-204.2 69.2 0 128.5 100.6 128.5 100.6v-63.8l75.9-102.1s-.3 167.1 0 166.7zm-89 112.8S329.7 395.8 285 395.8c-34.7 0-37.7 36.8-37.6 125.2.1 88.4 4.9 122.9 37.5 122.9 44.4 0 114.2-112.9 114.2-112.9z"/>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SourceLogo',
  props: ['name']
}
</script>
