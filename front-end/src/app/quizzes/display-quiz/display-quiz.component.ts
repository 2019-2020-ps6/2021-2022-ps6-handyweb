import {Component, Input, OnInit} from '@angular/core';
import {Quiz} from '../../../models/quiz.model';
import {QuizService} from '../../../services/quiz.service';
import {ThemeService} from '../../../services/theme.service';
import {Theme} from '../../../models/theme.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-display-quiz',
  templateUrl: './display-quiz.component.html',
  styleUrls: ['./display-quiz.component.scss']
})
export class DisplayQuizComponent implements OnInit {

  @Input()
  quiz : Quiz;

  public themeList: Theme[] = [];

  constructor(private router : Router ,private quizService: QuizService, private themeService : ThemeService) {
    this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    this.themeService.themes$.subscribe((themes: Theme[]) => {
      this.themeList = themes;
    });
  }

  ngOnInit(): void {
    console.log(this.quiz.theme)
    this.quiz.theme = this.quiz.theme ?? 0;
  }

  validate(){
      this.quizService.editQuiz(this.quiz);
      this.router.navigate(['/edit-quiz/'+this.quiz.id+'/list-questions']);
  }


  retour() {
    let theme = this.quiz.theme ?? "0";
    this.router.navigate(['/quiz-list/' + theme]);
  }

  validQuiz(){
    this.quizService.editQuiz(this.quiz);
    this.retour();
  }

}
