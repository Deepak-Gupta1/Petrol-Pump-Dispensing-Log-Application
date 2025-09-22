import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { DispensingService } from '../../service/dispensing.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { DispensingRecordDto, IResponseModel } from '../../Model/projectModel';
import { environment } from '../../../environment/environment';
import { MatFormField } from "@angular/material/form-field";
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-petrol-dispensing-record',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatPaginator,MatSortModule],
  templateUrl: './petrol-dispensing-record.component.html',
  styleUrl: './petrol-dispensing-record.component.scss'
})
export class PetrolDispensingRecordComponent implements AfterViewInit {

  private dispensingService = inject(DispensingService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>([]);
  records: any[] = [];
  dispenserFilter = '';
  paymentModeFilter = '';
  startDate = '';
  endDate = '';

  dispenserOptions = [{ id: 1, name: "D-01" }, { id: 2, name: "D-02" }, { id: 3, name: "D-03" }, { id: 4, name: "D-05" }];
  paymentModes = [{ id: 1, name: "Cash" }, { id: 2, name: "Credit Card" }, { id: 3, name: "UPI" }];
  displayedColumns: string[] = [
    'dispenserNo',
    'quantityFilled',
    'vehicleNumber',
    'paymentMode',
    'timestamp',
    'paymentProofUrl'
  ];

  ngOnInit() {
    this.fetchRecords();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchRecords() {
    this.dispensingService.getRecords({
      dispenserNo: this.dispenserFilter,
      paymentMode: this.paymentModeFilter,
      startDate: this.startDate,
      endDate: this.endDate
    }).subscribe({
      next: (res: IResponseModel<DispensingRecordDto[]>) => {
        if (res.sucess) {
          this.setDataSource(res.data);
        }
      },
      error: err => {
        this.setDataSource([]);
      }
    });
  }

  private setDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data ?? []);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  viewPdf(dispenserId: number): string {
    return `${environment.apiEndPoint}/Dispensing/GetPaymentProofPdf/${dispenserId}`;
  }
}
