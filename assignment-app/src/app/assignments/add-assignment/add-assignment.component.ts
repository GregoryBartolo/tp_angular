import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  // @Output() nouvelAssignment = new EventEmitter<Assignment>();
  nomDevoir:string = ""; // champ du formulaire
  dateDeRendu?:Date;

  constructor(private assignmentsService:AssignmentsService,
              private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(event:Event) {
    const newAssignment:Assignment = new Assignment();
    newAssignment.id = Math.floor(Math.random()*1000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;

    //this.assignments.push(newAssignment);
    // On envoie le nouvel assignment sous la forme d'un événement
    this.assignmentsService.addAssignment(newAssignment)
      .subscribe(message => console.log(message));

    this.router.navigate(['/home']);
  }

}
