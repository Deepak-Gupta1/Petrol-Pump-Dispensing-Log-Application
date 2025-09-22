
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DispensingService } from '../../service/dispensing.service';
import { DispenserModel, IResponseModel } from '../../Model/projectModel';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FuelNumberCheckDirective } from '../../../directive/fuel-number-check.directive';

@Component({
  selector: 'app-entry-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule,FuelNumberCheckDirective],
  templateUrl: './dispensing-form.component.html',
  styleUrl: './dispensing-form.component.scss'
})
export class DispensingFormComponent {
  DispenserDto: DispenserModel = {
    dispenserNo: 0,
    quantity: 0,
    vehicleNumber: "",
    paymentMode: 0,
    paymentProof: null
  }

  errorMsg = '';

  private dispensingService = inject(DispensingService);
  private __router = inject(Router);
  private _toster = inject(ToastrService)

  dispenserOptions = [{ id: 1, name: "D-01" }, { id: 2, name: "D-02" }, { id: 3, name: "D-03" }, { id: 4, name: "D-05" }];
  paymentModes = [{ id: 1, name: "Cash" }, { id: 2, name: "Credit Card" }, { id: 3, name: "UPI" }];

  onFileChange(event: any) {
    this.DispenserDto.paymentProof = event.target.files[0];
  }

  submitForm() {
    this.validation();
    if (this.errorMsg) {
      this._toster.error(this.errorMsg, "Error", {
        enableHtml: true,
        timeOut: 5000,
        progressBar: true,
        closeButton: true,
        positionClass: 'toast-top-right'
      });
      return;
    }

    const formData = new FormData();
    formData.append('dispenserNo', this.DispenserDto.dispenserNo.toString());
    formData.append('quantity', this.DispenserDto.quantity.toString());
    formData.append('vehicleNumber', this.DispenserDto.vehicleNumber);
    formData.append('paymentMode', this.DispenserDto.paymentMode.toString());
    if (this.DispenserDto.paymentProof) {
      formData.append('paymentProof', this.DispenserDto.paymentProof, this.DispenserDto.paymentProof.name);
    }

    this.dispensingService.submitRecord(formData).subscribe({
      next: (response: IResponseModel<boolean>) => {
        console.log('Record saved successfully:', response);
        if (response.sucess) {
          this._toster.success(response.message);
          this.__router.navigate(['/dispensingRecord']);

        } else {
          this._toster.error(response.message);
        }
      },
      error: (error) => {
        console.error('Error saving record:', error);
      }
    });

  }


  onPaymentModeChange(selectedMode: any) {
    this.DispenserDto.paymentMode = selectedMode.id;
  }



  validation() {
    this.errorMsg = '';
    if (!this.DispenserDto.dispenserNo) {
      this.errorMsg += 'Please select dispenser.<br>';
    }
    if (!this.DispenserDto.quantity) {
      this.errorMsg += 'Please enter quantity.<br>';
    }

    if (!this.DispenserDto.vehicleNumber || this.DispenserDto.vehicleNumber.length>10) {
      this.errorMsg += 'Please enter vehicle number.<br>';
    }
    if (!this.DispenserDto.paymentMode) {
      this.errorMsg += 'Please select payment mode.<br>';
    }
    if (!this.DispenserDto.paymentProof) {
      this.errorMsg += 'Please upload payment proof.<br>';
    }

  }
}
