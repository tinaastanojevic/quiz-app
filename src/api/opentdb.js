export const fetchCategories= async () =>{
    const response= await fetch('api/api_category.php');
    return await response.json();
}

export const fetchQuestions=async (amount=4,categoryId,type="multiple")=>{
   const response= await fetch(`${window.location.origin}/api/api.php?amount=${amount}&category=${categoryId}&type=${type}&encode=url3986`);
   const data= await response.json();
   return data.results;
}