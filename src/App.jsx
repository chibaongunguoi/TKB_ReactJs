import { useState } from 'react'
import Form from './Form'
import { Analytics } from "@vercel/analytics/react"
import {initSubject} from './render_table'

export default function App() {
  let [count,setCount]=useState('');
  let [currentForm,setCurrentForm]=useState(localStorage.getItem('currentForm')==null?1:localStorage.getItem('currentForm'));
  let isSubmit=(JSON.parse(localStorage.getItem(`subject${currentForm}`))!=null);
  let [countForm,setCountForm]=useState(localStorage.getItem('countForm')==null?1:localStorage.getItem('countForm'));
  console.log(countForm,'render');
  function addForm(){
    setCountForm(parseInt(countForm)+1);
    console.log(parseInt(countForm)+1,'after setcountForm')
    localStorage.setItem('countForm',parseInt(countForm)+1);
  }
  function changecurrentForm(e){
    setCurrentForm(e.target.value);
    localStorage.setItem('currentForm',e.target.value);
  }
  return(
  <div id="wrapper">
    <Analytics />
    <Bar count={countForm} addForm={addForm} changecurrentForm={changecurrentForm} currentForm={currentForm}/> 
     {!isSubmit ?
      (<form id="row_number" onSubmit={()=>localStorage.setItem(`subject${currentForm}`,JSON.stringify( initSubject(count)))}>
        <label >Nhập số môn bạn học trong học kì này (từ 1 đến 20):</label>
        <input  id="row_n" value={count}
         onChange={(e) => setCount(e.target.value)}/>
        <input type="submit" value="Thêm" />
      </form>):
      <>
      <Form count={count} currentForm={currentForm} key={currentForm}/>
      </>}
    </div>
  )
}
function Bar({count,addForm,changecurrentForm,currentForm}){
  let tkb=[];
  let style={margin:0};
  for (let i=1;i<=count;i++){
    if (i==currentForm)
    tkb.push(
    <>
    <section class="nav-item nav-link active" style={{backgroundColor:'blue'}}>
    <button style={style} data-toggle="tab" onClick={(e)=>{changecurrentForm(e)}}class=" active" value={i}>TKB {i}</button>
    <button style={style} class="btn btn-success btn-sm rounded-0 text-white" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fa fa-edit"></i></button>
    <button style={style} onclick={()=> confirm('Bạn có chắc chắn xóa bản ghi này?')} class="btn btn-danger btn-sm rounded-0 text-white" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
    </section>
    </>)
    else
    tkb.push(<>
      <section class="nav-item nav-link">
      <button style={style} data-toggle="tab" onClick={(e)=>{changecurrentForm(e)}} value={i}>TKB {i}</button>
      <button style={style} class=" btn btn-success btn-sm rounded-0 text-white" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i class="fa fa-edit"></i></button>
      <button style={style} onclick="return confirm('Bạn có chắc chắn xóa bản ghi này?')" class="btn btn-danger btn-sm rounded-0 text-white" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i class="fa fa-trash"></i></button>
      </section>
      </>)
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