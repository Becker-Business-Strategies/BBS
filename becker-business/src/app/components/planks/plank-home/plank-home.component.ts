import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plank-home',
  templateUrl: './plank-home.component.html',
  styleUrls: ['./plank-home.component.scss']
})
export class PlankHomeComponent implements OnInit {

  planks = [
    {
      number: 1,
      title: 'Mentoring',
      img: '../../../../assets/images/consulting-above.jpg',
      msg: ' As someone who has already “been there”,' +
        'I enjoy imparting my work experiences on others to help guide them along the way.' +
        ' Acting as a sounding board as well as a role model helps me to enhance the value of developing talent and ' +
        'gives them the opportunity to question and develop their own skill set.',
      buttonLink: ''
    },
    {
      number: 2,
      title: 'International',
      img: '../../../../assets/images/globe.jpg',
      msg: 'As an executive who has worked and developed businesses in countries around the world, ' +
        'I am able to connect with cultures at various levels and understand their unique ways of doing business. ' +
        'By creating an organizational climate that pays attention to cultural differences, yet understands and pursues ' +
        'corporate objectives, a successful venture is created.',
      buttonLink: ''
    },
    {
      number: 3,
      title: 'Metrics',
      img: '../../../../assets/images/metrics-phone.jpg',
      msg: 'Utilizing a drive to manage by the numbers, I work to improve productivity and utilization of the business. ' +
        'This includes eliminating waste, reducing costs through lean manufacturing techniques, and managing the supply chain.',
      buttonLink: ''
    },
    {
      number: 4,
      title: 'Strategy',
      img: '../../../../assets/images/mentoring.jpg',
      msg: ' I develop courses of action that strengthen a company’s competitive position.' +
        ' This includes market and industry leadership, as well as providing direction and motivation the organization.',
      buttonLink: ''
    },
    {
      number: 5,
      title: 'Railway',
      img: '../../../../assets/images/trains-sunset.jpg',
      msg: 'As a seasoned executive who has worked and developed railway business in North America and countries around the world, ' +
        'both on the Mechanical as well as the Infrastructure side, ' +
        'I am able to connect with organizations at various levels and understand their unique ways of doing business.' +
        ' The globalization of the supply base makes understanding the international players very important.',
      buttonLink: ''
    }
    ];

  constructor() { }

  ngOnInit() {}



}
