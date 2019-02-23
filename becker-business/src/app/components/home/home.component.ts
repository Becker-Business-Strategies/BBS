import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {ValidateService} from "../../services/validate.service";
import {MatSnackBar} from "@angular/material";
import {MailerService} from "../../services/mailer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  planks = [
    {
      number: 1,
      title: 'Mentoring',
      icon: 'chat_bubble',
      msg: ' As someone who has already “been there”, ' +
        'I enjoy imparting my work experiences on others to help guide them along the way.' +
        ' Acting as a sounding board as well as a role model helps me to enhance the value of developing talent and ' +
        'gives them the opportunity to question and develop their own skill set.',
      button: 'Learn More',
      img: '../../assets/images/mentoring.jpg'
    },
    {
      number: 2,
      title: 'International',
      icon: 'airplanemode_active',
      msg: 'As an executive who has worked and developed businesses in countries around the world, ' +
        'I am able to connect with cultures at various levels and understand their unique ways of doing business. ' +
        'By creating an organizational climate that pays attention to cultural differences, yet understands and pursues ' +
        'corporate objectives, a successful venture is created.',
      link: 'Learn More',
      img: '../../assets/images/globe.jpg'
    },
    {
      number: 3,
      title: 'Metrics',
      icon: 'bar_chart',
      msg: 'Utilizing a drive to manage by the numbers, I work to improve productivity and utilization of the business. ' +
        'This includes eliminating waste, reducing costs through lean manufacturing techniques, and managing the supply chain.',
      link: 'Learn More',
      img: '../../assets/images/metrics-phone.jpg'

    },
    {
      number: 4,
      title: 'Strategy',
      icon: 'trending_up',
      msg: ' I develop courses of action that strengthen a company’s competitive position.' +
        ' This includes market and industry leadership, as well as providing direction and motivation the organization.',
      link: 'Learn More',
      img: '../../assets/images/mentoring2.jpg'
    },
    {
      number: 5,
      title: 'Railway',
      icon: 'directions_railway',
      msg: 'As a seasoned executive who has worked and developed railway business in North America and countries around the world, ' +
        'both on the Mechanical as well as the Infrastructure side, ' +
        'I am able to connect with organizations at various levels and understand their unique ways of doing business.' +
        ' The globalization of the supply base makes understanding the international players very important.',
      link: 'Learn More',
      img: '../../assets/images/trains-sunset.jpg'
    }
    ];

  bbs = [
    {
      phone: '314-304-8880',
      name: 'Stephen W. Becker',
      email: 'swb@beckerbusinessstrategies.com'
    }
  ];



  user: any;
  name: String;
  last: String;
  email: String;
  phone: String;
  message: String;
  messageSent: boolean = false;
  clicked: boolean = true;
  plankmsg: String;
  plankimg: String;

  constructor(private as: AuthService,
              private vs: ValidateService,
              private snackBar: MatSnackBar,
              private mailer: MailerService,
              private router: Router) {}

  ngOnInit() {
    this.messageSent = false;
    this.plankmsg = this.planks[0].msg;
    this.plankimg = this.planks[0].img;

  }

  onRegisterSubmit(register) {

    const client = {
      name: this.name,
      last: this.last,
      email: this.email,
      phone: this.phone,
      message: this.message
    };

    if (!this.vs.validateRegister(client)) {
      this.snackBar.open('Please fill all fields', 'close', {duration: 2000});
      return false;
    }

    // Validate Email

    if (!this.vs.validateEmail(client.email)) {
      this.snackBar.open('Please enter a valid email', 'close', {duration: 2000});
      return false;
    }

    // Register User
    this.as.registerUser(client).subscribe(data => {
      if (data.success) {
        this.snackBar.open('Thank you for reaching out. We will be in touch shortly!', '', {duration: 3000});

        this.mailer.newClient(client).subscribe(mail => {
          if (mail.success) {
          }
        });

      } else {
        this.snackBar.open('Something went wrong' , 'TRY AGAIN', {duration: 3000});
      }
    });


    register.reset();

    this.messageSent = true;


  }

  resetForm() {
    this.ngOnInit();
  }

  showMessage(plank) {
    this.plankmsg = plank.msg;
    this.plankimg = plank.img;

  }
}
