<template>
  <div v-if="node.type == 'loopBreak'"
       :id="node.id"
       class="common-rectangle-node"
       :class="{ active: isActive() }"
       :style="{ top: node.y + 'px', left: node.x + 'px',
        cursor: currentTool.type == 'drag' ? 'move' : (currentTool.type == 'connection' ? 'crosshair' :
                                                    (currentTool.type == 'zoom-in' ? 'zoom-in' :
                                                    (currentTool.type == 'zoom-out' ? 'zoom-out' : 'default'))) }"
       @click.stop="selectNode"
       @contextmenu.stop="showNodeContextMenu">
    {{ node.nodeName }}
  </div>
</template>

<script>
export default {
  name: 'start',
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
