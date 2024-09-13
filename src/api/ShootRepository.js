import Repository from './Repository';
import AppConfig from '../AppConfig';

const baseDomain = `${AppConfig[process.env.NODE_ENV].ARMORY_SERVICE_BASE}:${AppConfig[process.env.NODE_ENV].ARMORY_SERVICE_PORT}`;
const baseUrl = `${baseDomain}`;
const resource = '/shoot';
const target = '/target';

export default{
  setDomain(){
    Repository.defaults.baseURL = baseUrl;
  },
  setAuthToken(auth_token){
    Repository.defaults.headers.get['auth_token'] = auth_token;
    Repository.defaults.headers.put['auth_token'] = auth_token;
    Repository.defaults.headers.post['auth_token'] = auth_token;
    Repository.defaults.headers.delete['auth_token'] = auth_token;
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
    formData.append('Distance_Ft',payload.Distance_Ft);
    formData.append('Optic',payload.Optic);
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
