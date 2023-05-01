import Repository from './Repository';

const baseDomain = 'http://localhost:9912';
const baseUrl = `${baseDomain}`;
const resource = '/shoot';
const target = '/target';

export default{
  setDomain(){
    Repository.defaults.baseURL = baseUrl;
  },
  setAuthToken(auth_token){
    Repository.defaults.headers.get['auth_token'] = auth_token;
  },
  get(){
    this.setDomain();
    return Repository.get(`${resource}`);
  },
  getById(id){
    this.setDomain();
    return Repository.get(`${resource}/${id}`);
  },
  add(payload){
    this.setDomain();
    let formData = new FormData();
    formData.append('FireArm',payload.FireArm);
    formData.append('Ammo',payload.Ammo);
    formData.append('Rounds',payload.Rounds);
    return Repository.post(`${resource}`,formData,{headers:{'Content-Type':'multipart/form-data'}});
  },
  addTargetImage(payload){
    this.setDomain();
    let formData = new FormData();
    formData.append('File',payload.File);
    formData.append('ShootId',payload.ShootId);
    return Repository.post(`${resource}/${payload.ShootId}/target`,formData,{headers:{'Content-Type':'multipart/form-data'}});
  },
  getTargetImagesByShootId(payload){
    this.setDomain();
    return Repository.get(`${resource}/${payload}/target`);
  }
}
