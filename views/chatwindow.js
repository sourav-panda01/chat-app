//setTimeout(loadscreen,1000)

window.addEventListener('DOMContentLoaded', function loadscreen(e) {
    e.preventDefault()
    const token = localStorage.getItem('token');
    console.log("inside chatwindow.js script")
    setTimeout(showuser(e,token),1000)
})


async function showuser(e,token){
  e.preventDefault()
  console.log(token)
  try{
    var response=await axios.get('http://localhost:3000/getmessage', { headers: {Authorization: token} });
    console.log(response,"Inside try of showuser")
    console.log(response)
    var childElement=''
    for(let i=0;i<response.data.data.length;i++){
      childElement+=`<p>${response.data.data[i]}</p><br>`
    }
    var allchat=document.getElementById('allchat');
    allchat.innerHTML=childElement
  }
  catch(err){
    console.log("Catch error --",err)

  }

}




















var sendbtn=document.getElementById('sendbtn');
sendbtn.addEventListener('click', (e)=> {
  e.preventDefault();
  console.log('Hello send button script file');
  const token = localStorage.getItem("token");
  console.log(token)
  let message={message:document.getElementById('message').value}
  axios.post("http://localhost:3000/postmessage", message ,{ headers: {Authorization: token} })
  .then(response=>console.log(response))
  .catch(err=>console.log(err))
})


var logoutbtn=document.getElementById('logout');
logoutbtn.addEventListener('click',()=>{
  axios.get("http://localhost:3000/logout",{ headers: {Authorization: token} })
  .then(response=>{
    console.log("Inside logout axios call response")
    localStorage.removeItem(token);
  })
  .catch(err=>console.log(err))
})