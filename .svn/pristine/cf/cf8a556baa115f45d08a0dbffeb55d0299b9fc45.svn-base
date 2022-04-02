<template>
  <div v-if="node.type == 'httpFetch'"
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
    <div class="node-info"> POST
      <el-switch v-model="node.method"
                 :active-value="1"
                 :inactive-value="0">
      </el-switch>
    </div>
  </div>
</template>

<script>
export default {
  name: 'httpFetch',
  data () {
    return {
      showimg: false
    }
  },
  props: [
    'node',
    'currentTool'
  ],
  inject: ['registerNode', 'selectNode', 'showNodeContextMenu', 'isActive'],
  mounted () {
    // this.registerNode();
  },
  methods: {
    nodeChange (e) {
      this.nodeAttrChange({ attr: 'nodeName', payload: e.target.value })
    },
    ContextMenu (e) {
      this.showNodeContextMenu(e);
    }
  }
}
</script>
