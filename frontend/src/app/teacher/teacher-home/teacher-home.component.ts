import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.css']
})
export class TeacherHomeComponent implements OnInit {
  ngOnInit(): void {
    localStorage.setItem("prvih", "5")
  }

}
