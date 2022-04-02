<template>
  <div class="home-details">
    <div class="home-container">
      <div class="home-details-title">
        <div class="logo">
          <template v-if="detailsData.logoPath">
            <img v-if="detailsData.logoPath.includes('/')" :src="baseUrl + detailsData.logoPath" class="avatar">
            <svg v-else class="home-icon" aria-hidden="true">
              <use :xlink:href="'#icon-' + detailsData.logoPath"></use>
            </svg>
          </template>
          <svg v-else class="home-icon" aria-hidden="true">
            <use xlink:href="#icon-ranking"></use>
          </svg>
          <p class="logo-info">
            <span>
              <i class="icon icon-call"></i>
              {{ detailsData.usenum }}
            </span>
            <span>
              <i class="el-icon-view"></i>
             {{ detailsData.viewnum }}
            </span>
          </p>
        </div>
        <div class="title">
          <div class="title-name">
            <p class="title-name-main">
              {{ detailsData.title }}
              <span>支持HTTPS</span>
              <span>企业专用</span>
            </p>
            <p class="title-name-sub">{{ detailsData.typeName }}</p>
            <p class="title-name-sub">{{ detailsData.description }}</p>
          </div>
          <div class="title-button">
            <el-button v-if="!detailsData.isBuy" type="primary" @click="applyClick">申请接口</el-button>
            <el-button type="success" @click="onlineTest">在线测试</el-button>
          </div>
        </div>
      </div>
      <div class="home-details-info">
        <div class="home-details-nav">
          <ul class="nav-list">
            <li :class="{active: currentAnchor === 'describe'}"
                @click="anchorClick('describe')">
              接口文档
            </li>
            <li :class="{active: currentAnchor === 'price'}"
                @click="anchorClick('price')">
              价格
            </li>
            <li :class="{active: currentAnchor === 'error'}"
                @click="anchorClick('error')">
              错误码
            </li>
          </ul>
        </div>
        <div class="home-details-content">
          <p ref="describe" class="api-describe">
            该接口可以查询并获取微信公众号全文、二维码、头像、封面、微信ID/昵称发布时间等信息。系统已对全文数据进行清洗，只去除了无用了class和style样式。
          </p>
          <p class="api-title"><span>※</span>接口信息</p>
          <ul class="api-information">
            <li>
              接口地址：
              <span id="apiPath">{{ baseUrl }}/WMAPI/data/{{ detailsData.id }}</span>
              <i @click="copyPath('apiPath')" title="复制接口地址" class="el-icon-document-copy"></i>
            </li>
            <!--<li>
              请求示例：{{ baseUrl }}/WMAPI/data/{{ detailsData.id }}
            </li>-->
            <li>
              支持协议：HTTP/HTTPS
            </li>
            <li>
              请求方式：GET/POST
            </li>
            <li>
              返回格式：UTF8 JSON
            </li>
          </ul>
          <p class="api-title"><span>※</span>请求参数</p>
          <el-table
            :data="detailsData.params0"
            border
            style="width: 100%">
            <el-table-column
              align="center"
              prop="paramName"
              label="名称"
              width="80">
            </el-table-column>
            <el-table-column
              align="center"
              prop="dataType"
              label="类型"
              width="80">
            </el-table-column>
            <el-table-column
              align="center"
              prop="isMust"
              label="必填"
              width="60">
            </el-table-column>
            <el-table-column
              align="center"
              prop="place"
              label="位置"
              width="100">
            </el-table-column>
            <el-table-column
              align="center"
              prop="values"
              show-overflow-tooltip
              label="示例值">
            </el-table-column>
            <el-table-column
              align="center"
              prop="remark"
              show-overflow-tooltip
              label="说明"
              width="190">
            </el-table-column>
          </el-table>
          <p class="api-title"><span>※</span>返回示例</p>
          <json-viewer
            :value="detailsData.sample"
            :expand-depth='5'
            copyable
            boxed></json-viewer>
          <p class="api-title"><span>※</span>返回参数</p>
          <el-table
            :data="detailsData.params1"
            border
            style="width: 100%">
            <el-table-column
              align="center"
              prop="paramName"
              label="名称"
              width="80">
            </el-table-column>
            <el-table-column
              align="center"
              prop="dataType"
              label="类型"
              width="80">
            </el-table-column>
            <el-table-column
              align="center"
              prop="values"
              show-overflow-tooltip
              label="示例值">
            </el-table-column>
            <el-table-column
              align="center"
              prop="remark"
              show-overflow-tooltip
              label="说明"
              width="190">
            </el-table-column>
          </el-table>
          <p ref="price" class="api-title"><span>※</span>接口价格</p>
          <el-table
            :data="priceData"
            border
            style="width: 100%">
            <el-table-column
              align="center"
              prop="level"
              label="用户级别"
              width="110">
            </el-table-column>
            <el-table-column
              align="center"
              prop="number"
              label="每日赠送次数"
              width="150">
            </el-table-column>
            <el-table-column
              align="center"
              prop="price"
              label="会员价格"
              width="130">
            </el-table-column>
            <el-table-column
              align="center"
              prop="remark"
              show-overflow-tooltip
              label="说明">
            </el-table-column>
          </el-table>
          <p ref="error" class="api-title"><span>※</span>错误状态码</p>
          <el-table
            :data="errorData"
            border
            style="width: 100%">
            <el-table-column
              align="center"
              prop="code"
              label="错误代码"
              width="110">
            </el-table-column>
            <el-table-column
              align="center"
              prop="values"
              label="错误消息"
              width="150">
            </el-table-column>
            <el-table-column
              align="center"
              prop="remark"
              show-overflow-tooltip
              label="解释帮助">
            </el-table-column>
          </el-table>
        </div>
        <!--<div class="home-details-other"></div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeDetails',
  data () {
    return {
      baseUrl: this.$axios.downUrl(),
      currentAnchor: 'describe',
      detailsData: {
        title: '接口1',
        logoPath: '',
        usenum: 0,
        viewnum: 0,
        typeName: '',
        description: '',
        params0: [{
          paramName: 'appkey',
          dataType: 'string',
          place: 'urParam',
          values: '000000',
          remark: '用户身份验证key',
          isMust: '是'
        }],
        params1: [{
          paramName: 'key',
          dataType: 'string',
          values: '该接口返回xml数据请参考微信调试工具里的结构',
          remark: '请参考上面的说明'
        }],
        sample: {
          'code': 200,
          'msg': 'success',
          'newlist': [
            {
              'title': '水调歌头明月几时有',
              'tags': '宋词精选,初中古诗,高中古诗,豪放,中秋节,月亮,怀人,祝福,卷四',
              'author': '苏轼'
            }
          ]
        }
      },
      priceData: [{
        level: '普通会员',
        number: '0次',
        price: '免费',
        remark: '申请接口时免费赠送测试额度'
      }, {
        level: '高级会员',
        number: '1000次',
        price: '99元/年',
        remark: '每个免费接口每天赠送1W次'
      }],
      errorData: [
        {
          code: '20',
          values: '用户appkkey无效',
          remark: '出现此错误代码请及时反馈或等待修复'
        },
        {
          code: '21',
          values: '无权限',
          remark: '出现此错误代码请及时反馈或等待修复'
        },
        {
          code: '22',
          values: '调用失败',
          remark: '出现此错误代码请及时反馈或等待修复'
        }
      ]
    }
  },
  created () {
    if (this.$route.query.id) {
      this.interfaceDetails();
    }
  },
  mounted () {

  },
  methods: {
    /* @event 锚点点击事件 */
    anchorClick (anchor) {
      this.currentAnchor = anchor;
      this.$refs[anchor].scrollIntoView();
    },
    /* @method 接口详情 */
    interfaceDetails () {
      this.$axios.post('/market/detail/' + this.$route.query.id, '', s => {
        this.detailsData = s.data;
        this.detailsData.params0.unshift({
          paramName: 'appkey',
          dataType: 'String',
          place: 'urParam',
          values: '000000',
          remark: '用户身份验证key',
          isMust: '是'
        });
      });
    },
    /* @event 申请接口点击事件 */
    applyClick () {
      if (this.$store.state.user) {
        this.$axios.post('/buy/order/' + this.$route.query.id, '', s => {

        });
      } else {
        this.$alert('请先登录！', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {
          }
        });
      }
    },
    /* @event 在线测试点击事件 */
    onlineTest () {

    },
    /* @event 复制已发布地址 */
    copyPath (id) {
      try {
        const range = document.createRange();
        range.selectNode(document.getElementById(id));
        const selection = window.getSelection();
        if (selection.rangeCount > 0) selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('Copy'); // 执行浏览器复制命令
        this.$message.success('复制成功！');
      } catch (e) {
        this.$message.error('复制错误！');
      }
    }
  },
  destroyed () {

  }
}
</script>
