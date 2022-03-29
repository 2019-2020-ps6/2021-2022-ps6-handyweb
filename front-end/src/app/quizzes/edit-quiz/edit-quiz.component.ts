import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Quiz} from 'src/models/quiz.model';
import {QuizService} from 'src/services/quiz.service';
import {Question} from '../../../models/question.model';

@Component({
    selector: 'app-edit-quiz',
    templateUrl: './edit-quiz.component.html',
    styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

    public quiz: Quiz;

    constructor(private route: ActivatedRoute, private quizService: QuizService) {
        this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.quizService.setSelectedQuiz(id);
        console.log('Id :' + id);
    }

    addQuestion(question: Question){
            this.quizService.addQuestion(this.quiz, question);
    }

}
