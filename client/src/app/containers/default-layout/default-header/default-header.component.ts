import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { TranslateService } from '@ngx-translate/core';
import { ClientSideStorageService } from 'src/app/layouts/shared/services/client-side-storage.service';
import { DataSharingService } from 'src/app/layouts/shared/services/data-sharing.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls : ['./default-header.component.scss']
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  chooseLanguage ="Choose Language";
  userData:any;
  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  roleList=[];

  constructor(private classToggler: ClassToggleService,
    private clientSideStorage : ClientSideStorageService,
     private translateService : TranslateService,
     private dataSharingService : DataSharingService,
     private router : Router,) { 
    super();
  }

  public selectLanguage(event:any){
  this.translateService.use(event.target.value);
  }

  logout(){
     this.clientSideStorage.delete('user');
     this.router.navigate(['/']);
  }

  public selectedRole(event:any){
    this.dataSharingService.setNavigationMenuId(parseInt(event.target.value));

  }
}
