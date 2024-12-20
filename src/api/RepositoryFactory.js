import AmmoPurchaseRepository from './AmmoPurchaseRepository';
import AmmoRepository from './AmmoRepository';
import AuthRepository from './AuthRepository';
import CaliberRepository from './CaliberRepository';
import FirearmRepository from './FirearmRepository';
import ManufacturerRepository from './ManufacturerRepository';
import ShootRepository from './ShootRepository';
import VendorRepository from './VendorRepository';
import OpticRepository from './OpticRepository';

const repositories = {
  ammoPurchase:AmmoPurchaseRepository,
  ammo:AmmoRepository,
  authorization:AuthRepository,
  caliber:CaliberRepository,
  firearm:FirearmRepository,
  manufacturer:ManufacturerRepository,
  shoot:ShootRepository,
  vendor:VendorRepository,
  optic:OpticRepository
};

export const RepositoryFactory = {
  get: name => repositories[name]
}
