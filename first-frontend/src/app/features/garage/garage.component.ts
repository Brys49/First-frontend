import { Component, OnInit } from '@angular/core';
import { FireTruck } from '../../core/models/fire-truck.model';
import { FireTrucksService } from '../../core/services/fire-trucks.service';
import { MatDialog } from '@angular/material/dialog';
import { AddFireTruckDialogComponent } from './add-fire-truck-dialog/add-fire-truck-dialog.component';

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrls: ['./garage.component.scss']
})
export class GarageComponent implements OnInit {
  public fireTrucks: FireTruck[] = [];

  constructor(public fireTrucksService: FireTrucksService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getFireTrucks();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddFireTruckDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-fire-truck-dialog-panel',
      autoFocus: true,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe();
  }

  private getFireTrucks(): void {
    this.fireTrucksService.getFireTrucks()
      .subscribe(fireTrucks => this.fireTrucks = fireTrucks);
  }

}
