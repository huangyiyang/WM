<template>
  <div class="home-page">
    <div class="home-page-nav">
      <div class="nav-text">
        <p class="nav-text-main">稳定的API接口服务</p>
        <p class="nav-text-sub">更加便捷、高效</p>
        <el-button>成为开发者</el-button>
      </div>
      <img src="../../../static/image/home_banner_img.png" alt="">
    </div>
    <div class="home-container">
      <div class="home-container-title">
        <p class="text">接口集市</p>
        <p class="line">
          <span class="line_left"></span>
          <span class="triangle_left"></span>
          <span class="circular"></span>
          <span class="triangle_right"></span>
          <span class="line_right"></span>
        </p>
      </div>
      <ul class="home-page-list">
        <li v-for="(item, i) in interfaceData" :key="i">
          <div class="list-title">
            <i class="icon icon-config"></i>
            <p class="list-title-name">{{ item.typeName }}</p>
          </div>
          <div class="list-content">
            <p class="list-content-more">
              <span @click="moreClick(item)">更多>></span>
            </p>
            <ul class="list-content-api" v-if="item.list.length > 0">
              <router-link tag="li" class="api"
                           v-for="(inter, j) in item.list" :key="j"
                           :to="{path: '/home/details', query: {id: inter.id}}">
                <template v-if="inter.logoPath">
                  <img v-if="inter.logoPath.includes('/')" :src="inter.logoPath" class="avatar">
                  <svg v-else class="home-icon" aria-hidden="true">
                    <use :xlink:href="'#icon-' + inter.logoPath"></use>
                  </svg>
                </template>
                <svg v-else class="home-icon" aria-hidden="true">
                  <use xlink:href="#icon-ranking"></use>
                </svg>
                <p class="api-name">{{ inter.title }}</p>
                <p class="api-describe">{{ inter.description }}</p>
                <div class="api-info">
                  <p>
                    <span>
                      <i class="icon icon-call"></i>
                      {{ inter.usenum }}
                    </span>
                    <span>
                      <i class="el-icon-view"></i>
                      {{ inter.viewnum }}
                    </span>
                  </p>
                  <p>{{ inter.username }}</p>
                </div>
              </router-link>
            </ul>
            <p class="list-content-no" v-else>暂无数据！</p>
          </div>
        </li>
      </ul>
      <ul class="home-page-feature">
        <li class="hexagon">
          <div class="hexagon-box">
            <div class="hexagon-content">
              <i class="icon icon-professional"></i>
              <p>专业</p>
              <p>PROFESSION</p>
            </div>
          </div>
        </li>
        <li class="hexagon">
          <div class="hexagon-box">
            <div class="hexagon-content">
              <i class="icon icon-diamond"></i>
              <p>标准</p>
              <p>STANDARD</p>
            </div>
          </div>
        </li>
        <li class="hexagon">
          <div class="hexagon-box">
            <div class="hexagon-content">
              <i class="icon icon-rocket"></i>
              <p>急速</p>
              <p>RAPIDLY</p>
            </div>
          </div>
        </li>
        <li class="hexagon">
          <div class="hexagon-box">
            <div class="hexagon-content">
              <i class="icon icon-interface"></i>
              <p>稳定</p>
              <p>STEADY</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page',
  data () {
    return {
      interfaceData: []
    }
  },
  created () {
    this.interfaceList(); // 接口类型
  },
  methods: {
    /* @method 接口列表数据获取 */
    interfaceList () {
      let data = new URLSearchParams();
      data.append('limit', 6);
      this.$axios.post('/market/listAll', data, s => {
        this.interfaceData = s.data;
      });
    },
    /* @event 更多点击事件 */
    moreClick (item) {
      this.$store.commit('setType', item.typeCode);
      this.$router.push('/home/list')
    }
  }
}
</script>
