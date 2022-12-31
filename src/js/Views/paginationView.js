import icons from "../../img/icons.svg";
class PaginationView{
    #parentElement=document.querySelector(".pagination");
    #data;
    render(data,fn)
    {
        this.#data=data;
        const markup= this.#getMarkup();
        this.#parentElement.innerHTML=markup;
    }
    #getMarkup()
    {
        const numPages=Math.ceil(this.#data.results.length/this.#data.resultsPerPage);
        const currentPage=this.#data.currentPage;
        console.log(numPages,currentPage);
        if(currentPage===1 && numPages>1)
        {
            return `
          <button class="btn--inline pagination__btn--next" data-goto="${currentPage+1}">
            <span>Page${currentPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> `
        }
        if(currentPage===numPages  && numPages>1)
        {
            return `
            <button class="btn--inline pagination__btn--prev" data-goto="${currentPage-1}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage-1}</span>
          </button> `
        }
        if(currentPage<numPages)
        {
            return `<button class="btn--inline pagination__btn--prev" data-goto="${currentPage-1}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage-1}</span>
          </button>
          <button class="btn--inline pagination__btn--next" data-goto="${currentPage+1}">
            <span>Page ${currentPage+1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> `
        }
        return "";
    }
    addHandlerClick(handler) {
        this.#parentElement.addEventListener('click', function (e) {
          const btn = e.target.closest('.btn--inline');
          if (!btn) return;
    
          const goToPage = +btn.dataset.goto;
          handler(goToPage);
        });
      }
}
export default new PaginationView();