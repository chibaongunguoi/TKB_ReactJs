import { useEffect, useState,useRef } from 'react'
import Form from './Form'
import { Analytics } from "@vercel/analytics/react"
import {initSubject} from './render_table'

let idForm=0;
export default function App() {
  let [count,setCount]=useState('');
  let [currentForm,setCurrentForm]=useState(localStorage.getItem('currentForm')==null?1:localStorage.getItem('currentForm'));
  let isSubmit=(JSON.parse(localStorage.getItem(`subject${currentForm}`))!=null);
  
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

  function copyTKB(id){
    let subjects;
    let title=prompt('TKB mới được copy sang sẽ có tên là:');
     if (title==null||title=='')
      return;
     setCurrentForm(idForm);
     if (JSON.parse(localStorage.getItem(`subject${id}`)))
      {
      subjects= JSON.parse(localStorage.getItem(`subject${id}`));
      }
      else{
     subjects=initSubject(count);}
     localStorage.setItem(`subject${idForm}`, JSON.stringify(subjects));
      setFormList([...formList,{id:idForm++,title:title}]);
  }
  function addForm(){
    let title=prompt('TKB mới này sẽ có tên là:');
   if (title==null||title=='')
    return;
   setCurrentForm(idForm);
    setFormList([...formList,{id:idForm++,title:title}]);
  }
  function insertForm(idForm){
    let tkb=prompt('Nhập thời khóa biểu ở web trường :');
   if (tkb==null||tkb=='')
    return;
  let id=0,name='',room='',day='',begin='',end='',subject=[];


    let dem=0,i =0;
    while (i<tkb.length){
      dem=0,name='',room='',day='',begin='',end='';
      while (dem<2){
        if (tkb[i]=='\t') dem++;
        i++;
      }
      while (tkb[i]!='\t'){
        name+=tkb[i];
        i++;
      }
      while (dem<7){
        if (tkb[i]=='\t') dem++;
        i++;
      }
      while (tkb[i]!=','){
        i++;
      } 
      if (tkb[i-1] in ['2','3','4','5','6','7','8','9']){
      day+=tkb[i-1];
      }
      else day='8';
      i++;
      while (tkb[i]!='-'){
        begin+=tkb[i];
        i++;
      }
      i++;
      while (tkb[i]!=','){
        end+=tkb[i];
        i++;
      }
      i++;
      while (tkb[i]!='\t'){
        room+=tkb[i];
        i++;
      }
      i++;
      while (tkb[i]!='\n'&&i<tkb.length){
        i++;
      }
      i++;
      id++;
    subject.push({id:id,name:name,room:room,day:day,begin:begin,end:end});
    }
    localStorage.setItem(`subject${idForm}`,JSON.stringify(subject));
    location.reload();
    return;
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
    tkb.push(<div key={i.id}>
      <section className="dropdown "  >
        <div className="menu-item-name">
      <a className={i.id==currentForm?"":'text-muted'} href='' style={style} data-toggle="tab" onClick={(e)=>{changecurrentForm(e)}} data-value={i.id}>{i.title}</a>
      <button style={style}value={i.id} onClick={editform} className=" btn btn-success btn-sm rounded-0 text-white" type="button" data-toggle="tooltip" data-placement="top" title="Edit">ĐỔI TÊN</button>
      <button hidden={i.id==formList[0].id? true:false}style={style} value={i.id} onClick={delform} className="btn btn-danger btn-sm rounded-0 text-white" type="button" data-toggle="tooltip" data-placement="top" title="Delete">XÓA</button>
        </div>
        <i className="fa-solid fa-caret-down btn toggle-function btn " data-bs-toggle="dropdown" aria-expanded="false"></i>
      <ul className="dropdown-menu">
        <li className="">
          <a className="dropdown-item " href="" onClick={(e)=>{e.preventDefault();copyTKB(i.id)}}>Sao chép TKB này</a>
        </li>
        <li className="insert">

          <a className="dropdown-item " href="" onClick={(e)=>{e.preventDefault();}}>chèn TKB từ web trường<i style={{marginLeft:"5px"}} className="fa-solid fa-caret-right"></i></a>
          <ul className="dropdown-menu">
            <li>
            <a className="dropdown-item " href="" onClick={(e)=>{e.preventDefault();insertForm(i.id)}}>Đại học Bách Khoa Đà Nẵng</a>
            </li>
          </ul>
        </li>
        <li className="">
          <a className='dropdown-item text-danger' href=""  onClick={(e)=>{e.preventDefault();localStorage.removeItem(`subject${i.id}`);location.reload()}} >Làm mới TKB này</a>
        </li>  
      </ul>
      </section>
      </div>)
  }
  return (
  <nav>
        <div className="nav nav-tabs">
        {tkb}
          <i onClick={addForm} className="add-icon fa-solid fa-plus"></i>
        </div>
      </nav>
  )
}






