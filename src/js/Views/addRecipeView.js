import icons from "../../img/icons.svg";
class AddRecipeView{
 _parentElement=document.querySelector(".upload");
 _window=document.querySelector(".add-recipe-window");
 _overLay=document.querySelector(".overlay");
 _btnOpen=document.querySelector(".nav__btn--add-recipe");
 _btnClose=document.querySelector(".btn--close-modal");
 constructor()
 {
    this.#addHandlers();
 }
 #addHandlers()
 {
    [this._btnOpen,this._btnClose,this._overLay].forEach(el=>el.addEventListener("click",this.updateModalVisibility.bind(this)));

 }
 updateModalVisibility()
 {
    this._window.classList.toggle("hidden");
    this._overLay.classList.toggle("hidden");
 }
 addUploadHandler(handler)
 {
    this._parentElement.addEventListener("submit",function(e){
        e.preventDefault();
        const data=[...new FormData(this)];
        handler(Object.fromEntries(data));
    })
 }
}
export default new AddRecipeView();