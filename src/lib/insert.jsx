export function insertForm(idForm){
    let tkb=prompt('Nhập thời khóa biểu ở web trường :');
   if (tkb==null||tkb=='')
    return;
  let id=0,name='',room='',day='',begin='',end='',subject=[],kt=0;
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
      
      for (let j=2;j<=7;j++)
        if (tkb[i-1]==j.toString()){
      day+=tkb[i-1];
    kt=1}
      
      if (kt==0)
      day='8';
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
  export function insertFormdk(idForm){
    let tkb=prompt('Nhập thời khóa biểu ở web đăng kí tín chỉ :');
   if (tkb==null||tkb=='')
    return;
  let id=0,name='',room='',day='',begin='',end='',subject=[],kt=0;
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
      while (dem<5){
        if (tkb[i]=='\t') dem++;
        i++;
      }
      while (tkb[i]!=':'){
        i++;
      } 
      
      for (let j=2;j<=7;j++)
        if (tkb[i-1]==j.toString()){
      day+=tkb[i-1];
    kt=1;
  break;}
      
      if (kt==0)
      day='8';
      i+=2;
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
      console.log({id:id,name:name,room:room,day:day,begin:begin,end:end})
    subject.push({id:id,name:name,room:room,day:day,begin:begin,end:end});
  }
    localStorage.setItem(`subject${idForm}`,JSON.stringify(subject));
    location.reload();
    return;
  }