import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { AppUser } from './models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db:AngularFireDatabase,private afAuth:AngularFireAuth ) { }
  save(user:firebase.User){
      this.db.object('/users/'+user.uid).update({
        displayName: user.displayName,
        email:user.email,
      });
  }
  get(uid: string):FirebaseObjectObservable<AppUser>{
    return this.db.object('/users/'+uid);
  }
  
  createLogin(user){
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password).then(res=>{
      if(res.uid!=null || res.uid!='' || res.uid==undefined){
          this.db.object('/users/'+res.uid).update({
          displayName: user.firstName+' '+user.lastName,
          email:user.email,
          gender:user.gender,
          isAdmin:false,
          phone:user.mobile
        });
      }
    });
  }

 
/*
  register(user:AppUser){
    return this.db.list('/users/').push({
      name:user.firstName+user.lastName,
      mobile:user.mobile,
      password:user.password,
      email:user.email,
      isAdmin:false,
      gender:user.gender
    });
  }
*/
}
