<template>
  <div class="project">
    <project-header></project-header>
    <div class="project-container">
      <management-list></management-list>
      <router-view class="developer"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'developer'
}
</script>
