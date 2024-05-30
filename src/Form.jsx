import {  useState,useRef,useEffect } from 'react'
import {renderTable,validate} from './render_table'
// const cookies = new Cookies();
// cookies.set('myCat', 'Pacman', { path: '/' });
// console.log(cookies.get('myCat'));
// import { subId } from './Context.tsx';
let id=1;
let pointer=0;
var color=["#55E6C1","#fd9644","#8e44ad","#f1c40f","#4b7bec","#2ecc71","#fc5c65"]
export function Input({value,className,title,edit,id,reflist}){
 return (<li>
  <label>{title}:</label>
  <input ref={(node) => {
          if (node) {
            reflist.current.push({id:id,node:node})
          } 
          else {
            reflist.current=reflist.current.filter((ref)=>ref.id!=id);
          }
        }} type="text" className={className}value={value} onChange={(e)=>{edit(id,className,e.target.value)}} />
</li>);
}

export function Line({subject,edit,del,reflist}){

return (<ul id={subject.id} className={'line'}>
<Input reflist={reflist} id={subject.id} className={"name"} value={subject.name} title={'Môn học'} edit={edit}/>
<Input reflist={reflist} id={subject.id}className={"room"} value={subject.room} title={'Phòng học'}edit={edit} />
<Input reflist={reflist} id={subject.id}className={"day"} value={subject.day} title={'Thứ'}edit={edit} />
<Input reflist={reflist} id={subject.id}className={"begin"} value={subject.begin} title={'Từ tiết'}edit={edit} />
<Input reflist={reflist} id={subject.id}className={"end"} value={subject.end} title={'Đến hết tiết'}edit={edit} />
<button className="delete" value={subject.id } onClick={(e)=>{del(e.target.value)}}>xóa</button>
</ul>)
}

export default function Form({count}) {
  let refinput=useRef([])
  let [des,setDes]=useState([]);
  let [subjects,setSubject]=useState(()=>{
    if (JSON.parse(localStorage.getItem('subjects')))
      return JSON.parse(localStorage.getItem('subjects'));
    let lines=[];
    for (id=1;id<=count;id++)
      lines.push({id:id,name:'',room:'',day:'',begin:'',end:''});
      return lines;
  })
  console.log(subjects)
  useEffect(()=>{
    localStorage.setItem("subjects", JSON.stringify(subjects));
  },[subjects])


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
      {subjects.map((subject)=>{
        return (
        <Line reflist={refinput} key={subject.id} subject={subject} edit={edit} del={deleteLine}/>
      )
      })}
       <div className="function">
        <button onClick={add} id="render">Thêm môn học</button>
        <button id="reset" style={{backgroundColor:'red'}} onClick={()=>{localStorage.clear();location.reload()}} >Làm mới</button>
      </div>
  </ul>
      <div className="bigtable">
        <Time />
        <div className="smallbox">
          <Table subjects={subjects} des={des} setDes={setDes}/>
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

function Table({subjects,des,setDes}){
  let [nodes,table]=renderTable();
  
  useEffect(()=>{
    for (let i=1;i<=98;i++)
      nodes.get(i).style.backgroundColor='#7f8fa6';
    for (let i of subjects){
      let day=parseInt(i.day);
      let begin=parseInt(i.begin);
      let end=parseInt(i.end);
      if(validate(day,begin,end))
        {
          let top=nodes.get((day-2)*14+begin).getBoundingClientRect().top;
          let left=nodes.get((day-2)*14+begin).getBoundingClientRect().left;
          setDes(
            des=>{            
              if (des.length==0)
              return [...des,{id:i.id,
                content:<div className='des' style={{
                  position:'absolute',top:top,left:left+60}}>
                <b>{i.name}</b>
               <br />{i.room} 
               </div>}]
               else{
                let desNode=des.filter((item)=>item.id==i.id);
                  if (desNode.length==0) 
                    return [...des,{id:i.id,
                      content:<div style={{position:'absolute',top:top,left:left+60}}>
                      <b>{i.name}</b>
                     <br />{i.room} 
                     </div>}]
                     else{
                      return des.map((item)=>{
                        if (item.id==i.id)
                          return {id:i.id,
                            content:<div style={{position:'absolute',top:top,left:left+60}}>
                            <b>{i.name}</b>
                           <br />{i.room} 
                           </div>}
                           else return item;
                      })
                     }
               }
              }
          );
          for (let j=begin;j<=end;j++){
            nodes.get((day-2)*14+j).style.backgroundColor=color[day-2]
          }
        }
        else{
          if (des.filter((item) =>item.id==i.id).length>0){
            setDes(des.filter((item) =>item.id!=i.id))
          }
        }
    }
  },[subjects])
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

