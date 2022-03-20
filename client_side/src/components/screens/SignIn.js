import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import M from 'materialize-css'

const SignIn = () => {
  const navigation = useNavigate()
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const postdata = () => {
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html: "invalid email", classes: '#d32f2f red darken-2'})
      return
    }
    fetch("/signin",{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          password,
          email
        })
      }).then(res=>res.json())
      .then(data=>{
        console.log(data)
       if(data.error){
        M.toast({html: data.error, classes: '#d32f2f red darken-2'})
       } else {
         M.toast({html:"signed in successfuly", classes: '#536dfe indigo accent-2'})
         navigation('/')
       } 
      }).catch(err=>{
        console.log(err)
      })
    }
  return (
   <div>
     <div className="mycard">
       <div className="card auth-card input-field">
       <h2>Instagram</h2>
       <input 
       type="text" 
       placeholder="email" 
       value={email}
       onChange={(e)=>setEmail(e.target.value)}/>
       <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}/>
       <button className="btn waves-effect waves-light #1976d2 blue darken-2"
       onClick={()=>postdata()}>
         Login
        </button>
        <h5>
          <Link to="/signup">Don't have an account?</Link>
        </h5>
       </div>
      </div>
   </div>
  )
}
export default SignIn