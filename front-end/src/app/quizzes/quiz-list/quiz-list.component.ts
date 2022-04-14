import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';

@Component({
    selector: 'app-quiz-list',
    templateUrl: './quiz-list.component.html',
    styleUrls: ['./quiz-list.component.scss']
})
export class QuizListComponent implements OnInit {

    public quizList: Quiz[] = [];
    public themeId : string;

    constructor(private activateRoute: ActivatedRoute,private router: Router, public quizService: QuizService) {
        this.quizService.quizzes$.subscribe((quizzes: Quiz[]) => {
            this.quizList = quizzes;
        });
        this.themeId= this.activateRoute.snapshot.paramMap.get('theme');
    }

    ngOnInit(): void {
        console.log(this.themeId);
        console.log(this.quizList)
    }

    quizSelected(quiz: Quiz): void {
        this.router.navigate(['/play-quiz/' + quiz.name ]);
    }

    editQuiz(quiz: Quiz): void {
        this.router.navigate(['/edit-quiz/' + quiz.id]);
    }

    deleteQuiz(quiz: Quiz): void {
        this.quizService.deleteQuiz(quiz);
    }

    addQuiz(): void{
        let quiz = {
            id: this.newId(),
            name: "Default",
            questions : [],
            difficulte : 2
        }
        this.quizService.addQuiz(quiz);
        this.editQuiz(quiz);
    }

    newId():number{
        if(this.quizList.length === 0)
            return 0;
        return Math.max(...this.quizList.map(x => x.id)) +1 ;
    }
}
