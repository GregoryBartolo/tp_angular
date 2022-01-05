import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';

interface Matiere {
  value: string;
  photoMatiere: string;
  photoProf: string;
}

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  // @Output() nouvelAssignment = new EventEmitter<Assignment>();
  nomDevoir:string = ""; // champ du formulaire
  nomEleve:string = "";
  dateDeRendu?:Date;
  matieres: Matiere[] = [
    {value: 'Base de données', photoMatiere: '../assets/imgs/base-de-donnees.jpg', photoProf: '../assets/imgs/prof-bdd.jpg'},
    // {value: 'Technologies Web'},
    // {value: 'Grails'},
    // {value: 'Android'},
    // {value: 'Gestion de projet'},
  ];
  matiereChoisi?:Matiere;
  urlPhotoMatiere?:string;
  urlPhotoProf?:string;
  note?:number;
  remarque?:string;

  constructor(private assignmentsService:AssignmentsService,
              private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(event:Event) {
    const newAssignment:Assignment = new Assignment();
    newAssignment.id = Math.floor(Math.random()*1000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.auteur = this.nomEleve;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.matiere = this.matiereChoisi?.value;
    newAssignment.urlPhotoMatiere = this.urlPhotoMatiere;
    newAssignment.urlPhotoProf = this.urlPhotoProf;
    newAssignment.note = undefined;

    //this.assignments.push(newAssignment);
    // On envoie le nouvel assignment sous la forme d'un événement
    this.assignmentsService.addAssignment(newAssignment)
      .subscribe(message => console.log(message));

    this.router.navigate(['/home']);
  }

}
