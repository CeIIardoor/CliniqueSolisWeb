import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IPatientRegister} from "../register-patient/PatientModel/ipatient-register";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Calendar,CalendarOptions, DateSelectArg, EventApi, EventClickArg} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import {createEventId, INITIAL_EVENTS} from "./event-utils";
import {FormGroup} from "@angular/forms";
import {FormBuilder} from "@angular/forms";
import {debounceTime, distinctUntilChanged, filter, fromEvent, tap} from "rxjs";





@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',

})
export class RendezVousComponent {
  rendezVous:string="";
  canchange:boolean=false;
  addForm: FormGroup = this.formBuilder.group({
    nom: [''],
    prenom: [''],
    email: [''],
    password: [''],
  });
  calendarVisible = true;
  title:string="";
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    aspectRatio: 3
,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',

    },
    allDaySlot:false,
    slotMinTime: '08:00:00', // The earliest time the schedule will start
    // slotMaxTime: '20:00:00',  // The latest time the schedule will end
    initialView: 'timeGridWeek',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    // you can update a remote database when these fire:
    // eventAdd:
    // eventRemove:
  };
  currentEvents: EventApi[] = [];
  constructor(private changeDetector: ChangeDetectorRef,private formBuilder: FormBuilder) {}
  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }
  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    if (this.canchange==true) {
        calendarApi.getEventById(String(this.currentEvents.length - 1))?.remove();
    }
      calendarApi.addEvent({
        id: String(this.currentEvents.length),
        start: selectInfo.startStr,
         end: selectInfo.endStr,
      });
       if (this.rendezVous==selectInfo.startStr){
         this.rendezVous="";
       }
       else {
         this.rendezVous = selectInfo.startStr;
       }
      this.canchange=true;
    // clear date selection
  }


  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
  closeEditModal() {
    const modal = document.getElementById('editUserModal');
    modal?.classList.add('hidden');

  }


}
