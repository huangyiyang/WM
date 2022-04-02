<template>
  <div class="management-list-except">
    <section class="project-module">
      <p class="project-module-name">
        管理平台配置
      </p>
      <div class="rt">
        <el-button type="primary" @click="newCard">新增</el-button>
      </div>
    </section>
    <section class="project-info">
      <el-table
        height="100%"
        :data="cardData"
        max-height="100%"
        style="width: 100%;"
        v-loading="loading"
        element-loading-text="数据加载中...">

        <el-table-column
          v-for="(item, i) in tableMenu" :key="i"
          v-if="item.isCheck"
          :width="item.width || 'auto'"
          :align="item.align || 'center'"
          :prop="item.prop"
          :sortable="item.sortable"
          :show-overflow-tooltip="item.prop !== ''"
          :label="item.label">
          <template slot-scope="scope">
            <template v-if="item.prop === 'regTime'">
              {{ timestampToTime(scope.row[item.prop], 'YYYY-MM-DD hh:mm:ss') }}
            </template>
            <template v-else-if="item.prop === 'status'">
              <el-switch
                v-model="scope.row[item.prop]"
                @change="statusChange($event, scope.row)"
                :active-value="1"
                :inactive-value="0"
                active-text="展示"
                inactive-text="隐藏">
              </el-switch>
            </template>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>

        <el-table-column
          :width="this.rem2Px(330)"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="editCard(scope.row)" type="success">编辑</el-button>
            <el-button @click="elementMange(scope.row)" type="primary">元素管理</el-button>
            <el-button @click="deleteCard(scope.row)" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <el-dialog :title="this.currentCard.id ? '编辑' : '创建'"
               :visible.sync="cardVisible"
               width="4rem" :close-on-click-modal="false"
               custom-class="dialog-center">
      <el-form ref="cardEdit" label-position="top" :model="currentCard" :rules="cardRules">
        <el-form-item label="序号：" prop="seq">
          <el-input v-model="currentCard.seq" @input="budgetInput"></el-input>
        </el-form-item>
        <el-form-item label="卡片标题：" prop="title">
          <el-input v-model="currentCard.title"></el-input>
        </el-form-item>
        <el-form-item label="展示状态：" prop="status">
          <el-switch
            v-model="currentCard.status"
            :active-value="1"
            :inactive-value="0"
            active-text="展示"
            inactive-text="隐藏">
          </el-switch>
        </el-form-item>
        <template v-if="currentCard.items && currentCard.items.length">
          <el-divider></el-divider>
          <div class="space-between">
            <el-form-item class="flex-half" label="是否批量设置资源：">
              <el-switch
                v-model="batch.sendWay"
                :active-value="1"
                :inactive-value="0"
                active-text="是"
                inactive-text="否">
              </el-switch>
            </el-form-item>
            <el-form-item class="flex-half" label="是否批量验证AppKey：">
              <el-switch
                v-model="batch.needKey"
                :active-value="1"
                :inactive-value="0"
                active-text="是"
                inactive-text="否">
              </el-switch>
            </el-form-item>
          </div>
          <el-form-item v-if="batch.sendWay" label="执行资源：" :rules="cardRules.clientId">
            <el-select
              v-model="batch.clientId"
              placeholder="请选择">
              <el-option
                v-for="dic in clientData"
                :key="dic.id"
                :label="dic.title"
                :value="dic.id">
              </el-option>
            </el-select>
            <template slot="label">
              执行资源：
              <el-tooltip effect="dark" content="刷新资源" placement="right">
                <i class="el-icon-refresh primary pointer" @click="clientList('refresh')"></i>
              </el-tooltip>
            </template>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="cardSave">保存提交</el-button>
        <el-button type="" @click="cardVisible = false">关闭</el-button>
      </div>
    </el-dialog>

    <el-dialog title="元素管理"
               :visible.sync="elementVisible"
               width="8rem"
               :close-on-click-modal="false"
               custom-class="dialog-center">
      <div class="element-manage">
        <section class="element-manage-list">
          <ul class="element-manage-title">
            <li v-for="(item, i) in elementType" :key="i" @click="elementTypeChange(item)"
                :class="{active: item.type === currentType}">
              {{ item.name }}
            </li>
          </ul>
          <div class="element-manage-content">
            <el-scrollbar tag="ul" view-class="element-list" class="bottom-hidden">
              <li class="element-list-option" v-for="(item, i) in elementData" :key="i"
                  @click="elementSelect(item)"
                  :class="[{active: selectElement.map(el => el.id).includes(item.id)}, {'no-select': cardElement.map(el => el.id).indexOf(item.id) !== -1}]">
                {{ item.processName || item.title }}
              </li>
            </el-scrollbar>
          </div>
        </section>
        <section class="element-manage-control">
          <el-button @click="addSelect" size="small" icon="el-icon-sort-down"
                     :type="selectElement.length === 0 ? '' : 'success'"
                     :disabled="selectElement.length === 0"></el-button>
          <el-button @click="deleteSelect" size="small" icon="el-icon-sort-up"
                     :type="selectData.length === 0 ? '' : 'success'"
                     :disabled="selectData.length === 0"></el-button>
        </section>
        <section class="element-manage-list">
          <p class="element-manage-title space-between">
            <span>已选元素 <small>({{ isDrag ? '排序' : '选择' }}模式)</small></span>
            <small @click="dragChange" class="pointer">{{ isDrag ? '点击选择' : '点击排序' }}</small>
          </p>
          <div class="element-manage-content">
            <el-scrollbar view-class="element-list" class="bottom-hidden">
              <transition-group name="flip-list">
                <div class="element-list-option" v-for="item in cardElement" :key="item.id" :draggable="isDrag"
                    @click="dataSelect(item)" @dragstart="dragstart(item)" @dragenter="dragenter(item)" @dragend="dragend(item)"
                    :class="{active: selectData.map(el => el.id).includes(item.id)}">
                  {{ item.name }}
                </div>
              </transition-group>
            </el-scrollbar>
          </div>
        </section>
      </div>
      <div slot="footer" class="dialog-footer center">
        <el-button type="success" @click="elementSave">保存提交</el-button>
        <el-button type="" @click="elementVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'card',
  data () {
    return {
      loading: false,
      cardData: [],
      tableMenu: [
        {isCheck: true, label: '序号', prop: 'seq', width: this.rem2Px(120)},
        {isCheck: true, label: '标题', prop: 'title'},
        {isCheck: true, label: '创建时间', prop: 'createTime', width: this.rem2Px(240)},
        {isCheck: true, label: '展示状态', prop: 'status', width: this.rem2Px(240)}
      ],
      currentCard: {},
      cardVisible: false,
      cardRules: {
        seq: [
          { required: true, message: '序号不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ],
        clientId: [
          { required: true, message: '执行资源不能为空', trigger: 'change' }
        ]
      },
      batch: {
        sendWay: '',
        clientId: '',
        needKey: ''
      },
      clientData: [],
      elementVisible: false,
      elementType: [
        {type: '1', name: '自动登录'},
        {type: '2,3', name: '数据接口'},
        {type: '0', name: '流程'},
        {type: 'task', name: '任务'}
      ],
      currentType: '',
      elementData: [],
      selectElement: [],
      cardElement: [],
      selectData: [],
      isDrag: false,
      oldNum: 0,
      newNum: 0
    }
  },
  created () {
    this.cardList();
  },
  methods: {
    /* @event 新增卡片 */
    newCard () {
      this.currentCard = {
        seq: this.cardData.length > 0 ? this.cardData[this.cardData.length - 1].seq + 1 : 1,
        title: '',
        status: 1
      };
      this.$nextTick(() => {
        this.$refs.cardEdit.clearValidate();
      });
      this.cardVisible = true;
    },
    /* @method 卡片列表 */
    cardList () {
      let data = new URLSearchParams();
      this.$axios.get('/card/list', '', s => {
        this.cardData = s.data;
      });
    },
    /* @event 状态变更 */
    statusChange (val, item) {
      let data = new URLSearchParams();
      data.append('id', item.id);
      data.append('title', item.title);
      data.append('seq', item.seq);
      data.append('status', item.status);
      this.$axios.post('/card/save', data, s => {
        this.$message({
          showClose: true,
          duration: 2000,
          type: 'success',
          message: '修改成功！'
        });
      });
    },
    /* @event 编辑卡片 */
    editCard (item) {
      this.currentCard = item;
      Object.keys(this.batch).forEach(key => {
        this.batch[key] = '';
      });
      this.$nextTick(() => {
        this.$refs.cardEdit.clearValidate();
      });
      this.clientList();
      this.cardVisible = true;
    },
    /* @method 在input值改变时触发 */
    budgetInput (val) {
      this.currentCard.seq = val.replace(/[^\d]/g, '');
    },
    /* method 卡片保存 */
    cardSave () {
      this.$refs.cardEdit.validate((valid) => {
        if (valid) {
          let data = new URLSearchParams();
          if (this.currentCard.id) {
            data.append('id', this.currentCard.id);
          }
          data.append('title', this.currentCard.title);
          data.append('seq', this.currentCard.seq);
          data.append('status', this.currentCard.status);
          this.$axios.post('/card/save', data, s => {
            this.$message({
              showClose: true,
              duration: 2000,
              type: 'success',
              message: '保存成功！'
            });
            if (this.batch.sendWay) {
              this.updateClientBatch();
            }
            if (this.batch.needKey) {
              this.updateAppKeyBatch();
            }
            this.cardVisible = false;
            this.cardList();
          });
        } else {
          this.$nextTick(() => {
            let isError = document.getElementsByClassName('is-error');
            if (isError[0].querySelector('input')) {
              isError[0].querySelector('input').focus();
            } else if (isError[0].querySelector('textarea')) {
              isError[0].querySelector('textarea').focus();
            }
          });
          console.log('error submit!!');
          return false;
        }
      });
    },
    /* @method 客户端列表请求  */
    clientList (type) {
      this.$axios.get('/client/getClient', '', s => {
        this.clientData = s.data.filter(item => !item.status).map(item => {
          const id = item.id ? [item.id.slice(0, 5), item.id.slice(-5)].join('-') : '';
          return {
            ...item,
            title: `[${id}]-[${item.version}]`
          }
        });
        if (type === 'refresh') {
          this.$message({
            showClose: true,
            duration: 2000,
            type: 'success',
            message: '资源更新成功！'
          });
        }
      });
    },
    /* @method 批量更新客户端资源 */
    updateClientBatch () {
      const data = new URLSearchParams();
      data.append('ids', this.currentCard.items.map(item => item.id));
      data.append('sendWay', this.batch.sendWay);
      data.append('clientId', this.batch.clientId);
      this.$axios.post('/process/updateClientBat', data);
    },
    /* @method 批量更新AppKey验证 */
    updateAppKeyBatch () {
      const data = new URLSearchParams();
      data.append('ids', this.currentCard.items.map(item => item.id));
      data.append('needKey', this.batch.needKey);
      this.$axios.post('/process/updateAppBat', data);
    },
    /* @event 元素管理 */
    elementMange (item) {
      this.currentCard = item;
      this.currentType = this.elementType[0].type;
      this.elementList();
      this.cardElement = [...item.items];
      this.selectElement = [];
      this.selectData = [];
      this.elementVisible = true;
    },
    /* @event 元素类型切换 */
    elementTypeChange (item) {
      this.currentType = item.type;
      this.elementList();
    },
    /* event 元素列表 */
    elementList () {
      let pathType = this.currentType === 'task' ? 'task' : 'process';
      let data = new URLSearchParams();
      if (this.currentType !== 'task') {
        data.append('type', this.currentType);
      }
      this.$axios.post(`/${pathType}/list`, data, s => {
        this.elementData = s.data;
      });
    },
    /* @event 元素选择 */
    elementSelect (item) {
      if (this.cardElement.map(el => el.id).indexOf(item.id) !== -1) return;
      let index = this.selectElement.map(el => el.id).indexOf(item.id);
      if (index !== -1) {
        this.selectElement.splice(index, 1);
      } else {
        this.selectElement.push(item);
      }
    },
    /* @event 新增元素到卡片 */
    addSelect () {
      if (this.selectElement.length === 0) return;
      let newCardElement = this.selectElement.map(item => {
        let type;
        switch (item.type) {
          case 2:case 3:
            type = 2;
            break;
          case undefined:case null:case '':
            type = 3;
            break;
          default:
            type = item.type;
            break;
        }
        return {
          ...item,
          type: type,
          name: item.processName || item.title
        }
      });
      this.cardElement.push(...newCardElement);
      this.selectElement = [];
    },
    /* @event 卡片元素选择 */
    dataSelect (item) {
      if (this.isDrag) return;
      let index = this.selectData.map(el => el.id).indexOf(item.id);
      if (index !== -1) {
        this.selectData.splice(index, 1);
      } else {
        this.selectData.push(item);
      }
    },
    /* @event 删除卡片里的元素 */
    deleteSelect () {
      if (this.selectData.length === 0) return;
      this.selectData.forEach(item => {
        let index = this.cardElement.map(el => el.id).indexOf(item.id);
        this.cardElement.splice(index, 1);
      });
      this.selectData = [];
    },
    /* event 元素保存 */
    elementSave () {
      let data = new URLSearchParams();
      data.append('id', this.currentCard.id);
      data.append('itemIds', this.cardElement.map(item => item.id).join(','));
      data.append('types', this.cardElement.map(item => item.type).join(','));
      data.append('seqs', this.cardElement.map((item, index) => index).join(','));
      this.$axios.post('/card/saveItems', data, s => {
        this.$message({
          showClose: true,
          duration: 2000,
          type: 'success',
          message: '保存成功！'
        });
        this.cardList();
        this.elementVisible = false;
      });
    },
    /* @event 删除卡片 */
    deleteCard (item) {
      this.$confirm(`确认删除当前卡片？`, '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        let data = new URLSearchParams();
        data.append('id', item.id);
        this.$axios.post('/card/del', data, s => {
          this.$message({
            showClose: true,
            duration: 2000,
            type: 'success',
            message: '删除成功！'
          });
          this.cardList();
        });
      }).catch(() => { });
    },
    /* @event 拖拽切换 */
    dragChange () {
      this.selectData = [];
      this.isDrag = !this.isDrag;
    },
    // 记录初始信息
    dragstart (value) {
      this.oldNum = value;
    },
    // 做最终操作
    dragend (value) {
      if (this.oldNum !== this.newNum) {
        let oldIndex = this.cardElement.indexOf(this.oldNum);
        let newIndex = this.cardElement.indexOf(this.newNum);
        let newItems = [...this.cardElement];
        // 删除老的节点
        newItems.splice(oldIndex, 1);
        // 在列表中目标位置增加新的节点
        newItems.splice(newIndex, 0, this.oldNum);
        // cardElement 改变，transition-group 就起作用
        this.cardElement = [...newItems];
      }
    },
    // 记录移动过程中信息
    dragenter (value) {
      this.newNum = value;
    }
  }
}
</script>
