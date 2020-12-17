import { Component } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-observable-error';
  srcArray = from([1, 2, 'A', 4]);

  obs = this.srcArray
    .pipe(
      map(val => {
        let result = val as number * 2;
        if (Number.isNaN(result)) {
          console.log('Error Occurred in Stream')
          throw new Error("Result is NaN")
        }
        return result
      }),
    );

  ngOnInit() {

    this.obs.subscribe(
      el => {
        console.log('Value Received ' + el)
      },
      err => {
        console.log("Error Returned to Subscriber " + err)
      },
      () => console.log("Processing Complete.")
    )
  }
}
