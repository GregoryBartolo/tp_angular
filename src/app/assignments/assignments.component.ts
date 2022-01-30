import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';



registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments :';
  //ajoutActive = false;

  assignmentSelectionne?: Assignment;
  formVisible = false;
  assignmentsRendus?: Assignment[];
  assignmentsNonRendus?: Assignment[];

  pageRendu: number = 1;
  pageNonRendu: number = 1;
  limit: number = 10;
  totalDocs?: number;
  totalPages?: number;
  hasPrevPageRendu?: boolean;
  hasPrevPageNonRendu?: boolean;
  prevPageRendu!: number;
  prevPageNonRendu!: number;
  hasNextPageRendu?: boolean;
  hasNextPageNonRendu?: boolean;
  nextPageRendu!: number;
  nextPageNonRendu!: number;

  email!: string;
  password!: string;

  constructor(private assignmentService: AssignmentsService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.getAssignmentsRendu(this.pageRendu, this.limit);
    this.getAssignmentsNonRendu(this.pageNonRendu, this.limit);
  }

  getAssignmentsRendu(pageRendu: number, limit: number) {
    this.assignmentService
      .getAssignmentsPagineRendu(pageRendu, limit)
      .subscribe(data => {
        this.assignmentsRendus = data.docs;
        this.pageRendu = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPageRendu = data.hasPrevPage;
        this.prevPageRendu = data.prevPage;
        this.hasNextPageRendu = data.hasNextPage;
        this.nextPageRendu = data.nextPage;
        console.log("données reçues");
      });
  }

  getAssignmentsNonRendu(pageNonRendu: number, limit: number) {
    this.assignmentService
      .getAssignmentsPagineNonRendu(pageNonRendu, limit)
      .subscribe(data => {
        this.assignmentsNonRendus = data.docs;
        this.pageNonRendu = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.hasPrevPageNonRendu = data.hasPrevPage;
        this.prevPageNonRendu = data.prevPage;
        this.hasNextPageNonRendu = data.hasNextPage;
        this.nextPageNonRendu = data.nextPage;
        console.log("données reçues");
      });
  }

  assignmentClique(assignment: Assignment) {
    this.assignmentSelectionne = assignment;
    console.log("assignment clique = " + assignment.nom);
  }

  onAddAssignmentBtnClick() {
    // this.formVisible = true;
  }

  peuplerBD() {
    this.assignmentService.peuplerBDAvecForkJoin()
      .subscribe(() => {
        console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON REAFFICHE LA LISTE");
        this.router.navigate(["/home"], { replaceUrl: true });
      })
  }

  pageSuivanteRendu() {
    this.getAssignmentsRendu(this.nextPageRendu, this.limit);
  }

  pagePrecedenteRendu() {
    this.getAssignmentsRendu(this.prevPageRendu, this.limit);
  }

  pageSuivanteNonRendu() {
    this.getAssignmentsNonRendu(this.nextPageNonRendu, this.limit);
  }

  pagePrecedenteNonRendu() {
    this.getAssignmentsNonRendu(this.prevPageNonRendu, this.limit);
  }

  login() {
    this.authService.logIn(this.email, this.password)
      .subscribe((response) => {
        console.log("connexion réussie");
        if (response.auth) {
          this.authService.activeLogin();
        }
        this.router.navigate(["/home"], { replaceUrl: true });
      });
  }

  logout() {
    this.authService.logOut()
      .subscribe((response) => {
        console.log("déconnexion réussie");
        console.log(response);
        if (!response.auth) {
          this.authService.activeLogout();
        }
        this.router.navigate(["/home"], { replaceUrl: true });
      });
  }

  isConnected(): boolean {
    return this.authService.loggedIn;
  }

  drop(event: CdkDragDrop<string[]>) {

    if(this.assignmentsNonRendus !== undefined ){
      this.assignmentsNonRendus[event.currentIndex].rendu = true;
      this.assignmentService.updateAssignment(this.assignmentsNonRendus[event.currentIndex])
      .subscribe(message => {
        console.log(message);
        this.router.navigate(["/home"]);
      });

      if(this.assignmentsRendus !== undefined ){
        console.log(event)
        this.assignmentsRendus.unshift(this.assignmentsNonRendus[event.currentIndex])
        this.assignmentsNonRendus.splice(event.currentIndex,1)
      }
    }
  }

}
