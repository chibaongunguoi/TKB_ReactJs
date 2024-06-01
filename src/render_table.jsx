import { useRef } from 'react'
export function renderTable(){
    let itemsRef = useRef(new Map());
  let day=[];
  for (let i=2;i<=8;i++)
    {
      let line=[];
      if (i==8)
        line.push(<div>CN</div>)
      else
      line.push(<div>Thứ {i}</div>)
      for (let j=1;j<=14;j++)
        if (j==6 ||j==11)
        line.push(<p  
            className="more" ref={(node) => {
          if (node) {
            itemsRef.current.set((i-2)*14+j, node);
          } else {
            itemsRef.current.delete((i-2)*14+j);
          }
        }}>{j}</p>)
      else
      line.push(<p ref={(node) => {
        if (node) {
          itemsRef.current.set((i-2)*14+j, node);
        } else {
          itemsRef.current.delete((i-2)*14+j);
        }
      }}
>{j}</p>)
       day.push(<li key={i}>{line}</li>) 
    }
    return [itemsRef.current,day];
}

export function validate(day,begin,end){
  if (Number.isNaN(day) ||Number.isNaN(begin)||Number.isNaN(end))
    return false;
  if (day<2||day>8)
    return false;
  if (begin > end)
    return false;
  if (begin<1||begin>14)
    return false;
  if (end<1||end>14)
    return false;
  return true;
}

export function adddes(des,top,left,i){
  if (des.length==0||des.filter((item)=>item.id==i.id).length==0)
    return [...des,{id:i.id,
      content:<div className='des' style={{
        position:'absolute',top:top,left:left+60}}>
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
export function resetColor(nodes){
  for (let i=1;i<=98;i++)
    nodes.get(i).style.backgroundColor='#7f8fa6';
}
export function initSubject(count){
  let lines=[];
    for ( let id=1;id<=count;id++)
      lines.push({id:id,name:'',room:'',day:'',begin:'',end:''});
      return lines;
} 