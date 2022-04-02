<template>
  <component :is="curNode"
             v-if="completeNodes.includes(node.type)"
             :node="node"
             :files="files"
             :currentTool="currentTool"></component>
  <div v-else></div>
</template>

<script>
import jsplumb from 'jsplumb'
import { flowConfig } from '../config/args-config.js'
import $ from 'jquery'
import 'jquery-ui/ui/widgets/draggable'
import 'jquery-ui/ui/widgets/droppable'
import 'jquery-ui/ui/widgets/resizable'
import { ZFSN } from '../util/ZFSN.js'
import * as confNodeHub from './nodes/index'
import { completeNodes, judgeCurNodeName } from '../config/basic-node-config.js'

export default {
  props: ['select', 'selectGroup', 'node', 'plumb', 'currentTool', 'files'],
  components: {
    jsplumb,
    ...confNodeHub
  },
  mounted () {
    this.registerNode();
  },
  data () {
    return {
      currentSelect: this.select,
      currentSelectGroup: this.selectGroup,
      completeNodes
    }
  },
  provide () {
    return {
      registerNode: this.registerNode,
      selectNode: this.selectNode,
      showNodeContextMenu: this.showNodeContextMenu,
      isActive: this.isActive
    }
  },
  computed: {
    curNode: judgeCurNodeName
  },
  methods: {
    registerNode () {
      const that = this;
      that.plumb.draggable(that.node.id, {
        containment: 'parent',
        handle: function (e, el) {
          var possibles = el.parentNode.querySelectorAll('.common-circle-node,.common-rectangle-node,.common-diamond-node,.lane-text-div');
          for (var i = 0; i < possibles.length; i++) {
            if (possibles[i] === el || e.target.className === 'lane-text') return true;
          }
          return false;
        },
        grid: flowConfig.defaultStyle.alignGridPX,
        drag: function (e) {
          if (flowConfig.defaultStyle.isOpenAuxiliaryLine) {
            that.$emit('alignForLine', e);
          }
        },
        stop: function (e) {
          that.node.x = e.pos[0];
          that.node.y = e.pos[1];
          if (that.currentSelectGroup.length > 1) {
            that.$emit('updateNodePos');
          }
          that.$emit('hideAlignLine');
        }
      });
      if (that.node.type === 'x-lane' || that.node.type === 'y-lane') {
        $('#' + that.node.id).resizable({
          minHeight: 200,
          minWidth: 200,
          maxHeight: 2000,
          maxWidth: 2000,
          ghost: true,
          autoHide: true,
          stop: function (event, ui) {
            that.node.height = ui.size.height;
            that.node.width = ui.size.width;
          }
        });
      }
      that.currentSelect = that.node;
      that.currentSelectGroup = [];
    },
    selectNode () {
      const that = this;
      that.currentSelect = this.node;
      that.$emit('isMultiple', flag => {
        if (!flag) {
          that.currentSelectGroup = [];
        } else {
          let f = that.currentSelectGroup.filter(s => s.id === that.node.id);
          if (f.length <= 0) {
            that.plumb.addToDragSelection(that.node.id);
            that.currentSelectGroup.push(that.node);
          }
        }
      });
    },
    showNodeContextMenu (e) {
      this.$emit('showNodeContextMenu', e);
      this.selectNode();
    },
    isActive () {
      const that = this;
      if (that.currentSelect.id === that.node.id) return true;
      let f = that.currentSelectGroup.filter(n => n.id === that.node.id);
      if (f.length > 0) return true;
      return false;
    }
  },
  watch: {
    select (val) {
      this.currentSelect = val;
    },
    currentSelect: {
      handler (val) {
        this.$emit('update:select', val);
      },
      deep: true
    },
    selectGroup (val) {
      this.currentSelectGroup = val;
    },
    currentSelectGroup: {
      handler (val) {
        this.$emit('update:selectGroup', val);
      },
      deep: true
    }
  }
}
</script>
