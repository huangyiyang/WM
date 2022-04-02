<template>
  <div class="simpleCardGroup">
    <ul class="cards">
      <li class="cards-cell" v-for="card in cards" :key="card.path">
        <p class="cards-cell-title">{{card.title}}</p>
        <p class="cards-cell-num">{{card.value}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Util from '@/utils/index'

const {detectUtil: {detectTableJson}, path2JsonUtil: {toSingelObject}} = Util;
export default {
  name: 'simple-card-group',
  props: {
    cloumnPaths: Array,
    cookJson: Object
  },
  inject: ['interfaceScriptSave'],
  computed: {
    cards: function () {
      return this.cloumnPaths.map(card => {
        let {valueSaveToKey, elementPath, columnName} = card;
        return {title: columnName || valueSaveToKey, path: elementPath, value: toSingelObject(this.cookJson, elementPath)}
      }).filter(card => card.path)
    }
  },
  methods: {
    presistScript () {
      const _Sdraw = (cookJson, columns, FuncHub) => {
        const toSingelObject = FuncHub['toSingelObject'];
        const cardListJson = (() => {
          console.log('columns', columns)
          return columns.map(card => {
            let {valueSaveToKey, elementPath, columnName} = card;
            return {title: columnName || valueSaveToKey, path: elementPath, value: toSingelObject(cookJson, elementPath)}
          }).filter(card => card.path)
        })()
        let cardsHtml = cardListJson.map(card => {
          return `<li class="cards-cell">
            <p class="cards-cell-title">${card.title}</p>
            <p class="cards-cell-num">${card.value}</p>
          </li>`
        }).join('\n');
        var cardsListHtml = `<div class="wisemotion-simpleCardGroup">
          <ul class="wisemotion-cards">
            ${cardsHtml}
          </ul>
        </div>`;
        console.log(`cardsListHtml --> ${cardsListHtml}`)

        return cardsListHtml
      };
      this.interfaceScriptSave(_Sdraw.toString())
    }
  },
  created () {
    this.presistScript()
  }
}
</script>
