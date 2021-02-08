/**
 * モーダル表示
 *
 * Author : Takeshi Tomida <tomipetit@gmail.com>
 * Create : 2018.02
 */
import '../css/modal'

export default class{
  constructor(params){
    this.settings = Object.assign({},this.defaults(),params)
  }

  defaults(){
    return{
      target : 'body',
      modalId : 'modal',
      el : '',
      activeClass : 'active',
      contentSelector : '#container',
      overlayClose: true,
    }
  }

  setHtml(html){
    this.settings.el = html
    return this
  }

  show(){
    this.settings.scrPos = $( window ).scrollTop();
    this.createDom = this.createHtml()

    this.removeElement(document.getElementById(this.settings.modalId))
    document.querySelector(this.settings.target).appendChild(this.createDom)

    setTimeout(()=>{
      this.createDom.classList.add(this.settings.activeClass)
    },100)

    this.createDom.querySelector('.modal-close').addEventListener('click',() => {
      this.close()
    })
    if(this.settings.overlayClose){
      this.createDom.querySelector('.modal-overlay').addEventListener('click',() => {
        this.close()
      })
    }
  }
  removeElement(element){
    if(!element) return
    element.parentNode.removeChild(element)
  }

  close(){
    this.createDom.classList.remove(this.settings.activeClass)
  }

  createHtml(){
    let div = document.createElement('div')
    div.setAttribute('id', this.settings.modalId)
    let baseHtml = '<div class="modal-overlay"></div><div class="modal-content-wrap"><div class="modal-content"></div><div class="modal-close"></div></div>'
    div.innerHTML = baseHtml

    div.querySelector('.modal-content').appendChild(this.settings.el)
    return div
  }
}
