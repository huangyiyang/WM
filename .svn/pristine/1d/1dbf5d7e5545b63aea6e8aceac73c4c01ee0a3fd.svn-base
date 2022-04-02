export default {
  methods: {
    accessValidate (fun) {
      let data = new URLSearchParams();
      data.append('url', this.detailData.targetUrl)
      this.$axios.post('/interface/checkIpCount', data, s => {
        let {isAdd, usableCount, targetUrlCount} = s.data;
        isAdd && (typeof fun === 'function' ? fun() : (this.loginLoading = true));
        this.accessFail = false;
        if (!isAdd) {
          this.usableCount = usableCount;
          this.targetUrlCount = targetUrlCount;
          this.accessFail = true;
        }
      });
    }
  }
}
