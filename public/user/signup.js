let form=document.getElementById('form')
form.addEventListener('submit', onsubmit)
async function onsubmit(e)
{
  try{
    e.preventDefault();
    let username=document.getElementById('username').value
    let email=document.getElementById('email').value
    let password=document.getElementById('password').value
    let my_obj={
        username,
        email,
        password
 }



 let response= await axios.post("http://localhost:4000/user/signup",my_obj)
 if(response.status===201)
 {
  window.location.href="login"
 }
 else{
 throw new Error('login.html')
 }
}catch(err){
  document.body.innerHTML+=`<div style="color:red;">${err}</div>`

}
}