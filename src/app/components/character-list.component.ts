import { Component, OnInit } from '@angular/core';
import { SWService } from 'src/SW.Service';
import { Character } from '../model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})

export class CharacterListComponent implements OnInit {

  characters: Character[] = []
  //x: string[] = []

  constructor(private swService: SWService, private router: Router) { }

  ngOnInit() {
    this.getCharacterDetails();

  }

  getCharacterDetails() {
    this.swService.getCharacterList().then(result => {
      for (let i in result.CharacterList) {
        this.characters.push({
          //url: result.CharacterList[i].url,
          name: result.CharacterList[i].name,
          birthYear: result.CharacterList[i].birth_year,
          species: result.CharacterList[i].species,
          height: result.CharacterList[i].height,
          mass: result.CharacterList[i].mass,
          gender: result.CharacterList[i].gender,
          hairColour: result.CharacterList[i].hair_color,
          skinColour: result.CharacterList[i].skin_color,
          homeWorld: result.CharacterList[i].homeworld,
          image: null,
          comments: null
        })
      }
    })
  }

  goToCharacterDetails(character: string) {
    console.log(character);
    //this.x = character.split('/');
    //this.router.navigate(['/people', this.x[this.x.length - 1]]);

  }


}
