import { API_URL,RES_PER_PAGE,DEV_KEY } from "./config.js";
import { getJSON, sendJSON } from "./helpers.js";
export const state={
    recipe:{},
    search:{
        query:"",
        results:[],
        currentPage:1,
        resultsPerPage:RES_PER_PAGE,
    },
    bookMarks:[]
}
export const loadRecepie=async function(receipeId)
{
    try{
        const data= await getJSON(`${API_URL}/${receipeId}`);
        let {recipe}=data.data;
        recipe.image=recipe["image_url"];
        recipe.cookingTime=recipe["cooking_time"];
        recipe.source=recipe["source_url"];
        if(state.bookMarks && state.bookMarks.length)
        {
            state.bookMarks.some((bkmark,index)=>{
                if(bkmark.id===recipe.id)
                {
                    recipe.isBookMarked=true;
                    bkmark.isActive=true;
                }
                else{
                    bkmark.isActive=false;
                }
            })
        }
        state.recipe=recipe;
    }
    catch(er)
    {
        console.log(er);
        
    }
   
}
export const loadSearchResults= async function(keyword)
{
    try{

        const data= await getJSON(`${API_URL}/?search=${keyword}`);
        if(data && data.data && data.data?.recipes.length)
        {
            state.search.query=keyword;
            state.search.results=data.data?.recipes.map(recip=>{
                return{
                    image:recip.image_url,
                    title:recip.title,
                    id:recip.id,
                    publisher:recip.publisher
                }
            })
        }
        state.search.currentPage=1;
    }
    catch(err)
    {
        console.error(err);
    }
}
export const getPaginatedResults=function(page)
{
    state.search.currentPage=page;
    const start=(page-1) *RES_PER_PAGE;
    const end=page*RES_PER_PAGE;
    return state.search.results.slice(start,end);
}
export const updateServings=function(newservings)
{
        state.recipe.ingredients.forEach(ing => {
        ing.quantity=ing.quantity*newservings/state.recipe.servings;
    });
    state.recipe.servings=newservings;
}
export const bookMarkRecipe=function(recipe)
{
    
    if(recipe.id===state.recipe.id){
        state.recipe.isBookMarked=true;
        state.bookMarks.push(recipe);
        localStorage.setItem("savedBookMarks",JSON.stringify(state.bookMarks));
    }
}
export const unBookMarkRecipe=function (recipe)
{
    if(recipe.id===state.recipe.id){
        state.recipe.isBookMarked=false;
        state.bookMarks=state.bookMarks.filter(st=>st.id!==recipe.id);
        if(state.bookMarks.length===0)
        {
            localStorage.removeItem("savedBookMarks");
        }
    }
}
export const loadSavedBookMarks=function()
{
    const savedBookMarks=localStorage.getItem("savedBookMarks");
    if(!savedBookMarks) return;
    state.bookMarks=JSON.parse(savedBookMarks);
}

export const uploadNewRecipe=async function(newRecipe)
{
    const ingredients=Object.entries(newRecipe).filter(ing=>{
        return ing[0].startsWith("ingredient") && ing[1]!=="";
    }).map(ingarr=>{
        const [quantity,unit,description]=ingarr[1].split(",");
        return {
            quantity:quantity===""?null:+quantity,
            unit,description
        }
    });
   const recipe={
    title:newRecipe.title,
    cooking_time:+newRecipe.cookingTime,
    image_url:newRecipe.image,
    servings:+newRecipe.servings,
    publisher:newRecipe.publisher,
    source_url:newRecipe.sourceUrl,
    ingredients
   }
   try{
    const data=await sendJSON(`${API_URL}/?key=${DEV_KEY}`,recipe);
    const postedRecipe=data.data.recipe;
    postedRecipe.image=postedRecipe["image_url"];
    postedRecipe.cookingTime=postedRecipe["cooking_time"];
    postedRecipe.source=postedRecipe["source_url"];
    postedRecipe.userKey=DEV_KEY;
    state.recipe=postedRecipe;
    bookMarkRecipe(postedRecipe);
   }
   catch(er)
   {
    throw er;
   }
}