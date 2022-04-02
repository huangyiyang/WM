export default {
  data () {
    return {
      centerDialogVisible: false,
      confFiled: '',
      xalisPath: '',
      yalisPath: '',
      renderOK: true,
      val: '',
      data: {
        status: 200,
        error: '',
        data: [{
          news_id: 51184,
          title: 'iPhone X Review: Innovative future with real black technology',
          source: 'Netease phone',
          view: 300,
          share: 200
        }, {
          news_id: 51183,
          title: 'Traffic paradise: How to design streets for people and unmanned vehicles in the future?',
          source: 'Netease smart',
          link: 'http://netease.smart/traffic-paradise/1235',
          view: 400,
          share: 300

        }, {
          news_id: 51182,
          title: 'Teslamask\'s American Business Relations: The government does not pay billions to build factories',
          source: 'AI Finance',
          members: ['Daniel', 'Mike', 'John'],
          view: 200,
          share: 180
        }, {
          news_id: 51181,
          title: 'Teslamask\'s American Business Relations: How to design streets for people and unmanned vehicles in the future?',
          source: 'Netease Finance',
          members: ['Daniel', 'Mike', 'John'],
          view: 500,
          share: 380
        }, {
          news_id: 51180,
          title: 'Teslamask\'s American Business Relations: Innovative future with real black technology',
          source: 'AI smart',
          members: ['Daniel', 'Mike', 'John'],
          view: 600,
          share: 480
        }]
      },
      jsonCheckedValue: 'res.error',
      selectableType: 'single',
      showSelectController: true,
      showLength: false,
      showLine: true,
      showDoubleQuotes: true,
      highlightMouseoverNode: true,
      highlightSelectedNode: true,
      selectOnClickNode: true,
      collapsedOnClickBrackets: true,
      useCustomLinkFormatter: false,
      path: 'res',
      deep: 3,
      itemData: {},
      itemPath: ''
    }
  },
  created () {
    this.val = JSON.stringify(this.data)
  },
  watch: {
    selectableType (newVal) {
      this.renderOK = false
      if (newVal === 'single') {
        this.value = 'res.error'
      } else if (newVal === 'multiple') {
        // this.value = ['res.error', 'res.data[0].title']
        this.value = []
      }
      // 重新渲染, 因为2中情况的v-model格式不同
      this.$nextTick(() => {
        this.renderOK = true
      })
    }
  },
  computed: {
    json () {
      try {
        /* eslint-disable vue/no-side-effects-in-computed-properties */
        this.cache = JSON.parse(this.val);
        return this.cache
      } catch (err) {
        return this.cache || this.data
      }
    }
  },
  methods: {
    handleClick (path, data, treeName = '') {
      this.itemPath = path
      this.itemData = !data ? data + '' : data // 处理 data = null 的情况
    },
    customLinkFormatter (data, key, parent, defaultFormatted) {
      if (data.startsWith('http://')) {
        return `<a style="color:red;" href="${data}" target="_blank">"${data}"</a>`;
      } else {
        return defaultFormatted;
      }
    },
    pickObjectPath (filed) {
      this.confFiled = filed;
      this.centerDialogVisible = true;
    },
    commitPick () {
      this.centerDialogVisible = false;
      this.selectClick(this.jsonCheckedValue)
    }
  }
}
