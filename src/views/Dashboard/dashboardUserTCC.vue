<template>
  <div id="register-view__container">
    <Nav_barBox></Nav_barBox>
    <FormBox style="height: 539px; width: 1019px">
    </FormBox>
  </div>
</template>

<script setup lang="ts">

import FormBox from "@/components/form-box/FormBox.vue";
import Nav_barBox from "@/components/nav_bar-box/components/nav_bar-box.vue";
</script>

<style scoped lang="scss">


  #register-view__container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

</style>