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
    return isNaN(date.getTime());
  }
}
