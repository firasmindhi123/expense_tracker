let form=document.getElementById('addForm')
form.addEventListener('submit',onsubmit)
function onsubmit(e)
{
    e.preventDefault();
    let expense=document.getElementById('expense').value
    let description=document.getElementById('description').value
    let category=document.getElementById('category').value
    let my_obj={
        expense,
        description,
        category
 }
 const token=localStorage.getItem('token')
 
 axios.post("http://localhost:4000/user/expense",my_obj,{headers:{"Authorization":token}}).then((response)=>{
  
 
  listproduct(response.data.userdata)}).catch((err)=>showerr(err))
}
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
function leadership()     
{
  const inputElent=document.createElement('input')
  inputElent.type='button'
  inputElent.value='show leadership'
  inputElent.onclick=async()=>{
    const token=localStorage.getItem('token')
const userleaderboard=await axios.get('http://localhost:4000/premium/leadership',{headers:{"Authorization":token}})
    
    const leaderele=document.getElementById('leadership')
    leaderele.innerHTML+='<h2>leadership board</h2>'
    userleaderboard.data.forEach(userdetail => {
      
      leaderele.innerHTML+=`<li>name:${userdetail.name}  amount:${userdetail.totalExpese}</li>`
    });
  }
  document.getElementById('message').appendChild(inputElent)
}
function ispremium()
{
  document.getElementById('rzp_button').style.visibility="hidden"
        document.getElementById('message').innerHTML+='<h3>you are premium user</h3>'
}
window.addEventListener("DOMContentLoaded",()=>{
  const token=localStorage.getItem('token')
  console.log(token)
  const parsetoken=parseJwt(token)
  console.log(parsetoken)
  const premium=parsetoken.ispremium
  if(premium)
  {
     ispremium()
     leadership()
  }
  const objectUrl=new URLSearchParams(window.location.search)
  console.log(objectUrl)
  const page=objectUrl.get('page')||1
  console.log(page)
  const limit=5
  axios.get(`http://localhost:4000/user/detail?page=${page}&&limit=${limit}`,{headers:{"Authorization":token}}).then((response)=>{
    for(var i=0;i<response.data.products.length;i++){
      listproduct(response.data.products[i])

    }
    showpagination(response.data)

  }).
  catch((error)=>console.log(error))

})
function listproduct(my_obj)
{
  let parentelement =document.getElementById('listofitem');
    let chidhtml=`<tr class="info" id=${my_obj.id}> 
     <td> ${my_obj.expense}</td>
   <td>  ${my_obj.description}</td>
     <td> ${my_obj.category}</td>
                  <td> <button onclick=deleteuser('${my_obj.id}')>delete</button></td>
              </tr>`
 parentelement.innerHTML=parentelement.innerHTML+chidhtml
}

function showpagination({
    currentpage,
    hasnextpage,
    nextpage,
    haspreviouspage,
    previouspage,
    lastpage
})
{
  const pagination=document.getElementById('pagination')
   pagination.innerHTML=''
   if(haspreviouspage)
   {
  
    const btn2=document.createElement('button')
    btn2.innerHTML="previous page"
    btn2.addEventListener('click',()=>getProducts(previouspage))
    pagination.appendChild(btn2)
   }
   const btn=document.createElement('button')
    btn.innerHTML=`<h3>${currentpage}</h3>`
    btn.addEventListener('click',()=>getProducts(currentpage))
    pagination.appendChild(btn)
    if(hasnextpage)
    {
      const btn3=document.createElement('button')
    btn3.innerHTML='next page'
    btn3.addEventListener('click',()=>getProducts(nextpage))
    pagination.appendChild(btn3)
    }

}
function getProducts(page){
  const token=localStorage.getItem('token')
  const limit=5
  axios.get(`http://localhost:4000/user/detail?page=${page}&&limit=${limit}`,{headers:{"Authorization":token}}).then((response)=>{
    let pt =document.getElementById('listofitem');
    pt.innerHTML=''
   for(var i=0;i<response.data.products.length;i++)
   {
    listproduct(response.data.products[i])
   }
     
    showpagination(response.data)

  }).
  catch((error)=>console.log(error))

}

 function deleteuser(userId )
{
  const token=localStorage.getItem('token')
  axios.delete(`http://localhost:4000/user/delete/${userId}`,{headers:{"Authorization":token}}).then((response)=>{
    removeuser(userId) 
    
}

).catch((err)=>showerr(err))
}





function removeuser(userId){
  let parentelement =document.getElementById('listofitem');
 let childtobedeleted=document.getElementById(userId)
   if(childtobedeleted)
   {
      parentelement.removeChild(childtobedeleted)
   }
 }
 function showerr(err)
 {
  document.body.innerHTML+=`<div style="color:red">${err}</div>`
 }
 
  document.getElementById('rzp_button').onclick=async function(e){
    const token =localStorage.getItem('token')
    const response=await axios.get('http://localhost:4000/expense/pay',{headers:{'Authorization':token}})
    console.log(response)
    var options={
    "key":response.data.key_id,
    "order_id":response.data.order.id,
    
    "handler":async function(response){
      const res=await axios.post("http://localhost:4000/expense/traction",{
        order_id:options.order_id,
        payment_id:response.razorpay_payment_id},{headers:{'Authorization':token}})
        alert('you unlock premium')
        document.getElementById('rzp_button').style.visibility="hidden"
        document.getElementById('message').innerHTML+='<h3>you are premium user</h3>'
        localStorage.setItem('token',res.data.token)
        leadership()
    },
   

    }

    const rzp1=new Razorpay(options)
    rzp1.open()
    e.preventDefault()
    rzp1.on('payment.failed',async function(response){

    console.log(response)
    await axios.post("http://localhost:4000/expense/failtraction",{
        order_id:options.order_id,
        payment_id:response.razorpay_payment_id},{headers:{'Authorization':token}})
    alert('something went wrong')
    
    })
  }
  document.getElementById('download').onclick=async function(e)
  {
    let token =localStorage.getItem('token')
    axios.get('http://localhost:4000/user/download', { headers: {"Authorization" : token} })
    .then((response) => {
        if(response.status === 200){
            //the bcakend is essentially sending a download link
            //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileurl;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
           
        }

    })
    .catch((err) => {
      
        showerr(err)
      
    
    });
}