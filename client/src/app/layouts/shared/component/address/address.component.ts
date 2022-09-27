import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { AddressDropDown } from '../../models/address-dropdown.model';
import { Address } from '../../models/address.model';
import { Country } from '../../models/country.model';
import { State } from '../../models/state';
import { City } from '../../models/city';
import { CountryListService } from '../../services/country-list.service';
import { ClientSideStorageService } from '../../services/client-side-storage.service';
import { ManageClientService } from '../../../subscription/services/manage-client.service';
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  public countryArr: any = [];
  public stateArr: any = [];
  public cityArr: any = [];
  isSelected = true;
  addressdd: AddressDropDown = new AddressDropDown();
  addr: Address = new Address();
  addressFormFields: FormGroup;
  country: Country = new Country();
  state: State = new State();
  city: City = new City();
  selectedState: any = null;
  selectedCity: any = null;
  addres = [];
  constructor(
    private formBuilder: FormBuilder,
    private cService: CountryListService,
    private clientStorage: ClientSideStorageService,
    private manageClientService: ManageClientService
  ) { }
  ngOnInit(): void {
    this.getCountries();
  
      this.country.id = this.addr.country.id;
      this.state.id = this.addr.state.id;
      this.city.id = this.addr.city.id;
   
  }
  getAddressFromGroup(addr?) {
    if (addr && addr !== null && addr !== undefined) {
      this.addressFormFields = this.formBuilder.group({
        id: new FormControl(addr.id),
        addressText: new FormControl(addr.addressText),
        pincode: new FormControl(addr.pincode),
        country: this.formBuilder.group({
          id: new FormControl(addr.country.id),
        }),
        state: this.formBuilder.group({
          id: new FormControl(addr.state.id),
        }),
        city: this.formBuilder.group({
          id: new FormControl(addr.city.id),
        }),
      });
      if (addr.state && addr.state.name !== null) {
        this.selectedState = addr.state.name;
        if (addr.city && addr.city.name) {
          this.selectedCity = addr.city.name;
        } else {
          this.selectedState = null;
          this.selectedCity = null;
        }
        if (this.addres !== null) {
          this.addres.push(addr.state);
          this.addres.push(addr.city);
          this.manageClientService.setAddress(this.addres);
        }
        else {
          this.addressFormFields = this.formBuilder.group({
            addressText: new FormControl(this.addr.addressText),
            pincode: new FormControl(this.addr.pincode),
            country: this.formBuilder.group({
              id: new FormControl(this.country.id),
            }),
            state: this.formBuilder.group({
              id: new FormControl(this.state.id),
            }),
            city: this.formBuilder.group({
              id: new FormControl(this.city.id),
            }),
          });
          return this.addressFormFields;
        }
      }
      return this.addressFormFields;
    }
    else {
      this.addressFormFields = this.formBuilder.group({
        addressText: new FormControl(this.addr.addressText),
        pincode: new FormControl(this.addr.pincode),
        country: this.formBuilder.group({
          id: new FormControl(this.country.id),
        }),
        state: this.formBuilder.group({
          id: new FormControl(this.state.id),
        }),
        city: this.formBuilder.group({
          id: new FormControl(this.city.id),
        }),
      });
      return this.addressFormFields;
    }
  }
  getCountries(): void {
    this.clear();
    this.countryArr = JSON.parse(this.clientStorage.get('globalCountryData'));
    this.cService.getAllCountry().subscribe((data) => {
      if (data !== null) {
      this.countryArr = data;
      this.clientStorage.set('globalCountryData', JSON.stringify(data));
      if (this.addr && this.addr != null && this.addr.state.id && this.addr.state.id != null) {
        this.selectState(this.country.id);
      }
    }
    });
  }
  selectState(cid: any): void {
    this.selectedState = null;
    this.cityArr = [];
    this.countryArr.forEach((cl) => {
      if (cl.id === cid.id) {
        this.stateArr = cl.stateList;
      }
    });
    this.selectCity(this.state.id);
  }
  selectCity(cid: any): void {
    this.selectedCity = null;
    this.stateArr.forEach((cty) => {
      if (cty.id === cid.id) {
        this.cityArr = cty.cityList;
      } else if (cty.id === cid) {
        this.cityArr = cty.cityList;
      }
    });
  }
  getResponseLength(res): number {
    return Object.keys(res).length;
  }
  clear() {
    this.stateArr = [];
    this.cityArr = [];
  }
}
