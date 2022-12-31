import icons from "../../img/icons.svg";
class BookMarkView{
    #parentElement=document.querySelector(".bookmarks__list");
    #data;
    render(data)
    {
        this.#data=data;
        const markup=this.#getMarkUp();
        this.#parentElement.innerHTML=markup;
    }
    #getMarkUp()
    {
        if(this.#data && this.#data.length)
        {
            return this.#data.map(dt=>{
                return ` <li class="preview">
                <a class="preview__link ${dt.isActive?'preview__link--active':''}" href="#${dt.id}">
                  <figure class="preview__fig">
                    <img src="${dt.image}"  alt="${dt.title}" />
                  </figure>
                  <div class="preview__data">
                    <h4 class="preview__name">
                      ${dt.title}
                    </h4>
                    <p class="preview__publisher">${dt.publisher}</p>
                  </div>
                </a>
              </li>`
            }).join("");
        }
        else{
            return ` <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>
              No bookmarks yet. Find a nice recipe and bookmark it :)
            </p>
          </div>`
        }
        
    }
}
export default new BookMarkView();