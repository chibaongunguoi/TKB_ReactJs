import { useState } from 'react'
import Form from './Form'
import { Analytics } from "@vercel/analytics/react"


export default function App() {
  let [count,setCount]=useState('');
  let [isSubmit,setIsSubmit]=useState(JSON.parse(localStorage.getItem('subjects'))!=null);
  return(
  <div id="wrapper">
    <Analytics/>
     {!isSubmit ?
      (<form id="row_number" onSubmit={()=>setIsSubmit(true)}>
        
        <label >Nhập số môn bạn học trong học kì này (từ 1 đến 20):</label>
        <input  id="row_n" value={count}
         onChange={(e) => setCount(e.target.value)}/>
        <input type="submit" value="Thêm" />
      </form>):<Form count={count}/>}
    </div>
  )
}
