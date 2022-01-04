import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  titre = 'Liste des assignments :';
  //ajoutActive = false;

  assignmentSelectionne?:Assignment;
  formVisible = false;
  assignments?: Assignment[];

  page: number=1;
  limit: number=10;
  totalDocs?: number;
  totalPages?: number;
  hasPrevPage?: boolean;
  prevPage!: number;
  hasNextPage?: boolean;
  nextPage!: number;

  email!: string;
  password!: string;

  constructor(private assignmentService:AssignmentsService,
              private authService:AuthService,
              private router:Router) {}

  ngOnInit() {
    this.getAssignments(this.page, this.limit);
  }

  getAssignments(page:number, limit:number) {
    this.assignmentService
    .getAssignmentsPagine(page, limit)
    .subscribe(data => {
      this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.prevPage = data.prevPage;
      this.hasNextPage = data.hasNextPage;
      this.nextPage = data.nextPage;
      console.log("données reçues");
    });
  }

  getAssignmentColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }


  assignmentClique(assignment:Assignment) {
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
        this.router.navigate(["/home"], {replaceUrl:true});
      })
  }

  pageSuivante() {
    this.getAssignments(this.nextPage, this.limit);
  }

  pagePrecedente() {
    this.getAssignments(this.prevPage, this.limit);
  }

  login() {
    this.authService.logIn(this.email, this.password)
      .subscribe((response) => {
        console.log("connexion réussie");
        console.log(response);
        this.router.navigate(["/home"], {replaceUrl:true});
      });
  }
}
