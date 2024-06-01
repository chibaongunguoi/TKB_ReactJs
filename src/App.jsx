import { useEffect, useState,useRef } from 'react'
import Form from './Form'
import { Analytics } from "@vercel/analytics/react"
import {initSubject} from './render_table'

let idForm=1;
export default function App() {
  let [count,setCount]=useState('');
  let [currentForm,setCurrentForm]=useState(localStorage.getItem('currentForm')==null?1:localStorage.getItem('currentForm'));
  let isSubmit=(JSON.parse(localStorage.getItem(`subject${currentForm}`))!=null);
  let [countForm,setCountForm]=useState(localStorage.getItem('countForm')==null?1:localStorage.getItem('countForm'));
  let [formList,setFormList]=useState(()=>{
    if (JSON.parse(localStorage.getItem('formList'))&&JSON.parse(localStorage.getItem('formList')).length>0)
      {
        idForm=JSON.parse(localStorage.getItem('formList'))[JSON.parse(localStorage.getItem('formList')).length-1].id;
        idForm++;
      return JSON.parse(localStorage.getItem('formList'));
      }
    return [{id:idForm++,title:'TKB của tôi'}];
  })
  useEffect(()=>{
    localStorage.setItem('currentForm',currentForm );
  },[currentForm])
  function changecurrentForm(e){
    e.preventDefault();
    setCurrentForm(e.target.dataset.value);
    // e.target.style.backgroundColor='blue';
  }
  return(
  <div id="wrapper">
    <Analytics />
    <Bar setCurrentForm={setCurrentForm}setFormList={setFormList}changecurrentForm={changecurrentForm} currentForm={currentForm} formList={formList}/> 
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
function Bar({setCurrentForm,setFormList,editform,delform,addForm,changecurrentForm,currentForm,formList}){
  let sectionActive=useRef('');
  useEffect(()=>{
    if (formList.length==0) setFormList([{id:idForm++,title:'TKB của tôi'}]);
    localStorage.setItem('formList', JSON.stringify(formList));
  },[formList])
  
  function addForm(){
    let title=prompt('TKB mới này sẽ có tên là:');
    console.log(title)
    setCurrentForm(idForm);
   if (title==null||title=='')
    title=`TKB ${idForm}`;
    setFormList([...formList,{id:idForm++,title:title}]);
  }
  function delform(e){

    setFormList(formList.filter((form => form.id!=e.target.value)))
    localStorage.removeItem(`subject${e.target.value}`);
    if (e.target.value==currentForm){
      setCurrentForm( formList[0].id);
    }
    // let bar = confirm('Confirm or deny');
  }
  function editform(e){
    let title=prompt('Bạn muốn đổi tên thành:');
    if (title==null||title=='')
      title=e.target.previousElementSibling.innerHTML;
    setFormList(formList.map((form => {
      if (form.id!=e.target.value){
        return form; 
      }
      else return {...form,title:title}
    })))
    // let bar = confirm('Confirm or deny');
  }
  
  let tkb=[];
  let style={marginRight:6};
  
  for (let i of formList){
    tkb.push(<>
      <section class="nav-item nav-link" >
      <a class={i.id==currentForm?"":'text-muted'} href='' style={style} data-toggle="tab" onClick={(e)=>{changecurrentForm(e)}} data-value={i.id}>{i.title}</a>
      <button style={style}value={i.id} onClick={editform} class=" btn btn-success btn-sm rounded-0 text-white" type="button" data-toggle="tooltip" data-placement="top" title="Edit">ĐỔI TÊN</button>
      <button hidden={i.id==formList[0].id? true:false}style={style} value={i.id} onClick={delform} class="btn btn-danger btn-sm rounded-0 text-white" type="button" data-toggle="tooltip" data-placement="top" title="Delete">XÓA</button>
      </section>
      </>)
  }
  return (
  <nav>
        <div class="nav nav-tabs">
        {tkb}
          <i onClick={addForm} class="add-icon fa-solid fa-plus"></i>
        </div>
      </nav>
  )
}