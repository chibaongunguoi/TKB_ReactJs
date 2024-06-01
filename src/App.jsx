import { useState } from 'react'
import Form from './Form'
import { Analytics } from "@vercel/analytics/react"


export default function App() {
  let [count,setCount]=useState('');
  let [currentForm,setCurrentForm]=useState(localStorage.getItem('currentForm')==null?1:localStorage.getItem('currentForm'));
  let [isSubmit,setIsSubmit]=useState(JSON.parse(localStorage.getItem(`subject${currentForm}`))!=null);
  let [countForm,setCountForm]=useState(localStorage.getItem('countForm')==null?1:localStorage.getItem('countForm'));
  function addForm(){
    setCountForm(countForm+1);
    localStorage.setItem('countForm',countForm+1);
  }
  function changecurrentForm(e){
    setCurrentForm(e.target.value);
    localStorage.setItem('currentForm',e.target.value);
  }
  return(
  <div id="wrapper">
    <Analytics />
     {!isSubmit ?
      (<form id="row_number" onSubmit={()=>setIsSubmit(true)}>
        <label >Nhập số môn bạn học trong học kì này (từ 1 đến 20):</label>
        <input  id="row_n" value={count}
         onChange={(e) => setCount(e.target.value)}/>
        <input type="submit" value="Thêm" />
      </form>):
      <>
      <Bar count={countForm} addForm={addForm} changecurrentForm={changecurrentForm} currentForm={currentForm}/> 
      
      <Form count={count} currentForm={currentForm} key={currentForm}/>
      </>}
    </div>
  )
}
function Bar({count,addForm,changecurrentForm,currentForm}){
  let tkb=[];
  for (let i=1;i<=count;i++){
    if (i==currentForm)
    tkb.push(<button data-toggle="tab" onClick={(e)=>{changecurrentForm(e)}}class="nav-item nav-link active" value={i}>TKB {i}</button>)
    else
    tkb.push(<button data-toggle="tab"  onClick={e=>{changecurrentForm(e)}}class="nav-item nav-link" value={i}>TKB {i}</button>)
  }
  return (
  <nav>
        <div class="nav nav-tabs">
        {tkb}
          <button onClick={addForm}>Thêm TKB </button>
        </div>
      </nav>
  )
}