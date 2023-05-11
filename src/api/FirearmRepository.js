import Repository from './Repository';

const baseDomain = process.env.NODE_ENV == 'production' ? 'https://api.outlawdesigns.io:8420':'http://localhost:8420';
const baseUrl = `${baseDomain}`;
const resource = '/firearm';

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
    Object.keys(payload).forEach((k)=>{ formData.append(k,payload[k]) });
    return Repository.post(`${resource}`,formData,{headers:{'Content-Type':'multipart/form-data'}});
  },
  update(payload){
    this.setDomain();
    let formData = new FormData();
    Object.keys(payload).forEach((k)=>{ formData.append(k,payload[k]) });
    return Repository.put(`${resource}/${payload.Id}`,formData,{headers:{'Content-Type':'multipart/form-data'}});
  },
  delete(payload){
    this.setDomain();
    return Repository.delete(`${resource}/${payload}`);
  }
}
