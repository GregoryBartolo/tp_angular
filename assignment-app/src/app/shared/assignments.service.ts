import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { bdInitialAssignments } from './data';
import { DatePipe, formatDate } from '@angular/common';

@Injectable({
  //permet d'éviter de l'ajouter dans les modules..
  providedIn: 'root'
})
export class AssignmentsService {
  private HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  assignments:Assignment[] = [
    {
      id: 1,
      nom: 'Devoir WebComponents Buffa',
      dateDeRendu: new Date('2021-11-15'),
      rendu: false,
    },
    {
      id: 2,
      nom: 'Devoir Angular Buffa',
      dateDeRendu: new Date('2021-12-18'),
      rendu: false,
    },
    {
      id: 3,
      nom: 'Devoir Greg Galli gRails',
      dateDeRendu: new Date('2021-10-20'),
      rendu: true,
    },
  ];

  constructor(private loggingService:LoggingService,
              private http:HttpClient) { }

  url = "http://localhost:8010/api/assignments";

  getAssignment(id:number) : Observable<Assignment|undefined> {
    // const a:Assignment|undefined = this.assignments.find(elem => elem.id == id);
    // return of(a);
    return this.http.get<Assignment>(this.url + "/" + id)
      .pipe(
        tap(_ => {
          console.log("tap: assignment avec id = " + id + " requête GET envoyée sur MongoDB cloud");
        }),
        catchError(this.handleError<Assignment>(`getAssignment(id=${id})`))
    );
  }

  private handleError<T>(operation:any, result?: T) {
    return (error:any) : Observable<T> => {
      console.error(error);
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    }
  }

  getAssignments():Observable<Assignment[]> {
    // return of(this.assignments);
    return this.http.get<Assignment[]>(this.url);
  }

  getAssignmentsPagine(page:number, limit:number):Observable<any> {
    // return of(this.assignments);
    return this.http.get<Assignment[]>(this.url + "?page=" + page + "&limit=" + limit);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    // this.assignments.push(assignment);
    // this.loggingService.log(assignment.nom, "ajouté");

    // return of('Assignment ajouté');
    return this.http.post<Assignment>(this.url, assignment, this.HttpOptions);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // return of("Assignment service: assignment modifié !");
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    // let pos = this.assignments.indexOf(assignment);
    // this.assignments.splice(pos, 1);

    // return of("Assignment service: assignement supprimé !");
    let deleteURI = this.url + '/' + assignment._id;
    return this.http.delete(deleteURI);
  }

  peuplerBDAvecForkJoin(): Observable<any> {
    const appelsVersAddAssignment:Observable<Assignment>[] = [];

    bdInitialAssignments.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.auteur = a.auteur;
      nouvelAssignment.id = a.id;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.matiere = a.matiere;
      nouvelAssignment.urlPhotoMatiere = a.urlPhotoMatiere;
      nouvelAssignment.urlPhotoProf = a.urlPhotoProf;
      nouvelAssignment.note = a.note;
      if (!a.remarque) {
        nouvelAssignment.remarque = "";
      } else {
        nouvelAssignment.remarque = a.remarque;
      }
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment);
  }
}