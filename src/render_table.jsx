import { useRef } from 'react'
export function renderTable(subjects){
  var color=["#55E6C1","#fd9644","#8e44ad","#f1c40f","#4b7bec","#2ecc71","#fc5c65"]
  let desn=[],dem=0,kt=0,p=0;
  let inf=
  <>
  <b>DSTT</b>
  <br />E205
  </>;
  for (let i of subjects){
    let day=parseInt(i.day);
    let begin=parseInt(i.begin);
    let end=parseInt(i.end);
    if(validate(day,begin,end))
      {
        desn.push({id:i.id,begin:(day-2)*14+begin,dem:end-begin,content:<>
          <b>{i.name}</b>
          <br />{i.room}
          </>});
        //tô màu xong rồi mới gán đếm
        // for (let j=begin;j<=end;j++){
        //   nodes.get((day-2)*14+j).style.backgroundColor=color[day-2]
        // }
      }
  }
   for (let i=0;i<desn.length-1;i++){
    for (let j=i+1;j<desn.length;j++){
      if (desn[i].begin>desn[j].begin){
        let t=desn[i];
        desn[i]=desn[j];
        desn[j]=t
      }
    }
   }
  let day=[],i=2,j=1;
  while (i<=8)
    {
      let line=[];
      if (i==8)
        line.push(<div>CN</div>)
      else
      line.push(<div>Thứ {i}</div>)
      j=1;
      while (j<=14){
        if ((p<desn.length&&(i-2)*14+j==desn[p].begin))
        {
          line.push(
            <div className='wrapnode'>
              <p  
                  className={j==6||j==11?"node more":"node"} style={{backgroundColor:color[parseInt(desn[p].begin/14)]}}
                    >{j}</p>
               <div className="desnew" >{desn[p].content}</div>
              </div>
            )
            j++;
          dem+=desn[p].dem;
          while (dem!=0){
            line.push(
              <div className='wrapnode'>
                <p  
                    className={j==6||j==11?"node more":"node"} style={{backgroundColor:color[parseInt(desn[p].begin/14)]}}  
                    >{j}</p>
                 
                </div>
              )
              dem--;
              j++;
          }
          p++;
        }
        else{
        line.push(
          <div className='wrapnode'>
            <p  
                className={j==6||j==11?"node more":"node"}  
                >{j}</p>
             
            </div>
          )
          j++;
      }
      
    }
       day.push(<li key={i}>{line}</li>)
       i++; 
    }
    return [day];
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


export function initSubject(count){
  let lines=[];
    for ( let id=1;id<=count;id++)
      lines.push({id:id,name:'',room:'',day:'',begin:'',end:''});
      return lines;
} 