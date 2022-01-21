import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment|undefined;
  nomAssignment?:string;
  nomAuteur?:string;
  dateDeRendu?:Date;
  note?:number;
  remarque?:string;

  constructor(private assignmentsService: AssignmentsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getAssignment();

    // console.log("Query Params :");
    // console.log(this.route.snapshot.queryParams);
    // console.log("Fragment :");
    // console.log(this.route.snapshot.fragment);
    this.route.queryParams
      .subscribe(params => {
        console.log("Query Params :");
        console.log(params);
      });

    this.route.fragment
      .subscribe(fragment => {
        console.log("Fragment :");
        console.log(fragment);
      });
  }

  getAssignment() {
    // on récupère l'id dans le snapshot passé par le routeur
    // le "+" force l'id de type string en "number"
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => this.assignment = assignment);
  }
 
  onSaveAssignment() {
    if (!this.assignment) return;

    if(this.nomAssignment) {
      this.assignment.nom = this.nomAssignment;
    };

    if(this.nomAuteur) {
      this.assignment.auteur = this.nomAuteur;
    };
 
    if(this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }

    if(this.note || this.note == 0) {
      this.assignment.note = this.note;
    };

    if(this.remarque) {
      this.assignment.remarque = this.remarque;
    }

    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log(message);
        this.router.navigate(["/home"]);
      });
 
    // navigation vers la home page
    // this.router.navigate(["/home"]);
  }
 

}
