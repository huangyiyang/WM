<template>
  <div class="nav-menu">
    <div v-for="(item, i) in navData" :key="i">
      <el-submenu
        v-if="item.child && item.child.length > 0"
        :index="item.code"
        :key="item.code">
        <span slot="title">{{ item.typename }}</span>

        <!--递归-->
        <navMenu :navData="item.child"></navMenu>
      </el-submenu>

      <!--最后一级菜单-->
      <el-menu-item
        v-else
        :index="item.code"
        :key="item.code">{{ item.typename }}</el-menu-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  props: ['navData']
}
</script>
