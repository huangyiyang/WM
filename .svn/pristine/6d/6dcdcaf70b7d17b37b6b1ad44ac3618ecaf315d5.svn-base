<template>
  <div v-if="node.type == 'chooseFile'"
       :id="node.id"
       class="common-rectangle-node"
       :class="{ active: isActive() }"
       :style="{ top: node.y + 'px', left: node.x + 'px',
        cursor: currentTool.type == 'drag' ? 'move' : (currentTool.type == 'connection' ? 'crosshair' :
                                                    (currentTool.type == 'zoom-in' ? 'zoom-in' :
                                                    (currentTool.type == 'zoom-out' ? 'zoom-out' : 'default'))) }"
       @click.stop="selectNode"
       @contextmenu.stop="showNodeContextMenu">
    <div class="node-title">
      <a-icon type="user"
              class="node-icon" />
      {{ node.nodeName }}
    </div>
    <div class="node-info"> 节点选取
      <a-icon @click="choice('clickPath')"
              style="width: 20%;fontSize:16px;"
              type="fullscreen-exit" />
    </div>
    <div class="node-img"
         :style="style"
         v-if="showimg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'chooseFile',
  data () {
    return {
      showimg: false,
      imgurl: '',
      style: ''
    }
  },
  props: [
    'node',
    'files',
    'currentTool'
  ],
  inject: ['registerNode', 'selectNode', 'showNodeContextMenu', 'isActive', 'processGetPath'],
  mounted () {
    // this.registerNode();
    //this.loadimg()
  },
  methods: {
    loadimg () {
      this.files.map(s => {
        if (s.nodeId === this.node.id && s.type === 0) {
          this.imgurl = this.baseConfig.BASE_URL + '/' + s.path
          this.style = `
          height:30px;
          background-image: url(` +
            this.imgurl +
            `);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          `
          this.showimg = true
        }
      })
    },
    nodeChange (e) {
      this.nodeAttrChange({ attr: 'nodeName', payload: e.target.value })
    },
    ContextMenu (e) {
      this.showNodeContextMenu(e);
    },
    choice (attr) {
      this.processGetPath(this.node.id, this.node, attr);
    }
  }
}
</script>
