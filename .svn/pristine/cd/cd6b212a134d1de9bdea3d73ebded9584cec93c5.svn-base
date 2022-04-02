<template>
  <div class="management-list-except user">
    <section class="project-module">
      <p class="project-module-name">
        上架申请<span>[{{ form.title || '新增申请' }}]</span>
      </p>
      <div class="rt">
        <el-button type="primary" @click="onSubmit">提交接口</el-button>
        <el-button>预览</el-button>
      </div>
    </section>
    <section class="project-info">
      <el-scrollbar>
        <p class="project-title">
          <span>接口信息</span>
        </p>
        <div class="user-info">
          <el-form ref="form" label-position="top" :model="form" label-width="90px">
            <div class="user-info-base">
              <el-form-item label="商品图标：">
                <el-popover
                  placement="right"
                  v-model="visible"
                  popper-class="user-info-popover"
                  trigger="click">
                  <ul class="beforehand-icon">
                    <li v-for="(item, i) in beforehandIcon" :key="i"
                        @click="switchIcon(item)">
                      <svg class="home-icon" aria-hidden="true">
                        <use :xlink:href="'#icon-' + item"></use>
                      </svg>
                    </li>
                  </ul>
                  <el-upload
                    :action="baseUrl + '/user/uploadImg'"
                    :data="uploadData"
                    :show-file-list="false"
                    :on-success="onSuccess"
                    :before-upload="beforeUpload">
                    <el-button type="primary">自定义上传</el-button>
                  </el-upload>
                  <div class="user-info-logo" slot="reference">
                    <img v-if="form.logoPath.includes('/')" :src="baseUrl + form.logoPath" class="avatar">
                    <svg v-else class="home-icon" aria-hidden="true">
                      <use :xlink:href="'#icon-' + form.logoPath"></use>
                    </svg>
                  </div>
                </el-popover>
              </el-form-item>
              <div class="base-info">
                <el-form-item label="商品名称：">
                  <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="选择接口：">
                  <el-select v-model="form.interfaceId" placeholder="请选择已发布接口">
                    <el-option v-for="(item, i) in interfaceData" :key="i"
                               :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="选择类型：">
                  <el-select v-model="form.typeCode" placeholder="请选择接口类型">
                    <el-option v-for="(item, i) in typeData" :key="i"
                               :label="item.typename" :value="item.code"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <el-form-item class="base-description" label="接口描述：">
                <el-input type="textarea" resize="none" :rows="5" v-model="form.description"></el-input>
              </el-form-item>
            </div>
            <el-form-item label="返回示例：">
              <prism-editor class="el-textarea"
                            v-model="form.sample"
                            :code="form.sample" language="js">
              </prism-editor>
            </el-form-item>
            <el-form-item class="user-info-table">
              <p slot="label">
                <span>参数描述：</span>
                <el-button @click="addParam" size="small" type="primary" plain>新增参数</el-button>
              </p>
              <el-table
                :data="form.params0"
                border
                style="width: 100%">
                <el-table-column
                  align="center"
                  prop="paramName"
                  label="名称"
                  width="150">
                  <template slot-scope="scope">
                    <el-input v-if="Number(scope.$index) > 0"  v-model="scope.row.paramName"></el-input>
                    <span v-else>{{ scope.row.paramName }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="dataType"
                  label="类型"
                  width="120">
                  <template slot-scope="scope">
                    <el-select v-if="Number(scope.$index) > 0"
                               v-model="scope.row.dataType" placeholder="请选择">
                      <el-option
                        v-for="item in dataType"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <span v-else>{{ scope.row.dataType }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="isMust"
                  label="必填"
                  width="90">
                  <template slot-scope="scope">
                    <el-select v-if="Number(scope.$index) > 0"
                               v-model="scope.row.isMust" placeholder="请选择">
                      <el-option
                        label="是"
                        value="是">
                      </el-option>
                      <el-option
                        label="否"
                        value="否">
                      </el-option>
                    </el-select>
                    <span v-else>{{ scope.row.isMust }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="place"
                  label="位置"
                  width="120">
                  <template slot-scope="scope">
                    <el-input v-if="Number(scope.$index) > 0" v-model="scope.row.place"></el-input>
                    <span v-else>{{ scope.row.place }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="values"
                  label="示例值">
                  <template slot-scope="scope">
                    <el-input v-if="Number(scope.$index) > 0" v-model="scope.row.values"></el-input>
                    <span v-else>{{ scope.row.values }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="remark"
                  label="说明"
                  width="250">
                  <template slot-scope="scope">
                    <el-input v-if="Number(scope.$index) > 0" v-model="scope.row.remark"></el-input>
                    <span v-else>{{ scope.row.remark }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  width="80"
                  class-name="operation-column"
                  align="center"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button v-if="Number(scope.$index) > 0"
                               type="danger" icon="el-icon-delete" circle
                               @click="deleteParam(scope.$index, scope.row)"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
            <el-form-item class="user-info-table">
              <p slot="label">
                <span>返回值描述：</span>
                <el-button @click="addReturn" size="small" type="primary" plain>新增返回值</el-button>
              </p>
              <el-table
                :data="form.params1"
                border
                style="width: 100%">
                <el-table-column
                  align="center"
                  prop="paramName"
                  label="名称"
                  width="150">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.paramName"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="dataType"
                  label="类型"
                  width="120">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.dataType" placeholder="请选择">
                      <el-option
                        v-for="item in dataType"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="values"
                  label="示例值">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.values"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="remark"
                  label="说明"
                  width="250">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.remark"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  width="80"
                  class-name="operation-column"
                  align="center"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button type="danger" icon="el-icon-delete" circle
                               @click="deleteReturn(scope.$index, scope.row)"></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </div>
      </el-scrollbar>
    </section>
  </div>
</template>

<script>
export default {
  name: 'developerApply',
  data () {
    return {
      baseUrl: this.$axios.downUrl(),
      visible: false,
      beforehandIcon: ['chart', 'type', 'list', 'classify', 'guide', 'tag', 'ranking', 'switch', 'trend', 'edit'],
      uploadData: {
        token: sessionStorage.getItem('token')
      },
      form: {
        title: '',
        interfaceId: '',
        logoPath: 'tag',
        description: '',
        typeCode: '',
        sample: '',
        params0: [],
        params1: []
      },
      interfaceData: [],
      typeData: [],
      dataType: [
        {value: 'String', name: 'String'},
        {value: 'Number', name: 'Number'},
        {value: 'Object', name: 'Object'},
        {value: 'Boolean', name: 'Boolean'},
        {value: 'Date', name: 'Date'}
      ]
    }
  },
  created () {
    if (this.$route.query.id) {
      this.marketDetails();
    } else {
      this.form.params0.unshift({
        paramName: 'appkey',
        dataType: 'String',
        place: 'urParam',
        values: '000000',
        remark: '用户身份验证key',
        isMust: '是'
      })
    }
    this.interfaceList(); // 接口列表
    this.interfaceType(); // 接口类型
  },
  methods: {
    /* @event 选中预置icon
     * @param icon —— icon名 */
    switchIcon (icon) {
      this.form.logoPath = icon;
      this.visible = false;
    },
    /* @event 文件上传成功时的钩子 */
    onSuccess (res, file) {
      console.log(res, file.raw);
      this.form.logoPath = res.imgpath;
      this.visible = false;
      // this.form.logoPath = URL.createObjectURL(file.raw);
    },
    /* @event 上传文件之前的钩子
     * @param file —— 上传的文件
     * @return 若返回 false 或者返回 Promise 且被 reject，则停止上传 */
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传logo只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传logo大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    /* @method 商品详情信息 */
    marketDetails () {
      this.$axios.post('/market/detail/' + this.$route.query.id, '', s => {
        Object.keys(this.form).forEach((item) => {
          this.form[item] = s.data[item];
        });
        this.form.params0.unshift({
          paramName: 'appkey',
          dataType: 'String',
          place: 'urParam',
          values: '000000',
          remark: '用户身份验证key',
          isMust: '是'
        })
      });
    },
    /* @event 新增参数 */
    addParam () {
      this.form.params0.push({
        paramName: '',
        dataType: 'string',
        place: 'urParam',
        values: '',
        remark: '',
        isMust: '是'
      });
    },
    /* @event 删除参数 */
    deleteParam (index, item) {
      this.form.params0.splice(index, 1)
    },
    /* @event 新增返回值 */
    addReturn () {
      this.form.params1.push({
        paramName: '',
        dataType: 'string',
        values: '',
        remark: ''
      });
    },
    /* @event 删除返回值 */
    deleteReturn (index, item) {
      this.form.params1.splice(index, 1)
    },
    /* @method 接口类型数据获取 */
    interfaceType () {
      this.$axios.post('/market/types', '', s => {
        this.typeData = s.data;
      });
    },
    /* @method 接口列表数据获取 */
    interfaceList () {
      let data = new URLSearchParams();
      data.append('isPublished', 1);
      this.$axios.post('/interface/list', data, s => {
        this.interfaceData = s.data;
      });
    },
    /* @event 提交点击事件 */
    onSubmit () {
      let data = new URLSearchParams();
      this.$route.query.id ? data.append('id', this.$route.query.id) : '';
      let params0 = [...this.form.params0].splice(1);

      Object.keys(this.form).forEach((item) => {
        switch (item) {
          case 'interfaceId':
            data.append('intf.id', this.form[item]);
            break;
          case 'typeCode':
            data.append('type.code', this.form[item]);
            break;
          case 'params0':
            params0.forEach((item, i) => {
              data.append('params[' + i + '].type', 0);
              for (let key in item) {
                if (item.hasOwnProperty(key)) {
                  data.append('params[' + i + '].' + key, item[key]);
                }
              }
            });
            break;
          case 'params1':
            this.form.params1.forEach((item, i) => {
              data.append('params[' + (params0.length + i) + '].type', 1);
              for (let key in item) {
                if (item.hasOwnProperty(key)) {
                  data.append('params[' + (params0.length + i) + '].' + key, item[key]);
                }
              }
            })
            break;
          default:
            data.append(item, this.form[item]);
            break;
        }
      });

      this.$axios.post('/sell/newObject', data, s => {
        this.$router.push('/developer/shelves')
      });
    }
  }
}
</script>
