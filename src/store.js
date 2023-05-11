import { createStore } from 'vuex';
import {RepositoryFactory} from './api/RepositoryFactory';
import VueCookies from 'vue-cookies';
import router from './router';
const FirearmRepository = RepositoryFactory.get('firearm');
const AmmoRepository = RepositoryFactory.get('ammo');
const ManufacturerRepository = RepositoryFactory.get('manufacturer');
const ShootRepository = RepositoryFactory.get('shoot');
const CaliberRepository = RepositoryFactory.get('caliber');
const VendorRepository = RepositoryFactory.get('vendor');
const AmmoPurchaseRepository = RepositoryFactory.get('ammoPurchase');
const AuthRepository = RepositoryFactory.get('authorization');

//import VueCookies from 'vue-cookies'
//import AuthRepository from './api/AuthRepository'

const state = {
  auth_token:null,
  firearms:[],
  ammo:[],
  manufacturers:[],
  calibers:[],
  shoots:[],
  vendors:[],
  ammoPurchases:[],
  targetImages:[],
  pendingShoot:{}
}
const actions = {
  authenticate({commit},payload){
    AuthRepository.authenticate(payload.username,payload.password).then((response)=>{
      if(!response.data['error']){
        commit('setAuthToken',response.data.token);
        //this.dispatch(''); //todo init app here.
        router.push('home');
      }else{
        throw new Error(`API ${response.data['error']}`);
      }
    });
  },
  verifyToken({commit},payload){
    AuthRepository.verify(payload.auth_token).then((response)=>{
      if(!response.data['error']){
        commit('setAuthToken',response.data.auth_token);
        if(router.currentRoute.Path == '/'){
          //this.dispatch() //todo init app here.
          router.push('home');
        }
      }else{
        router.push('/');
      }
    });
  },
  getFirearms({commit}){
    FirearmRepository.setAuthToken(this.state.auth_token);
    FirearmRepository.get().then((response)=>{
      response.data.forEach((e)=>{
        commit('addFirearm',e);
      });
    }).catch((err)=>{
      throw new Error(`API ${err}`);
    });
  },
  getAmmo({commit}){
    AmmoRepository.setAuthToken(this.state.auth_token);
    AmmoRepository.get().then((response)=>{
      response.data.forEach((e)=>{
        commit('addAmmo',e);
      });
    }).catch((err)=>{
      throw new Error(`API ${err}`);
    });
  },
  getManufacturers({commit}){
    ManufacturerRepository.setAuthToken(this.state.auth_token);
    ManufacturerRepository.get().then((response)=>{
      response.data.forEach((e)=>{
        commit('addManufacturer',e);
      });
    }).catch((err)=>{
      throw new Error(`API ${err}`);
    });
  },
  getCalibers({commit}){
    CaliberRepository.setAuthToken(this.state.auth_token);
    CaliberRepository.get().then((response)=>{
      response.data.forEach((e)=>{
        commit('addCaliber',e);
      });
    }).catch((err)=>{
      throw new Error(`API ${err}`);
    });
  },
  getVendors({commit}){
    VendorRepository.setAuthToken(this.state.auth_token);
    VendorRepository.get().then((response)=>{
      response.data.forEach((e)=>{
        commit('addVendor',e);
      });
    }).catch((err)=>{
      throw new Error(`API ${err}`);
    });
  },
  getShoots({commit}){
    ShootRepository.setAuthToken(this.state.auth_token);
    return ShootRepository.get().then((response)=>{
      response.data.forEach((e)=>{
        commit('pushShoot',e);
      });
    });
  },
  getAmmoPurchases({commit}){
    return AmmoPurchaseRepository.get().then((response)=>{
      response.data.forEach((e)=>{
        commit('addAmmoPurchase',e);
      });
    });
  },
  getShootTargets({commit},payload){
    ShootRepository.setAuthToken(this.state.auth_token);
    return ShootRepository.getTargetImagesByShootId(payload).then((response)=>{
      response.data.forEach((e)=>{
        commit('addTargetImage',e);
      });
    });
  },
  addShoot({commit},payload){
    ShootRepository.setAuthToken(this.state.auth_token);
    return ShootRepository.add(payload).then((response)=>{
      commit('addShoot',response.data);
    });
  },
  addShootWithImages({commit},payload){
    ShootRepository.setAuthToken(this.state.auth_token);
    return ShootRepository.add(payload).then((response)=>{
      commit('addShoot',response.data);
      commit('setPendingShoot',response.data);
    });
  },
  addTargetImage({commit},payload){
    ShootRepository.setAuthToken(this.state.auth_token);
    return ShootRepository.addTargetImage({ShootId:this.state.pendingShoot.Id,File:payload}).then((response)=>{
      commit('addTargetImage',response.data);
    });
  },
  addManufacturer({commit},payload){
    ManufacturerRepository.setAuthToken(this.state.auth_token);
    return ManufacturerRepository.add(payload).then((response)=>{
      commit('addManufacturer',response.data);
    });
  },
  addVendor({commit},payload){
    VendorRepository.setAuthToken(this.state.auth_token);
    return VendorRepository.add(payload).then((response)=>{
      commit('addVendor',response.data);
    });
  },
  addCaliber({commit},payload){
    CaliberRepository.setAuthToken(this.state.auth_token);
    return CaliberRepository.add(payload).then((response)=>{
      commit('addCaliber',response.data);
    });
  },
  addFirearm({commit},payload){
    FirearmRepository.setAuthToken(this.state.auth_token);
    return FirearmRepository.add(payload).then((response)=>{
      commit('addFirearm',response.data);
    })
  },
  addAmmo({commit},payload){
    AmmoRepository.setAuthToken(this.state.auth_token);
    return AmmoRepository.add(payload).then((response)=>{
      commit('addAmmo',response.data);
    });
  },
  addAmmoPurchase({commit},payload){
    AmmoPurchaseRepository.setAuthToken(this.state.auth_token);
    return AmmoPurchaseRepository.add(payload).then((response)=>{
      commit('addAmmoPurchase',response.data);
    });
  },
  updateManufacturer({commit},payload){
    ManufacturerRepository.setAuthToken(this.state.auth_token);
    return ManufacturerRepository.update(payload).then((response)=>{
      commit('updateManufacturer',response.data);
    });
  },
  updateVendor({commit},payload){
    VendorRepository.setAuthToken(this.state.auth_token);
    return VendorRepository.update(payload).then((response)=>{
      commit('updateVendor',response.data);
    });
  },
  updateCaliber({commit},payload){
    CaliberRepository.setAuthToken(this.state.auth_token);
    return CaliberRepository.update(payload).then((response)=>{
      commit('updateCaliber',response.data);
    });
  },
  updateFirearm({commit},payload){
    FirearmRepository.setAuthToken(this.state.auth_token);
    return FirearmRepository.update(payload).then((response)=>{
      commit('updateFirearm',response.data);
    });
  },
  updateAmmo({commit},payload){
    AmmoRepository.setAuthToken(this.state.auth_token);
    return AmmoRepository.update(payload).then((response)=>{
      commit('updateAmmo',response.data);
    });
  },
  updateAmmoPurchase({commit},payload){
    AmmoPurchaseRepository.setAuthToken(this.state.auth_token);
    return AmmoPurchaseRepository.update(payload).then((response)=>{
      commit('updateAmmoPurchase',payload);
    });
  },
  receiveAmmoPurchase({commit},payload){
    AmmoPurchaseRepository.setAuthToken(this.state.auth_token);
    return AmmoPurchaseRepository.receivePurchase(payload).then((response)=>{
      commit('updateAmmoPurchase',response.data);
    });
  },
  deleteVendor({commit},payload){
    VendorRepository.setAuthToken(this.state.auth_token);
    return VendorRepository.delete(payload).then((response)=>{
      commit('deleteVendor',payload);
    });
  },
  deleteManufacturer({commit},payload){
    ManufacturerRepository.setAuthToken(this.state.auth_token);
    return ManufacturerRepository.delete(payload).then((resposne)=>{
      commit('deleteManufacturer',payload);
    });
  },
  deleteCaliber({commit},payload){
    CaliberRepository.setAuthToken(this.state.auth_token);
    return CaliberRepository.delete(payload).then((response)=>{
      commit('deleteCaliber',payload);
    });
  },
  deleteAmmo({commit},payload){
    AmmoRepository.setAuthToken(this.state.auth_token);
    return AmmoRepository.delete(payload).then((response)=>{
      commit('deleteAmmo',payload);
    });
  },
  deleteAmmoPurchase({commit},payload){
    AmmoPurchaseRepository.setAuthToken(this.state.auth_token);
    return AmmoPurchaseRepository.delete(payload).then((response)=>{
      commit('deleteAmmoPurchase',payload);
    });
  },
  deleteFirearm({commit},payload){
    FirearmRepository.setAuthToken(this.state.auth_token);
    return FirearmRepository.delete(payload).then((response)=>{
      commit('deleteFirearm',payload);
    });
  }
}
const mutations = {
  setAuthToken(state,auth_token){
    VueCookies.set('auth_token',auth_token,'4h');
    state.auth_token = auth_token;
  },
  addFirearm(state,firearm){
    state.firearms.push(firearm);
  },
  addAmmo(state,ammo){
    state.ammo.push(ammo);
  },
  addManufacturer(state,manufacturer){
    state.manufacturers.push(manufacturer);
  },
  addVendor(state,vendor){
    state.vendors.push(vendor);
  },
  addCaliber(state,caliber){
    state.calibers.push(caliber);
  },
  addShoot(state,shoot){
    let ammoIndex = state.ammo.findIndex((e)=>{ return e.Id == shoot.Ammo});
    state.ammo[ammoIndex].Rounds -= parseInt(shoot.Rounds);
    state.shoots.push(shoot);
  },
  pushShoot(state,shoot){
    state.shoots.push(shoot);
  },
  addTargetImage(state,image){
    state.targetImages.push(image);
  },
  setPendingShoot(state,shoot){
    state.pendingShoot = shoot;
  },
  addAmmoPurchase(state,purchase){
    let ammoIndex = state.ammo.findIndex((e)=>{ return e.Id == purchase.Ammo});
    state.ammo[ammoIndex].Rounds += parseInt(purchase.Rounds);
    state.ammoPurchases.push(purchase);
  },
  updateManufacturer(state,manufacturer){
    let targetIndex = state.manufacturers.findIndex((e)=>{ return e.Id == manufacturer.Id});
    state.manufacturers[targetIndex] = manufacturer;
  },
  updateVendor(state,vendor){
    let targetIndex = state.vendors.findIndex((e)=>{ return e.Id == vendor.Id});
    state.vendors[targetIndex] = vendor;
  },
  updateCaliber(state,caliber){
    let targetIndex = state.calibers.findIndex((e)=>{ return e.Id == caliber.Id });
    state.calibers[targetIndex] = caliber
  },
  updateFirearm(state,firearm){
    let targetIndex = state.firearms.findIndex((e)=>{ return e.Id == firearm.Id });
    state.firearms[targetIndex] = firearm;
  },
  updateAmmo(state,ammo){
    let targetIndex = state.ammo.findIndex((e)=>{ return e.Id == ammo.Id });
    state.ammo[targetIndex] = ammo;
  },
  updateAmmoPurchase(state,purchase){
    let ammoIndex = state.ammo.findIndex((e)=>{ return e.Id == purchase.Ammo});
    state.ammo[ammoIndex].Rounds += parseInt(purchase.Rounds);
    let targetIndex = state.ammo.findIndex((e)=>{ return e.Id == purchase.Id });
  },
  deleteVendor(state,id){
    state.vendors.splice(state.vendors.findIndex((e)=>{ return e.Id == id}),1);
  },
  deleteManufacturer(state,id){
    state.manufacturers.splice(state.manufacturers.findIndex((e)=>{ return e.Id == id}),1);
  },
  deleteCaliber(state,id){
    state.calibers.splice(state.calibers.findIndex((e)=>{ return e.Id == id}),1);
  },
  deleteAmmo(state,id){
    state.ammo.splice(state.ammo.findIndex((e)=>{ return e.Id == id}),1);
  },
  deleteAmmoPurchase(state,id){
    state.ammoPurchases.splice(state.ammoPurchases.findIndex((e)=>{ return e.Id == id}),1);
  },
  deleteFirearm(state,id){
    state.firearms.splice(state.firearms.findIndex((e)=>{ return e.Id == id}),1);
  }
}

export default createStore({state,actions,mutations});
