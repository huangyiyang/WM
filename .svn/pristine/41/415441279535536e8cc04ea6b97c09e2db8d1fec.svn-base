<template>
  <el-dialog :title="`${applicationOption.id ? '编辑' : '新增'}应用`"
             width="3.5rem"
             custom-class="global-dialog"
             :visible="dialogVisible"
             @open="dialogOpen" @close="dialogClose"
             :close-on-click-modal="false">
    <el-form ref="applicationEdit" label-position="top" :model="form" :rules="rules">
      <el-form-item label="应用图标：" prop="icon">
        <el-upload
          class="application-upload"
          disabled
          action="#"
          accept="image/*"
          :show-file-list="false"
          :http-request="uploadIcon">
          <el-image @click.native="uploadClick" v-if="form.icon" :src="$axios.downUrl() + '/' + form.icon"></el-image>
          <div class="application-upload-box" @click="uploadClick" v-else>
            <i class="el-icon-plus application-upload-icon"></i>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="序号：" prop="seq" v-if="false">
        <el-input v-model="form.seq" oninput="value=value.replace(/[^\d]/g, '')"></el-input>
      </el-form-item>
      <el-form-item label="应用标题：" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="应用类型：" prop="type">
        <el-switch
          v-model="form.type"
          @change="typeChange"
          :active-value="3"
          :inactive-value="1"
          active-text="任务"
          inactive-text="登录">
        </el-switch>
      </el-form-item>
      <el-form-item :label="`关联${form.type === 3 ? '任务' : '登录'}`" prop="dataId">
        <el-select
          v-model="form.dataId"
          placeholder="请选择">
          <el-option
            v-for="dic in relationData"
            :key="dic.id"
            :label="dic.title || dic.processName"
            :value="dic.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer center">
      <el-button type="success" @click="saveSubmit">保存提交</el-button>
      <el-button type="info" @click="dialogClose">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ApplicationEdit',
  props: {
    applicationOption: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      form: {
        id: '',
        dataId: '', // 流程or任务id
        title: '',
        icon: '',
        type: 3
      },
      rules: {
        seq: [
          { required: true, message: '序号不能为空', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        dataId: [
          { required: true, message: '关联登录/任务不能为空', trigger: 'change' }
        ]
      },
      relationData: []
    }
  },
  computed: {
    dialogVisible () {
      return this.$store.getters.applicationEditVisible;
    }
  },
  methods: {
    /* @event 弹窗打开 */
    dialogOpen () {
      Object.keys(this.form).forEach(key => {
        switch (key) {
          case 'type':
            if (this.applicationOption.id) {
              this.form[key] = this.applicationOption[key];
            } else {
              this.form[key] = 3;
            }
            break;
          default:
            this.form[key] = this.applicationOption[key] || '';
            break;
        }
      });
      this.relationList();
      this.$nextTick(() => {
        this.$refs.applicationEdit.clearValidate();
      });
    },
    /* @event 弹窗关闭 */
    dialogClose () {
      this.$store.commit('setApplicationEdit', false);
    },
    /* @event 应用类型change事件 */
    typeChange () {
      this.form.dataId = '';
      this.relationList();
    },
    /* @event 点击导入事件 */
    uploadClick (e) {
      e.currentTarget.nextElementSibling.click();
    },
    /* @method 上传图标 */
    uploadIcon (val) {
      const data = new FormData();
      data.append('file', val.file);
      this.$axios.post('/process/uploadFile', data, s => {
        this.form.icon = s.data.path;
      });
    },
    /* @method 关联数据列表 */
    relationList () {
      const pathType = this.form.type === 3 ? 'task' : 'process';
      const data = new URLSearchParams();
      if (this.form.type !== 3) {
        data.append('type', this.form.type);
      }
      this.$axios.post(`/${pathType}/list`, data, s => {
        this.relationData = s.data;
      });
    },
    /* @event 保存提交 */
    saveSubmit () {
      this.$refs.applicationEdit.validate((valid) => {
        if (valid) {
          const data = new URLSearchParams();
          Object.keys(this.form).forEach(key => {
            data.append(key, this.form[key]);
          });
          this.$axios.post('/app/save', data, s => {
            this.$message({
              showClose: true,
              duration: 2000,
              type: 'success',
              message: '保存成功！'
            });
            this.dialogClose();
            this.$emit('save-success');
          });
        } else {
          this.$nextTick(() => {
            const isError = document.getElementsByClassName('is-error');
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
    }
  }
}
</script>
