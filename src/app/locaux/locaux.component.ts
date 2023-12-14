import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild } from '@angular/core';
import {NgForm}  from '@angular/forms'

@Component({
  selector: 'app-locaux',
  templateUrl: './locaux.component.html',
  styleUrls: ['./locaux.component.css']
})
export class LocauxComponent implements OnInit {

  listLocaux:any;
  formData: any = {
    code: '',
    designation: '',
    type: '',
    natureExercice: '',
    region: '',
    district: '',
    altitude: '',
    longitude: ''
  };
  selectedLocal: any | null = null;
  @ViewChild('myForm') myForm!: NgForm;

  constructor(private httpClient:HttpClient) {

   }


  ngOnInit(): void {
    this.httpClient.get("http://localhost:8081/api/locaux")
      .subscribe(data => {
        this.listLocaux=data;
      });



  }
  deleteEntity(id : number) {
    // Assuming you want to send a DELETE request to delete the entity
    this.httpClient.delete(`http://localhost:8081/api/locaux/${id}`)
      .subscribe(() => {
        // Update the listLocaux after successful deletion
        this.httpClient.get("http://localhost:8081/api/locaux")
          .subscribe(data => {
            this.listLocaux = data;
          });
      });
  }

  createEntity() {
    if (this.selectedLocal) {
      // Appeler la méthode updateEntity si un selectedLocal existe
      this.updateEntity();
    } else {
      this.httpClient.post('http://localhost:8081/api/locaux', this.formData).subscribe(() => {
        // Mettez à jour la liste des locaux après la création réussie
        this.httpClient.get('http://localhost:8081/api/locaux').subscribe((data) => {
          this.listLocaux = data;
          this.resetFormAndSelectedLocal();
        });
      });
    }
  }
  updateEntity() {
    if (this.selectedLocal) {
      // Utilisez une requête PUT pour mettre à jour le local existant
      this.httpClient
        .put(`http://localhost:8081/api/locaux/${this.selectedLocal.id}`, this.formData)
        .subscribe(() => {
          // Mettez à jour la liste des locaux après la mise à jour réussie
          this.httpClient.get('http://localhost:8081/api/locaux').subscribe((data) => {
            this.listLocaux = data;
            this.resetFormAndSelectedLocal();
          });
        });
    }
  }
  private resetFormAndSelectedLocal() {
    // Réinitialisez le formulaire et définissez selectedLocal sur null
    this.myForm.resetForm();
    this.selectedLocal = null;
  }

  editEntity(local: any) {
    // Set the selectedLocal and populate the form for editing
    this.selectedLocal = local;
    this.formData = { ...local };
  }



  }
