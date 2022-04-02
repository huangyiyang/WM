<template>
  <div v-if="node.type == 'set'"
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
      <a-icon @click="choice"
              style="width: 20%;fontSize:16px;"
              type="fullscreen-exit" />
    </div>
    <div class="node-img"
         v-show="showimg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'set',
  data () {
    return {
      showimg: false
    }
  },
  props: [
    'node',
    'currentTool'
  ],
  inject: ['registerNode', 'selectNode', 'showNodeContextMenu', 'isActive', 'processGetPath'],
  mounted () {
    // this.registerNode();
  },
  methods: {
    nodeChange (e) {
      this.nodeAttrChange({ attr: 'nodeName', payload: e.target.value })
    },
    ContextMenu (e) {
      this.showNodeContextMenu(e);
    },
    choice () {
      this.processGetPath(this.node.id, this.node);
    }
  }
}
</script>
