<template>
  <div class="home-list">
    <div class="home-container">
      <div class="home-list-content">
        <div class="list-title">
          <el-menu
            :default-active="currentKey"
            class="el-menu-vertical-demo"
            @select="handleSelect"
            @open="handleOpen"
            @close="handleClose">
            <nav-menu :navData="typeData"></nav-menu>
          </el-menu>
        </div>
        <div class="list-content">
          <p class="list-content-title">{{ currentName }} <span>{{ interfaceInfo.length }}个接口</span></p>
          <ul class="list-content-api" v-if="interfaceInfo.length > 0">
            <router-link tag="li" v-for="(item, i) in interfaceInfo"
                         :key="i" class="api" :to="{path: '/home/details', query: {id: item.id}}">
              <template v-if="item.logoPath">
                <img v-if="item.logoPath.includes('/')" :src="item.logoPath" class="avatar">
                <svg v-else class="home-icon" aria-hidden="true">
                  <use :xlink:href="'#icon-' + item.logoPath"></use>
                </svg>
              </template>
              <svg v-else class="home-icon" aria-hidden="true">
                <use xlink:href="#icon-ranking"></use>
              </svg>
              <p class="api-name">{{ item.title }}</p>
              <p class="api-describe">{{ item.description }}</p>
              <div class="api-info">
                <p>
                    <span>
                      <i class="icon icon-call"></i>
                      {{ item.usenum }}
                    </span>
                  <span>
                      <i class="el-icon-view"></i>
                      {{ item.viewnum }}
                    </span>
                </p>
                <p>{{ item.username }}</p>
              </div>
            </router-link>
          </ul>
          <p class="no-data" v-else>暂无数据！</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavMenu from '../../components/NavMenu'
export default {
  name: 'list',
  components: {
    NavMenu: NavMenu
  },
  data () {
    return {
      currentKey: '',
      typeData: [],
      interfaceInfo: []
    }
  },
  computed: {
    currentName () {
      let name = '';
      this.typeData.forEach((item) => {
        if (item.code === this.currentKey) {
          name = item.typename;
        }
      })
      return name || '相关';
    }
  },
  created () {
    this.interfaceType(); // 接口类型
  },
  methods: {
    /* @method 接口类型数据获取 */
    interfaceType () {
      this.$axios.post('/market/types', '', s => {
        this.typeData = s.data;
        this.currentKey = this.$store.state.type || s.data[0].code;
        this.interfaceList();
      });
    },
    interfaceList () {
      let data = new URLSearchParams();
      data.append('pageNum', 1);
      data.append('numPerPage', 20);
      data.append('keyword', '');
      this.$axios.post('/market/list/' + this.currentKey, data, s => {
        this.interfaceInfo = s.data;
      });
    },
    handleSelect (key, keyPath) {
      this.currentKey = key;
      this.$store.commit('setType', key);
      this.interfaceList();
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
