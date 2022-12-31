class SearchView{
    #parentElement=document.querySelector(".search");
    getQuery(){

      const query= this.#parentElement.querySelector(".search__field").value;
      this.#clearQuery();
      return query;
    }
    addHandler(handler)
    {
        this.#parentElement.addEventListener("submit",function(e){
            e.preventDefault();
            handler();
        })
    }
    
    #clearQuery()
    {
        this.#parentElement.querySelector(".search__field").value="";
    }
}

export default new SearchView();