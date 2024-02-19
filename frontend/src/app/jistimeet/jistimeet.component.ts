import { Component, OnInit } from '@angular/core';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-jistimeet',
  templateUrl: './jistimeet.component.html',
  styleUrls: ['./jistimeet.component.css']
})
export class JistimeetComponent implements OnInit {


  ngOnInit(): void {

     let domain = 'meet.jit.si'
     let options = {
      roomName: 'Cas',
      width: 800,
      height: 600,
      parentNode: document.querySelector('#jitsi-container')
     }
     let api = new JitsiMeetExternalAPI(domain, options)

  }



}
