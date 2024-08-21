
export function renderTable(subjects){
  var color=["#55E6C1","#fd9644","#8e44ad","#f1c40f","#4b7bec","#2ecc71","#fc5c65"]
  let desn=[],dem=0,p=0;
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
   let check=checkdesn(desn,subjects); 
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
          while (p<desn.length&&(i-2)*14+j>desn[p].begin)
          {p++;}
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
    return [check,day];
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
export function checkdesn(desn,subjects){
  let check=[],i=1,p=0;
  while (p<desn.length){
    i=1;
    while (p+i<desn.length && desn[p].begin+desn[p].dem>desn[p+i].begin){
      if (i==1)
      check.push(desn[p].id,desn[p+i].id)
    else
      check.push(desn[p+i].id)
    i++;
    }
    p++
  }
  check=sort(check);
  p=0;
  while (p<check.length-1){
    while (p+1<check.length&&check[p]==check[p+1])
    {
      check.splice(p,1);
    }
    p++;
  }
  p=0,i=0;
  while (p<check.length){
    if (check[p]==subjects[i].id){
      check[p]=subjects[i].name;
      p++;
      i++;
    }else if(check[p]<=subjects[i].id){
      p++;
    }else{
      i++;
    }
  }
  i=0;
  while (i<check.length-1){
    check[i]+=', ';
    i++;
  }
  return check;
}
function sort(a){
  for (let i=0;i<a.length-1;i++){
    for (let j=i+1;j<a.length;j++){
      if (a[i]>a[j]){
        let t=a[i];
        a[i]=a[j];
        a[j]=t
      }
    }
   }
   return a;
}

export function initSubject(count){
  let lines=[];
    for ( let id=1;id<=count;id++)
      lines.push({id:id,name:'',room:'',day:'',begin:'',end:''});
      return lines;
} 