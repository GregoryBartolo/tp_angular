import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'

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
    {value: 'Technologies Web', photoMatiere: '../assets/imgs/web.jpg', photoProf: '../assets/imgs/prof-web.jpg'},
    {value: 'Grails', photoMatiere: '../assets/imgs/grails.png', photoProf: '../assets/imgs/prof-grails.jpg'},
    {value: 'Android', photoMatiere: '../assets/imgs/android.jpg', photoProf: '../assets/imgs/prof-android.jpg'},
    {value: 'Gestion de projet', photoMatiere: '../assets/imgs/gestion-de-projet.jpg', photoProf: '../assets/imgs/prof-gestion-de-projet.jpg'},
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
