<template>
    <div class="wisemotion-simpleTable">
      <div class="wisemotion-simpleTable--defaultstyle" v-html="defaultstyle"></div>
      <!--{{cloumnPaths.map(cloumnPath => {-->
          <!--let {valueSaveToKey, columnName, elementPath} = cloumnPath-->
          <!--return {valueSaveToKey, columnName, elementPath}-->
        <!--})-->
      <!--}}-->
      <div class="wisemotion-simpleTable__header">
        <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
          <thead>
            <tr>
              <th v-for="columnOption in columnOptions"
                  :key="columnOption.valueSaveToKey"
              >{{columnOption.columnName || columnOption.valueSaveToKey}}</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="wisemotion-simpleTable__body">
        <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
          <tbody>
            <tr v-for="(row, index) in tableData"
                :key="`wisemotion-simpleTable__row-${index}`"
            >
              <td v-for="columnOption in columnOptions"
                  :key="`${columnOption.valueSaveToKey}-wisemotion-simpleTable__row-${index}`"
              >{{row[columnOption.valueSaveToKey]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--<el-table-->
        <!--:data="tableData"-->
        <!--max-height="450"-->
        <!--style="width: 100%">-->
        <!--<el-table-column-->
          <!--v-for="columnOption in columnOptions"-->
          <!--:prop="columnOption.valueSaveToKey"-->
          <!--:label="columnOption.columnName || columnOption.valueSaveToKey"-->
          <!--:key="columnOption.valueSaveToKey"-->
          <!--width="180">-->
        <!--</el-table-column>-->
      <!--</el-table>-->
    </div>
</template>

<script>
import Util from '@/utils/index'

const {detectUtil: {detectTableJson}, path2JsonUtil: {toSingelObject}} = Util;
export default {
  name: 'simple-table',
  data () {
    return {
      defaultstyle: `
        <style>
          .wisemotion-simpleTable--defaultstyle{
            height: 0px;
            width: 0px;
          }
          .wisemotion-simpleTable{
            width: 100%;
            height: 100%;
            overflow: hidden;
            padding: 15px;
            box-sizing: border-box;
          }
          .wisemotion-simpleTable__header tr{
            height: 50px;
          }
          .wisemotion-simpleTable__header th{
            width: 180px;
            color: #fff;
            background-color: #3a8ee6;
          }
          .wisemotion-simpleTable__body{
            height: calc(100% - 50px);
            overflow-y: scroll;
          }
          .wisemotion-simpleTable__body tr{
            height: 50px;
          }
          .wisemotion-simpleTable__body td{
            width: 180px;
          }
        </style>
      `
    }
  },
  props: {
    cookJson: {
      typeOf: Object
    },
    cloumnPaths: {
      typeOf: Object
    },
    tableDataPath: {
      typeOf: Object
    }
  },
  inject: ['interfaceScriptSave'],
  computed: {
    tableData: function () {
      // return detectTableJson(this.cookJson).tableHub.find(tableJsonTab => {
      //   return tableJsonTab.path === this.tableDataPath
      // }).json
      return toSingelObject(this.cookJson, this.tableDataPath).slice(0, 5)
    },
    columnOptions: function () {
      return this.cloumnPaths.map(cloumnPath => {
        let {valueSaveToKey, columnName, elementPath} = cloumnPath
        return {valueSaveToKey, columnName, elementPath}
      })
    }
  },
  methods: {
    presistScript () {
      const _Sdraw = (cookJson, tablePath, columns, FuncHub) => {
        const toSingelObject = FuncHub['toSingelObject'];
        const tableData = toSingelObject(cookJson, tablePath);
        const columnOptions = (() => {
          console.log('columns', columns)
          return columns.map(cloumnPath => {
            let { valueSaveToKey, columnName, elementPath } = cloumnPath
            return { valueSaveToKey, columnName, elementPath }
          })
        })()
        const headerHTML = columnOptions.map(columnOption => {
          return `
          <th> ${columnOption.columnName || columnOption.valueSaveToKey} </th>
        `
        }).join('\n');
        const bodyHTML = tableData.map(row => {
          let trHTML = columnOptions.map(columnOption => {
            return `
          <td> ${row[columnOption.valueSaveToKey]} </td>
        `
          }).join('\n');
          return `<tr >
                    ${trHTML}
                </tr>`
        }).join('\n');
        const tableHtml = `
        <div class="wisemotion-simpleTable">
          <div class="wisemotion-simpleTable--defaultstyle">
            <style>
              .wisemotion-simpleTable--defaultstyle{
                height: 0px;
                width: 0px;
              }
              .wisemotion-simpleTable{
                width: 100%;
                height: 100%;
                overflow: hidden;
                padding: 15px;
                box-sizing: border-box;
              }
              .wisemotion-simpleTable__header tr{
                height: 50px;
              }
              .wisemotion-simpleTable__header th{
                width: 180px;
                color: #fff;
                background-color: #3a8ee6;
              }
              .wisemotion-simpleTable__body{
                height: calc(100% - 50px);
                overflow-y: scroll;
              }
              .wisemotion-simpleTable__body tr{
                height: 50px;
              }
              .wisemotion-simpleTable__body td{
                width: 180px;
              }
            </style>
          </div>

          <div class="wisemotion-simpleTable__header">
            <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
              <thead>
                <tr>
                 ${headerHTML}
                </tr>
              </thead>
            </table>
          </div>
          <div class="wisemotion-simpleTable__body">
            <table cellspacing="0" cellpadding="0" border="0" style="width: 100%;">
              <tbody>
                ${bodyHTML}
              </tbody>
            </table>
          </div>
        </div>`

        // console.log(`tableHtml-->`, tableHtml)
        return tableHtml
      };
      this.interfaceScriptSave(_Sdraw.toString())
    }
  },
  created () {
    this.presistScript()
  }
}
</script>
