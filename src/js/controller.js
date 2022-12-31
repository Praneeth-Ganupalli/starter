import icons from "../img/icons.svg";
import * as model from "./model.js";
import  recipeView  from "./Views/recepieView.js"
import searchView from "./Views/searchView.js";
import resultView from "./Views/resultView.js";
import paginationView from "./Views/paginationView.js";
import bookMarksView from "./Views/bookMarksView.js";
import addRecipeView from "./Views/addRecipeView.js";
let currentPage=1;
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe=async(keyword)=>{
  try{
    const id=window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderSpinner();
    await model.loadRecepie(id);
    //Rendering receipe
    recipeView.render(model.state.recipe);
    recipeView.addHandlerClick(updateServings);
    recipeView.addBookMarkHandler(bookMarkController);
  }
 catch(er)
 {
  recipeView.renderError("Sorry unable to fetch Relevant data");
  console.error(er);
 }
}
function renderSearchResultsController()
{
  const paginatedResults=model.getPaginatedResults(currentPage);
  resultView.render(paginatedResults);
  paginationView.render(model.state.search);
}
const searchRecipeController= async function()
{
  try{
   const searchTerm=searchView.getQuery();
   if(!searchTerm) return;
   recipeView.renderSpinner();
   await model.loadSearchResults(searchTerm);
   renderSearchResultsController();
  }
  catch(er)
  {
    recipeView.renderError("Sorry unable to fetch Relevant data");
    console.error(er);
  }
}
const handlePageChange=function(page)
{
  currentPage=page;
  renderSearchResultsController();
}
function updateServings(servings)
{
  model.updateServings(servings);
  recipeView.render(model.state.recipe);
}
function bookMarkController(state)
{
  if(state==="unBookMarked")
  {
    model.unBookMarkRecipe(model.state.recipe);
  }
  else{
    model.bookMarkRecipe(model.state.recipe);
  }
  bookMarksView.render(model.state.bookMarks);
}
async function uploadController(newRecipe)
{
  try{
    await model.uploadNewRecipe(newRecipe);
    addRecipeView.updateModalVisibility();
    recipeView.render(model.state.recipeView)
  }
  catch(error)
  {
    console.error(error);
  }


}
function init()
{
  searchView.addHandler(searchRecipeController);
  paginationView.addHandlerClick(handlePageChange);
  model.loadSavedBookMarks();
  if(model.state.bookMarks.length)
  {
    bookMarksView.render(model.state.bookMarks);
  }
  addRecipeView.addUploadHandler(uploadController)
}
init();
window.addEventListener("hashchange",showRecipe);
window.addEventListener("load",showRecipe);
