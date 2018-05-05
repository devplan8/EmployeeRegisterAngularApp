import { Injectable } from '@angular/core';
import { Employee } from './employee.model'
import { Http, RequestOptions, Headers, RequestMethod, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'



@Injectable()
export class EmployeeService {
  employeeList: Employee[];
  selectedEmployee: Employee;
  constructor(private http: Http) { }

  postEmployee(emp: Employee) {
    var body = JSON.stringify(emp);
    var headerOptions = new Headers({ 'content-type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Post, headers: headerOptions });

    return this.http.post('http://localhost:64677/api/Employee', body, requestOptions).map(x => x.json());
  }

  putEmployee(id, emp: Employee) {
    var body = JSON.stringify(emp);
    var headeroptions = new Headers({ 'content-type': 'application/json' });
    var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headeroptions });
    return this.http.put('http://localhost:64677/api/Employee/' + id, body, requestOptions)
      .map(res => res.json());
  }

  deleteEmployee(id: number) {
    return this.http.delete('http://localhost:64677/api/Employee/' + id).map(res => res.json());
  }

  getEmployeeList() {
    this.http.get('http://localhost:64677/api/Employee')
      .map((data: Response) => {
        return data.json() as Employee[];
      }).toPromise().then(x => {
        this.employeeList = x;
      })
  }
}
