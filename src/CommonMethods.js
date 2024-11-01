export default{
  groupBy(objectArray,targetProperty){
    return objectArray.reduce((acc,obj)=>{
      const key = obj[targetProperty];
      if(!acc[key]){
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    },{});
  },
  sumRounds(acc,e){
    return acc += parseInt(e.Rounds);
  },
  sortByRoundsAsc(a,b){
    //sort by rounds asc
    if(a.Rounds < b.Rounds){
      return -1;
    }
    if(a.Rounds > b.Rounds){
      return 1;
    }
    return 0;
  },
  sortByRoundsDesc(a,b){
    //sort by rounds desc
    if(a.Rounds > b.Rounds){
      return -1;
    }
    if(a.Rounds < b.Rounds){
      return 1;
    }
    return 0;
  },
  isNotReceived(e){
    let date = new Date(e.DateReceived);
    let time = date.getTime();
    return isNaN(time) || time == 0;
  },
  trimDateTimeForInput(dateStr){
    return new Date(dateStr).toISOString().slice(0,10);
  },
  dateToTimeStr(dateStr){
    let dateObj = new Date(dateStr);
    let hours = String(dateObj.getHours()).padStart(2,'0');
    let minutes = String(dateObj.getMinutes()).padStart(2,'0');
    return `${hours}:${minutes}`;
  },
  bufferToBase64(buff){
    return Array.prototype.map.call(buff,(ch)=>{ return String.fromCharCode(ch); }).join('');
  },
  shrinkImage(sourceFile){
    return new Promise((resolve,reject)=>{
      let ctx;
      let file = sourceFile;
      let img = document.createElement("img");
      let reader = new FileReader();
      reader.onload = (e)=>{
        img.src = e.target.result;
        img.onload = ()=>{
          let canvas = document.createElement("canvas");
          let MAX_WIDTH = 800;
          let MAX_HEIGHT = 600;
          let width = img.width;
          let height = img.height;
          if(width > height){
            if(width > MAX_WIDTH){
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          }else{
            if(height > MAX_HEIGHT){
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx = canvas.getContext('2d');
          ctx.drawImage(img,0,0,width,height);
          let dataurl = canvas.toDataURL("image/jpg",0.5);
          let blob = this.dataURLToBlob(dataurl);
          resolve(new File([blob],sourceFile.name));
        }
      };
      reader.readAsDataURL(file);
    });
  },
  dataURLToBlob(dataurl){
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr],{type:mime});
  }
}
