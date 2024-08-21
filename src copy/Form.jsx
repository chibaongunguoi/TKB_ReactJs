import {  useState,useRef,useEffect } from 'react'
import {renderTable,initSubject} from './render_table'
let id=1;
let pointer=0;
var color=["#55E6C1","#fd9644","#8e44ad","#f1c40f","#4b7bec","#2ecc71","#fc5c65"]
export function Input({value,className,title,edit,id,reflist,index}){
  function handlefocus(e){
    pointer=parseInt(e.target.dataset.value);
  }
 return (<li className='l-in'>
  <label>{title}:</label>
  <input onFocus={handlefocus}
  data-value={index}
  ref={(node) => {
          if (node) {
            reflist.current.push({id:id,node:node})
          } 
          else {
            reflist.current=reflist.current.filter((ref)=>ref.id!=id);
          }
        }} type="text" className={className}value={value} onChange={(e)=>{edit(id,className,e.target.value)}} />
</li>);
}

export function Line({subject,edit,del,reflist,index}){

return (<ul id={subject.id} className={'line'}>
<Input index={parseInt(index)*5}reflist={reflist} id={subject.id} className={"name"} value={subject.name} title={'Môn học'} edit={edit}/>
<Input index={parseInt(index)*5+1}reflist={reflist} id={subject.id}className={"room"} value={subject.room} title={'Phòng học'}edit={edit} />
<Input index={parseInt(index)*5+2}reflist={reflist} id={subject.id}className={"day"} value={subject.day} title={'Thứ'}edit={edit} />
<Input index={parseInt(index)*5+3}reflist={reflist} id={subject.id}className={"begin"} value={subject.begin} title={'Từ tiết'}edit={edit} />
<Input index={parseInt(index)*5+4}reflist={reflist} id={subject.id}className={"end"} value={subject.end} title={'Đến hết tiết'}edit={edit} />
{/* <button className="delete" value={subject.id } onClick={(e)=>{del(e.target.value)}}>xóa</button> */}
<li><i data-value={subject.id } onClick={(e)=>{del(e.target.dataset.value)}} class="del-icon fa-solid fa-xmark btn btn-danger btn-sm rounded-0 text-white del"></i></li>
</ul>)
}

export default function Form({count,currentForm}) {
  let refinput=useRef([])
  let [des,setDes]=useState([]);
  let [subjects,setSubject]=useState(()=>{
    if (JSON.parse(localStorage.getItem(`subject${currentForm}`)))
      {
        id=JSON.parse(localStorage.getItem(`subject${currentForm}`))[JSON.parse(localStorage.getItem(`subject${currentForm}`)).length-1].id;
        id++;
      return JSON.parse(localStorage.getItem(`subject${currentForm}`));
      }
    id=count+1;
    return initSubject(count);
  })
  useEffect(()=>{
    localStorage.setItem(`subject${currentForm}`, JSON.stringify(subjects));
  },[subjects])
  
  let [check,table]=renderTable(subjects);
 
  function add(){
    setSubject([...subjects,{id:id,name:'',room:'',day:'',begin:'',end:''}]);
    id++;
  }
  function edit (id,key,value){
    let nextsubject=subjects.map((sub)=>{
      if (sub.id==id){
        return {...sub,[key]:value}
      }else{
        return sub
      }
    })
    setSubject(nextsubject);
  }
 
  function deleteLine(id){
    setSubject(subjects.filter((subject)=> subject.id!=id));
    setDes(des.filter((des)=> des.id!=id));
  }
  useEffect(()=>{
function keyup(e){
  if(e.key=="Enter"||e.key=="ArrowRight")
    pointer+=1
  else if (e.key=="ArrowLeft")
  pointer-=1
  else if (e.key=="ArrowDown")
    pointer+=5
  else if (e.key=="ArrowUp")
    pointer-=5
  else return;
  if (pointer>=refinput.current.length) pointer=pointer-refinput.current.length
  else if (pointer<0) pointer=pointer+refinput.current.length
  refinput.current[pointer].node.focus()
 }
    window.addEventListener("keyup",keyup)
     return ()=>window.removeEventListener("keyup",keyup)
  },[refinput])
  return(
    <>
    <ul>
      {subjects.map((subject,index)=>{
        return (
                 <Line index={index}reflist={refinput} key={subject.id} subject={subject} edit={edit} del={deleteLine}/>
      )
      })}
       <div className="function">
        <button onClick={add} id="render">Thêm môn học</button>
        
      </div>
  </ul>
    {check.length>0? <div className='alert alert-danger' style={{fontSize:'21px'}}><i class="fa-solid fa-triangle-exclamation"></i> Chú ý các môn {check} đang bị trùng lịch xin hãy kiểm tra lại</div>:''}
      <div className="bigtable">
        <Time />
        <div className="smallbox">
          <Table subjects={subjects} des={des} setDes={setDes} table={table} />
        </div>
      </div>
  </>
  )
}
function Time(){
  return (
<ul className="info">
          <li>7:00 → 7:50</li>
          <li>8:00 → 8:50</li>
          <li>9:00 → 9:50</li>
          <li>10:00 → 10:50</li>
          <li>11:00 → 11:50</li>
          <li className="more">12:30 → 13:20</li>
          <li>13:30 → 14:20</li>
          <li>14:30 → 15:20</li>
          <li>15:30 → 16:20</li>
          <li>16:30 → 17:20</li>
          <li className="more">17:30 → 18:15</li>
          <li>18:15 → 19:00</li>
          <li>19:10 → 19:55</li>
          <li>19:55 → 20:40</li>
        </ul>
  );
}

function Table({subjects,des,setDes,table}){
  
 
  return (
    <>
    <ul className="table" id="table">
      {table} 
  </ul>
  {des.length>0 &&
  des.map((item)=>item.content)}
  </>
  )
}

