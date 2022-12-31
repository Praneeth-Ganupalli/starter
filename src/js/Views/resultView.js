import icons from "../../img/icons.svg";
class ResultView{
    #parentElement=document.querySelector("ul.results");
    #data;
    render(data)
    {
        this.#data=data;
        const markup=this.#getMarkUp();
        this.#clearUI();
        this.#parentElement.innerHTML=markup;

    }
    #clearUI()
    {
        this.#parentElement.innerHTML="";
    }
    #getMarkUp()
    {
      return  this.#data.map(dt=>{
            return `<li class="preview">
            <a class="preview__link" href="#${dt.id}">
              <figure class="preview__fig">
                <img src="${dt.image}" alt="${dt.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${dt.title}</h4>
                <p class="preview__publisher">${dt.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
            `
        }).join("");
    }
}
export default new ResultView();